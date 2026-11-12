import { env } from 'cloudflare:workers';
import { categories, pickQuestions, questionMap } from '../../questions';

type Game = {id:string;kind:string;host:string;host_name:string;category:string;questions:string;status:string;round:number;deadline:number;created:number};
type Player = {game:string;player:string;name:string;answers:string;joined:number};
// 32 karakter: 256 % 32 === 0 olduğu için her karakter eşit olasılıkla seçilir.
const ROOM_ALPHABET='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const ROUND_MS=20000;
// Oda sahibi ortadan kaybolursa, süre bittikten bu kadar sonra herhangi bir oyuncu devam ettirebilir.
const HOST_GRACE_MS=15000;
// Bir oyuncu anahtarı saatte en fazla bu kadar oyun açabilir.
const CREATE_LIMIT_PER_HOUR=30;
// Oyunlar bu süreden sonra silinir (gizlilik metninde de yazıyor).
const RETENTION_MS=30*24*60*60*1000;
const json = (data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
const db = ()=> { if(!env.DB) throw new Error('Veritabanı bağlantısı hazırlanıyor.'); return env.DB; };
function fail(message:string,status=400):never {throw Object.assign(new Error(message),{status});}
async function identity(req:Request) {
  const key=req.headers.get('x-player-key')||'';
  if(!/^[a-zA-Z0-9-]{36,100}$/.test(key)) fail('Oyuncu oturumu bulunamadı. Sayfayı yenile.',401);
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(key)))).map(b=>b.toString(16).padStart(2,'0')).join('');
}
const cleanName = (value:unknown)=> { if(typeof value!=='string'||!value.trim()||value.trim().length>24) fail('1–24 karakterlik bir isim yaz.'); return (value as string).trim(); };
async function game(id:string) { const row=await db().prepare('SELECT * FROM games WHERE id = ?').bind(id).first<Game>(); if(!row) fail('Bu oyun bulunamadı. Bağlantıyı veya oda kodunu kontrol et.',404); return row!; }
async function members(id:string) { return (await db().prepare('SELECT * FROM players WHERE game = ? ORDER BY joined').bind(id).all<Player>()).results; }
function answers(p:Player):(number|null)[] { return JSON.parse(p.answers); }
async function view(id:string,who:string) {
  const g=await game(id); const ps=await members(id); const me=ps.find(p=>p.player===who); const ids:string[]=JSON.parse(g.questions);
  if(g.kind==='room'&&g.status==='playing'&&(Date.now()>=g.deadline||ps.every(p=>answers(p)[g.round]!=null))) {
    await db().prepare("UPDATE games SET status = 'reveal' WHERE id = ? AND status = 'playing' AND round = ?").bind(id,g.round).run();
    g.status='reveal';
  }
  const mine=me?answers(me):[];
  const completed=mine.filter(v=>v===0||v===1).length===ids.length;
  const reveal=g.kind==='room'&&(g.status==='reveal'||g.status==='done');
  return {
    id:g.id,kind:g.kind,hostName:g.host_name,category:g.category,status:g.status,round:g.round,deadline:g.deadline,
    isHost:g.host===who,joined:!!me,questions:ids.map(id=>questionMap[id]),myAnswers:mine,completed,
    players:me?ps.map((p,i)=>({id:String(i),name:p.name,isMe:p.player===who,isHost:p.player===g.host,complete:answers(p).filter(v=>v!=null).length===ids.length,
      voted:g.kind==='room'&&answers(p)[g.round]!=null,
      answers:g.kind==='blend'?(completed&&answers(p).length===ids.length?answers(p):[]):(g.status==='done'?answers(p):reveal?answers(p).map((v,i)=>i<=g.round?v:null):[])
    })):[],playerCount:ps.length,
  };
}
async function cleanup() {
  const old=(await db().prepare('SELECT id FROM games WHERE created < ? ORDER BY created LIMIT 200').bind(Date.now()-RETENTION_MS).all<{id:string}>()).results.map(r=>r.id);
  if(!old.length) return;
  const marks=old.map(()=>'?').join(',');
  await db().batch([
    db().prepare(`DELETE FROM players WHERE game IN (${marks})`).bind(...old),
    db().prepare(`DELETE FROM games WHERE id IN (${marks})`).bind(...old),
  ]);
}
async function handle(req:Request,post:boolean) {
  try {
    const who=await identity(req);
    if(!post) {const id=new URL(req.url).searchParams.get('id')||'';return json(await view(id,who));}
    const b=await req.json() as Record<string,any>; const action=b.action;
    if(action==='create') {
      const name=cleanName(b.name); const category=categories.some(c=>c.id===b.category)?b.category:'mix';
      const kind=b.kind==='room'?'room':'blend'; const id=kind==='room'?Array.from(crypto.getRandomValues(new Uint8Array(6))).map(n=>ROOM_ALPHABET[n%ROOM_ALPHABET.length]).join(''):crypto.randomUUID();
      const hourAgo=Date.now()-60*60*1000;
      const created=await db().prepare('SELECT COUNT(*) AS n FROM games WHERE host = ? AND created > ?').bind(who,hourAgo).first<{n:number}>();
      if((created?.n||0)>=CREATE_LIMIT_PER_HOUR) fail('Kısa sürede çok fazla oyun açtın. Biraz sonra tekrar dene.',429);
      if(Math.random()<0.05) await cleanup();
      const recentRows=await db().prepare('SELECT games.questions FROM games JOIN players ON players.game = games.id WHERE players.player = ? ORDER BY games.created DESC LIMIT 4').bind(who).all<{questions:string}>();
      const recentIds=recentRows.results.flatMap(row=>JSON.parse(row.questions) as string[]);
      const ids=pickQuestions(category,recentIds);
      await db().batch([
        db().prepare('INSERT INTO games (id,kind,host,host_name,category,questions,status,round,deadline,created) VALUES (?,?,?,?,?,?,?,0,0,?)').bind(id,kind,who,name,category,JSON.stringify(ids),kind==='room'?'waiting':'playing',Date.now()),
        db().prepare("INSERT INTO players (game,player,name,answers,joined) VALUES (?,?,?,'[]',?)").bind(id,who,name,Date.now()),
      ]);
      return json(await view(id,who));
    }
    if(typeof b.id!=='string'||b.id.length>100) fail('Geçerli bir oyun seç.');
    const g=await game(b.id); const ps=await members(g.id); let me=ps.find(p=>p.player===who); const count=JSON.parse(g.questions).length;
    if(action==='join') {
      if(!me) {
        if(g.kind==='room'&&g.status!=='waiting') fail('Oyun başladı. Yeni turda katılabilirsin.');
        const limit=g.kind==='room'?8:64; const name=cleanName(b.name);
        const result=await db().prepare("INSERT INTO players (game,player,name,answers,joined) SELECT ?,?,?,'[]',? WHERE (SELECT COUNT(*) FROM players WHERE game = ?) < ? AND (? = 'blend' OR (SELECT status FROM games WHERE id = ?) = 'waiting')").bind(g.id,who,name,Date.now(),g.id,limit,g.kind,g.id).run();
        if(!result.meta.changes) fail('Bu oyun dolu veya başlamış.');
      }
      return json(await view(g.id,who));
    }
    if(!me) fail('Önce oyuna katıl.',403);
    if(action==='answer') {
      if(b.choice!==0&&b.choice!==1) fail('İki seçenekten birini seç.');
      const a=answers(me); const index=b.index;
      if(!Number.isInteger(index)||index<0||index>=count) fail('Geçersiz soru.');
      if(g.kind==='blend') {
        if(index<a.length) return json(await view(g.id,who));
        if(index!==a.length) fail('Sıradaki soruyu cevapla.');
      } else if(g.status!=='playing'||index!==g.round||Date.now()>=g.deadline) {
        return json(await view(g.id,who));
      }
      if(a[index]!=null) return json(await view(g.id,who));
      while(a.length<index) a.push(null); a[index]=b.choice;
      await db().prepare('UPDATE players SET answers = ? WHERE game = ? AND player = ? AND answers = ?').bind(JSON.stringify(a),g.id,who,me.answers).run();
    } else if(action==='start') {
      if(g.host!==who) fail('Oyunu yalnızca oda sahibi başlatabilir.',403);
      if(g.kind!=='room'||g.status!=='waiting') fail('Oyun zaten başlamış.');
      if(ps.length<2) fail('Başlamak için en az iki kişi gerekli.');
      await db().prepare("UPDATE games SET status = 'playing', deadline = ? WHERE id = ? AND status = 'waiting'").bind(Date.now()+ROUND_MS,g.id).run();
    } else if(action==='next') {
      if(g.kind!=='room'||g.status!=='reveal') fail('Önce cevapları bekle.');
      if(g.host!==who&&Date.now()<g.deadline+HOST_GRACE_MS) fail('Soruyu yalnızca oda sahibi ilerletebilir.',403);
      if(g.round+1>=count) await db().prepare("UPDATE games SET status = 'done' WHERE id = ? AND status = 'reveal' AND round = ?").bind(g.id,g.round).run();
      else await db().prepare("UPDATE games SET status = 'playing', round = round + 1, deadline = ? WHERE id = ? AND status = 'reveal' AND round = ?").bind(Date.now()+ROUND_MS,g.id,g.round).run();
    } else fail('Bu işlem tanınmadı.');
    return json(await view(g.id,who));
  } catch(e:any) { return json({error:e.status?e.message:'Bağlantıda bir sorun oldu. Birazdan tekrar dene.'},e.status||500); }
}
export const GET=(req:Request)=>handle(req,false);
export const POST=(req:Request)=>handle(req,true);
