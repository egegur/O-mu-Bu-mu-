export const categories = [
  { id: 'mix', name: 'Biraz her şey', icon: '✳', color: '#ddd6ff', description: 'Sürprizleri sevenlere' },
  { id: 'daily', name: 'Günlük hayat', icon: '☀', color: '#ffe6ac', description: 'Küçük seçimler, büyük farklar' },
  { id: 'food', name: 'Yeme & içme', icon: '🍋', color: '#e8efb5', description: 'Damak zevkini konuştur' },
  { id: 'adventure', name: 'Gez & keşfet', icon: '↗', color: '#cce8e3', description: 'Bir sonraki maceran' },
  { id: 'culture', name: 'Keyif zamanı', icon: '♫', color: '#f8d9e3', description: 'Müzik, film ve biraz sen' },
  { id: 'wild', name: 'Biraz absürt', icon: '✦', color: '#ffd2b9', description: 'Düşünmesi bile eğlenceli' },
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
export const questions: Question[] = Object.entries(pairs).flatMap(([category, values]) => values.map(([a,b,ea,eb],i)=>({id: `${category}-${i}`,category,a,b,ea,eb})));
export const questionMap = Object.fromEntries(questions.map(q=>[q.id,q]));
function shuffle<T>(items:T[]) { return items.map(x=>({x,n:crypto.getRandomValues(new Uint32Array(1))[0]})).sort((a,b)=>a.n-b.n).map(v=>v.x); }
export function pickQuestions(category:string) {
  if(category === 'mix') return shuffle(Object.keys(pairs).flatMap(c=>shuffle(questions.filter(q=>q.category===c)).slice(0,2))).map(q=>q.id);
  return shuffle(questions.filter(q=>q.category===category)).slice(0,10).map(q=>q.id);
}
