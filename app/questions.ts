import { questionBank } from './question-bank';

export const categories = [
  { id: 'mix', name: 'Biraz her şey', icon: '✳', color: '#ddd6ff', description: 'Her konudan biraz' },
  { id: 'trending', name: 'Gündem karması', icon: '🔥', color: '#ffd0bd', description: 'Şu sıralar konuşulanlar' },
  { id: 'daily', name: 'Günlük hayat', icon: '☀', color: '#ffe6ac', description: 'Küçük seçimler, büyük farklar' },
  { id: 'food', name: 'Yeme & içme', icon: '🍋', color: '#e8efb5', description: 'Damak zevkini konuştur' },
  { id: 'adventure', name: 'Gez & keşfet', icon: '↗', color: '#cce8e3', description: 'Bir sonraki maceran' },
  { id: 'culture', name: 'Keyif zamanı', icon: '♫', color: '#f8d9e3', description: 'Film, müzik ve etkinlikler' },
  { id: 'wild', name: 'Biraz absürt', icon: '✦', color: '#ffd2b9', description: 'Beklenmedik ikilemler' },
  { id: 'tv', name: 'Dizi maratonu', icon: '📺', color: '#dcd5f2', description: 'Ekranın sevilenleri' },
  { id: 'movies', name: 'Film gecesi', icon: '🎬', color: '#f7d6a7', description: 'Bir film seç, koltuğa kurul' },
  { id: 'characters', name: 'Film & dizi karakterleri', icon: '🎭', color: '#e7d6ed', description: 'Hikâyelerin akılda kalan yüzleri' },
  { id: 'theater', name: 'Tiyatro sahnesi', icon: '🎭', color: '#f0d2dc', description: 'Canlı sahne ve perde arkası' },
  { id: 'books', name: 'Kitap kulübü', icon: '📚', color: '#d9e5d1', description: 'Sayfalar, yazarlar, hikâyeler' },
  { id: 'museums', name: 'Müze & sanat', icon: '🖼', color: '#e8dfc8', description: 'Sanat ve keşfedilecek salonlar' },
  { id: 'countries', name: 'Ülke seç, yola çık', icon: '🌍', color: '#d5e8e3', description: 'Uzak rotalar ve yeni kültürler' },
  { id: 'cities', name: 'Şehir sohbeti', icon: '🏙', color: '#d7dff0', description: 'Şehir hayatı ve semtler' },
  { id: 'music_tr', name: 'Türkçe müzik', icon: '🎤', color: '#fad3de', description: 'Listelerin tanıdık sesleri' },
  { id: 'music_world', name: 'Dünya sahnesi', icon: '🌍', color: '#d5e8ee', description: 'Global pop ve daha fazlası' },
  { id: 'artists', name: 'Şarkıcı & müzisyen', icon: '🎙️', color: '#f3d7df', description: 'Sevilen sesler ve sahne yıldızları' },
  { id: 'games', name: 'Oyun dünyası', icon: '🎮', color: '#d8e8bd', description: 'Ne oynuyoruz?' },
  { id: 'social', name: 'Sosyal medya', icon: '📱', color: '#e8d7f2', description: 'Akış, içerik ve internet' },
  { id: 'tech', name: 'Teknoloji & yapay zekâ', icon: '🤖', color: '#cfe5e6', description: 'Yeni araçlar, yeni alışkanlıklar' },
  { id: 'sports', name: 'Spor tribünü', icon: '🏆', color: '#e2edbf', description: 'Takımlar, yıldızlar, rekabet' },
  { id: 'footballers', name: 'Futbolcular', icon: '⚽', color: '#dcebbf', description: 'Sahanın yıldızları' },
  { id: 'athletes', name: 'Sporcular', icon: '🏅', color: '#d8e6dc', description: 'Tenis, basketbol, voleybol ve dahası' },
  { id: 'friends', name: 'Arkadaş grubu', icon: '🫶', color: '#f6d9c4', description: 'Beraber geçirilen zaman' },
  { id: 'dating', name: 'İlişkiler & flört', icon: '💌', color: '#f5d9e3', description: 'Küçük jestler, büyük kararlar' },
  { id: 'style', name: 'Moda & stil', icon: '👟', color: '#e4ddf2', description: 'Bugünün favori parçaları' },
  { id: 'nostalgia', name: 'Nostalji', icon: '📼', color: '#f4e4b7', description: 'Çocukluk ve eski internet' },
  { id: 'animals', name: 'Doğa & hayvanlar', icon: '🌿', color: '#d9ebc9', description: 'Patiler, bitkiler, açık hava' },
  { id: 'anime', name: 'K-pop & anime', icon: '✨', color: '#ecd6f4', description: 'Fandomların sevilenleri' },
  { id: 'career', name: 'İş, okul & para', icon: '💡', color: '#d8e4ed', description: 'Hayatın planları ve tercihleri' },
];
export type Question = {id: string; category: string; a: string; b: string; ea: string; eb: string};
export const questions: Question[] = Object.entries(questionBank).flatMap(([category, values]) => values.map(([a,b,ea,eb],i)=>({id: `${category}-${i}`,category,a,b,ea,eb})));
export const questionMap = Object.fromEntries(questions.map(q=>[q.id,q]));
function shuffle<T>(items:T[]) { return items.map(x=>({x,n:crypto.getRandomValues(new Uint32Array(1))[0]})).sort((a,b)=>a.n-b.n).map(v=>v.x); }
export const trendingIds = new Set([
  'tv-0','tv-1','tv-2','tv-3','tv-4','tv-5','movies-0','music_tr-0','music_tr-1','music_tr-2',
  'music_tr-3','music_tr-4','music_tr-5','music_tr-6','music_tr-7','music_tr-12','music_world-0',
  'music_world-1','music_world-2','music_world-3','music_world-4','music_world-5','music_world-6',
  'music_world-10','music_world-11','games-0','games-1','games-8','games-9','games-10','games-11',
  'games-12','social-0','social-1','social-2','social-5','social-8','social-13','social-21',
  'tech-0','tech-1','tech-2','tech-3','tech-4','tech-6','tech-14','tech-16','sports-3','sports-6',
  'sports-7','style-2','style-16','food-12','food-13','food-14','anime-0','anime-5','anime-6',
  'anime-7','anime-8','anime-9','anime-10','anime-11','anime-12','anime-13','anime-14','anime-15',
  'characters-0','characters-6','characters-14','artists-1','artists-2','artists-8','artists-9',
  'footballers-1','footballers-2','footballers-3','footballers-5','athletes-0','athletes-4','athletes-11'
]);
// Güvenlik ağı: ileride iki kategoriye aynı soru eklenirse bir oyunda iki kez gelmesin diye
// seçim içerik anahtarıyla yapılır; yakın geçmiş de içerik üzerinden elenir.
export const contentKey = (q:Pick<Question,'a'|'b'>) => [q.a,q.b].map(s=>s.toLocaleLowerCase('tr').trim()).sort().join('|');
export function pickQuestions(category:string, recentIds:string[] = []) {
  const recentKeys = new Set(recentIds.map(id => questionMap[id]).filter(Boolean).map(contentKey));
  const recentlySeen = { has: (id:string) => recentKeys.has(contentKey(questionMap[id])) };
  let pool = questions.filter(q => category === 'mix' ? true : category === 'trending' ? trendingIds.has(q.id) : q.category === category);
  if (category === 'mix') {
    const groups = shuffle([...new Set(pool.map(q => q.category))]);
    const fresh = groups.map(group => shuffle(pool.filter(q => q.category === group && !recentlySeen.has(q.id))).slice(0, 1)).flat();
    pool = [...fresh, ...shuffle(pool.filter(q => !recentlySeen.has(q.id) && !fresh.some(f => f.id === q.id)))];
  } else {
    const fresh = shuffle(pool.filter(q => !recentlySeen.has(q.id)));
    const old = shuffle(pool.filter(q => recentlySeen.has(q.id)));
    pool = [...fresh, ...old];
  }
  const picked:Question[] = []; const keys = new Set<string>();
  for (const q of pool) { const key = contentKey(q); if (keys.has(key)) continue; keys.add(key); picked.push(q); if (picked.length === 10) break; }
  return shuffle(picked).map(q => q.id);
}
