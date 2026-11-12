import { extraPairs } from './question-additions';

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
const pairs: Record<string, [string, string, string, string][]> = {
  daily: [
    ['Erken kalkmak', 'Geceye kalmak', '🌅', '🌙'], ['Planlı yaşamak', 'Akışına bırakmak', '📅', '🌊'],
    ['Mesajlaşmak', 'Telefonla konuşmak', '💬', '📞'], ['Kalabalık bir buluşma', 'İki kişilik bir sohbet', '🎉', '☕'],
    ['Evde bir gün', 'Dışarıda bir gün', '🏡', '🏙'], ['Hemen karar vermek', 'Biraz daha düşünmek', '⚡', '💭'],
    ['Sessizlikte çalışmak', 'Müzikle çalışmak', '🤫', '🎧'], ['Düzenli bir masa', 'Yaratıcı bir karmaşa', '🗂', '🎨'],
    ['Sürpriz yapmak', 'Sürpriz yaşamak', '🎁', '✨'], ['Az ama yakın arkadaş', 'Geniş bir arkadaş çevresi', '🫶', '👋'],
    ['Yağmurlu bir gün', 'Güneşli bir gün', '🌧', '☀️'], ['Fotoğraf çekmek', 'Anı yaşamak', '📷', '🌿'],
  ],
  food: [
    ['Çay', 'Kahve', '🍵', '☕'], ['Tatlı', 'Tuzlu', '🍰', '🥨'], ['Pizza', 'Burger', '🍕', '🍔'],
    ['Ev yemeği', 'Sokak lezzetleri', '🍲', '🌮'], ['Uzun kahvaltı', 'Uzun akşam yemeği', '🥞', '🍝'],
    ['Acılı', 'Acısız', '🌶', '🫑'], ['Dondurma', 'Çikolata', '🍦', '🍫'], ['Denemediğim bir yemek', 'Her zamanki favorim', '🍜', '🥘'],
    ['Simit & çay', 'Kruvasan & kahve', '🥯', '🥐'], ['Birlikte yemek yapmak', 'Dışarıda yemek yemek', '🧑‍🍳', '🍽'],
    ['Limonata', 'Soğuk çay', '🍋', '🧊'], ['Menemen', 'Omlet', '🍅', '🍳'],
  ],
  adventure: [
    ['Deniz tatili', 'Dağ tatili', '🏖', '🏔'], ['Tren yolculuğu', 'Araba yolculuğu', '🚂', '🚗'],
    ['Yeni bir şehir', 'Bildiğim bir sahil', '🗺', '🌊'], ['Çadırda uyumak', 'Otelde kalmak', '⛺', '🏨'],
    ['Müze gezmek', 'Sokaklarda kaybolmak', '🏛', '🚶'], ['Tek başına seyahat', 'Arkadaşlarla seyahat', '🎒', '🧳'],
    ['Kış kaçamağı', 'Yaz kaçamağı', '❄️', '☀️'], ['Gün doğumu', 'Gün batımı', '🌅', '🌇'],
    ['Adrenalin dolu bir gün', 'Yavaş bir keşif günü', '🪂', '🌱'], ['Her gün başka bir yer', 'Bir yeri iyice tanımak', '🧭', '📍'],
    ['Küçük bir kasaba', 'Kocaman bir şehir', '🏘', '🌃'], ['Rotayı önceden çizmek', 'Yolda karar vermek', '📌', '🛤'],
  ],
  culture: [
    ['Konser', 'Festival', '🎤', '🎪'], ['Film', 'Dizi', '🎬', '📺'], ['Komedi', 'Gerilim', '😂', '😱'],
    ['Kitap', 'Podcast', '📖', '🎙'], ['Eski favorileri dinlemek', 'Yeni şarkılar keşfetmek', '💿', '🎵'],
    ['Sinemaya gitmek', 'Evde film gecesi', '🍿', '🛋'], ['Canlı müzik', 'DJ seti', '🎸', '🎚'],
    ['Bir sezonu bir gecede', 'Her akşam bir bölüm', '🌙', '🗓'], ['Kutu oyunu', 'Video oyunu', '🎲', '🎮'],
    ['Bir sergi gezmek', 'Bir atölyeye katılmak', '🖼', '🧶'], ['Şarkıya eşlik etmek', 'Müziğe dans etmek', '🎶', '💃'],
    ['Altyazı', 'Dublaj', '💬', '🗣'],
  ],
  wild: [
    ['Geçmişe gitmek', 'Geleceği görmek', '⏳', '🔮'], ['Uçabilmek', 'Işınlanabilmek', '🪽', '⚡'],
    ['Hayvanlarla konuşmak', 'Her dili bilmek', '🐈', '🌍'], ['Uzayda bir gün', 'Okyanusta bir gün', '🚀', '🐠'],
    ['Her zaman yaz', 'Her zaman kış', '🌴', '⛄'], ['Görünmez olmak', 'Şekil değiştirmek', '👻', '🦋'],
    ['Sınırsız kitap', 'Sınırsız müzik', '📚', '🎧'], ['Bir ejderhayla dostluk', 'Bir robotla dostluk', '🐉', '🤖'],
    ['Rüyaları kaydetmek', 'Anıları tekrar yaşamak', '💤', '🎞'], ['Bir günlüğüne dev olmak', 'Bir günlüğüne minik olmak', '🦕', '🐜'],
    ['Ayda yaşamak', 'Deniz altında yaşamak', '🌕', '🪸'], ['Hep doğru yolu bulmak', 'Hep kayıp eşyayı bulmak', '🧭', '🔑'],
  ],
};
export type Question = {id: string; category: string; a: string; b: string; ea: string; eb: string};
const allPairs = Object.fromEntries([...new Set([...Object.keys(pairs), ...Object.keys(extraPairs)])].map((key) => [key, [...(pairs[key] || []), ...(extraPairs[key] || [])]])) as Record<string, [string,string,string,string][]>;
export const questions: Question[] = Object.entries(allPairs).flatMap(([category, values]) => values.map(([a,b,ea,eb],i)=>({id: `${category}-${i}`,category,a,b,ea,eb})));
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
export function pickQuestions(category:string, recentIds:string[] = []) {
  const recentlySeen = new Set(recentIds);
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
  return shuffle(pool.slice(0, 10)).map(q => q.id);
}
