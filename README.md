# O mu Bu mu?

Türkçe, telefondan oynanan seçim oyunu. İki mod aynı soru havuzunu kullanır:

- **Uyumunu keşfet:** Tek başına 10 soruyu tamamla, bağlantını paylaş. Arkadaşların aynı seti istedikleri zaman cevaplar. Tamamlayan oyuncuların seçimleri karşılaştırılır.
- **Birlikte oyna:** 2–8 kişilik oda, 6 karakterlik kod, 10 soru ve soru başına 20 saniye. Herkes cevaplayınca veya süre dolunca oylar açılır. Oda sahibi sonraki soruya geçer.

720 soru ve 31 kategori bulunur: film ve dizi karakterleri, şarkıcılar ve müzisyenler, futbolcular, diğer branşlardan sporcuların yanı sıra tiyatro, kitap, müze ve sanat, ülkeler, şehirler, oyun, sosyal medya, teknoloji, arkadaşlık, ilişkiler, moda, nostalji, hayvanlar, anime ve gündelik/absürt seçimler. “Biraz her şey” ve “Gündem karması” da kategori aramasından seçilebilir. Her turda 10 soru gelir; aynı kategoride tekrar oynarken yakın geçmişte görülenler geriye atılır. Yüzde, iki oyuncunun da cevapladığı soruların kaçında aynı seçeneği işaretlediğini gösterir; cevapsız sorular paydaya katılmaz.

## Geliştirme

Node.js >=22.13 gereklidir. Bu makinedeki çalışan kurulum `/opt/homebrew/opt/node@22/bin` dizinindedir.

- `npm run dev -- --hostname 127.0.0.1`: Yerel önizleme.
- `npx tsc --noEmit`: Tür kontrolü.
- `node scripts/check-game.mjs`: Çalışan yerel sunucuda 116 API kontrolü; iki oyuncu, gizlilik, devam etme, uyum hesabı, canlı tur, oda sahibi yetkileri, süre aşımı, oda sahibi yokken devam, karışık setlerde içerik tekrarı ve oyun açma sınırı. Yaklaşık 40 saniye sürer. Yalnızca test amaçlı oyunlar oluşturur. Üretime karşı çalıştırmayın.
- `npm run db:generate`: Şema değişiklikleri için yeni D1 migration üretir.

Sites eklentisinin build/source/deploy yardımcılarıyla yayınlanır. `.openai/hosting.json` mevcut Site kimliğini ve `DB` bağını saklar. Aynı Site kimliğini koruyun. Üretim ve yerel veritabanları ayrıdır; yerel test oyunları yayın paketine girmez.

## Dosyalar

- `app/page.tsx`: Mobil arayüz, davet, lobi, oyun ve sonuç akışları.
- `app/globals.css`: Responsive tasarım.
- `app/questions.ts`: Kategoriler ve kararlı soru kimlikleri.
- `app/api/game/route.ts`: Sunucuda cevap gizliliği, süre, yetki ve oyun durumu kuralları.
- `db/schema.ts`, `drizzle/`: Kalıcı oyun kayıtları ve oyuncu cevapları.

## Oyun kuralları ve korumalar

- Oda kodu 32 karakterli alfabeden (`ABCDEFGHJKLMNPQRSTUVWXYZ23456789`) eşit olasılıkla üretilir.
- Bazı soru çiftleri iki kategoride birden var. Kimlikler kalıcı olduğu için silinmez; `pickQuestions` aynı içeriği bir oyunda iki kez seçmez ve yakın geçmişte görülen içeriği kimlikten bağımsız olarak geriye atar.
- Oda sahibi süre bittikten 15 saniye sonra hâlâ devam etmediyse odadaki herkes sonraki soruya geçebilir.
- Bir oyuncu anahtarı saatte en fazla 30 oyun açabilir (429).
- 30 günden eski oyunlar, oyun açma isteklerinin yaklaşık %5'inde 200'lük gruplar halinde silinir.
- `drizzle/0001_indexes.sql`: hız sınırı, temizlik ve son oyun sorgusu için indeksler.
- `/gizlilik`: taslak aydınlatma metni; köşeli parantezli yerler doldurulmalı ve avukata kontrol ettirilmeli.

## Kimlik ve sınırlar

Üyelik gerektirmeyen rastgele oyuncu anahtarı bu tarayıcıda tutulur; sunucuda yalnızca özeti saklanır. Tarayıcı verileri silinirse eski oyuncu kimliğine erişilemez. Hesaplar arasında cihaz eşitleme henüz yoktur. Davet kodunu bilenler oyuna katılabilir. Uyum modunda, setini tamamlayan katılımcılar diğer tamamlayanların cevaplarını görebilir. Canlı oyun cevapları tur sonunda oda katılımcılarına açılır.

Yeni Site, Sites varsayılanı gereği yalnızca sahibine açık yayınlanır. Dışarıdan arkadaşların giriş yapabilmesi için Site erişiminin ayrıca açılması gerekir. Kod, herkese açık erişimde misafir oyununa hazırdır.
