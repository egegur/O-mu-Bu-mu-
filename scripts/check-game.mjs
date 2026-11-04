import assert from 'node:assert/strict';
const base=process.env.TEST_ORIGIN||'http://127.0.0.1:5173';
const a=crypto.randomUUID(),b=crypto.randomUUID(),c=crypto.randomUUID();
let checks=0;
async function call(key,body,id,status=200){const r=await fetch(base+'/api/game'+(body?'':'?id='+encodeURIComponent(id)),{method:body?'POST':'GET',headers:{'Content-Type':'application/json','x-player-key':key},body:body?JSON.stringify(body):undefined});const data=await r.json();assert.equal(r.status,status,JSON.stringify(data));checks++;return data;}
await call('bad',undefined,'none',401);
let blend=await call(a,{action:'create',kind:'blend',name:'Ada Test',category:'mix'});
const id=blend.id;
assert.equal(blend.questions.length,10);assert.equal(new Set(blend.questions.map(q=>q.id)).size,10);
await call(a,{action:'answer',id,index:2,choice:0},undefined,400);
for(let i=0;i<10;i++)blend=await call(a,{action:'answer',id,index:i,choice:i%2});
assert.equal(blend.completed,true);
const outsider=await call(c,undefined,id);assert.deepEqual(outsider.players,[]);
await call(c,{action:'answer',id,index:0,choice:1},undefined,403);
let guest=await call(b,{action:'join',id,name:'Deniz Test'});
assert.deepEqual(guest.questions,blend.questions);assert.deepEqual(guest.players.find(p=>p.isHost).answers,[]);
for(let i=0;i<10;i++){
 guest=await call(b,{action:'answer',id,index:i,choice:i<8?i%2:1-i%2});
 if(i<9)assert.deepEqual(guest.players.find(p=>p.isHost).answers,[]);
}
const hostView=await call(a,undefined,id);
const other=hostView.players.find(p=>!p.isMe);assert.equal(other.answers.filter((v,i)=>v===hostView.myAnswers[i]).length,8);
const locked=await call(b,{action:'answer',id,index:0,choice:1});assert.equal(locked.myAnswers[0],0);
console.log('PASS: asynchronous invite, identical question set, hidden answers, persistence, 8/10 compatibility, locked answers.');
let room=await call(a,{action:'create',kind:'room',name:'Ada Test',category:'daily'});const rid=room.id;
await call(a,{action:'start',id:rid},undefined,400);
await call(b,{action:'join',id:rid,name:'Deniz Test'});
await call(b,{action:'start',id:rid},undefined,403);
room=await call(a,{action:'start',id:rid});assert.equal(room.status,'playing');
await call(c,{action:'join',id:rid,name:'Geç Katılan'},undefined,400);
room=await call(a,{action:'answer',id:rid,index:0,choice:0});assert.equal(room.status,'playing');
const blind=await call(b,undefined,rid);assert.ok(blind.players.every(p=>p.answers.length===0));
room=await call(b,{action:'answer',id:rid,index:0,choice:1});assert.equal(room.status,'reveal');assert.equal(room.players[0].answers[0],0);
await call(b,{action:'next',id:rid},undefined,403);
for(let i=1;i<10;i++){
 room=await call(a,{action:'next',id:rid});assert.equal(room.round,i);
 await call(a,{action:'answer',id:rid,index:i,choice:i%2});
 room=await call(b,{action:'answer',id:rid,index:i,choice:i%2});assert.equal(room.status,'reveal');
}
room=await call(a,{action:'next',id:rid});assert.equal(room.status,'done');assert.equal(room.players[1].answers.filter((v,i)=>v===room.myAnswers[i]).length,9);
console.log('PASS: live room, minimum players, host controls, vote secrecy, simultaneous reveal, 10 rounds, 9/10 summary.');
let timed=await call(a,{action:'create',kind:'room',name:'Timer Test',category:'wild'});const tid=timed.id;
await call(b,{action:'join',id:tid,name:'Waiting Test'});timed=await call(a,{action:'start',id:tid});
await call(a,{action:'answer',id:tid,index:0,choice:0});
await new Promise(r=>setTimeout(r,Math.max(0,timed.deadline-Date.now()+100)));
const expired=await call(b,{action:'answer',id:tid,index:0,choice:1});assert.equal(expired.status,'reveal');assert.equal(expired.myAnswers.length,0);
console.log('PASS: deadline reveals unanswered round, late votes rejected.');
console.log(`All ${checks} API assertions passed.`);
