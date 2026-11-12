# O mu Bu mu? — Claude Handoff

Durum tarihi: 12 Kasım 2026, Europe/Istanbul.

Bu belge projeyi Claude'a devretmek içindir. Claude'a bu Markdown dosyasıyla birlikte aynı klasördeki proje kaynaklarını yükle. Büyük soru bankasının tamamı `app/question-additions.ts` içindedir.

## Ürün

**O mu Bu mu?**, Türkçe, mobil öncelikli, üyeliksiz iki seçenekli arkadaş oyunu. Doğru cevap yoktur; ortak seçimler yakınlık hissi yaratır, farklı seçimler sohbet başlatır.

### Oyun modları

| Mod | Akış | Sonuç |
| --- | --- | --- |
| **Uyumunu keşfet** (`blend`) | Kullanıcı 10 soruyu kendi zamanında cevaplar, davet bağlantısını paylaşır. Arkadaşı aynı 10 soruyu istediği zaman yanıtlar. | Ortak cevaplanan sorulardaki eşleşme yüzdesi; aynı/farklı seçim listesi. |
| **Birlikte oyna** (`room`) | Oda sahibi 6 karakterli kodla oda açar. 2–8 kişi katılır. Soru başına 20 saniye. | Herkes seçince veya süre bitince oylar açılır; oda sahibi sonraki soruya geçer; en çok bölen soru gösterilir. |

## Mevcut durum

### Tamamlanan özellikler

- 720 soru ve 31 kategori var.
- Kategori arama kutusu, filtre grupları, boş sonuç mesajı ve dinamik kategori sayacı var.
- Tekli uyum modu, davet bağlantısı, oyuncu karşılaştırması ve yüzde hesabı var.
- 2–8 kişilik eşzamanlı oda modu var.
- Odada cevaplar tur açılana kadar gizli tutuluyor.
- 20 saniye zamanlayıcı, geç cevap reddi, host başlatma/sonraki soru yetkisi var.
- Son dört turda görülen sorular yeni turda geriye atılıyor.
- Tarayıcıdaki son oyunlar “Kaldığın yerden” alanında saklanıyor.
- Mobil düzen, erişilebilir odak halkası, modal Escape/focus trap ve durum mesajları var.

### Son doğrulama

12 Kasım 2026 itibarıyla bunların tamamı başarılıydı:

```text
npx tsc --noEmit                 # geçti
npm run build                    # geçti
node scripts/check-game.mjs      # 71 API kontrolü geçti
720 soru / 31 kategori           # doğrulandı
Her konu kategorisi 10 farklı soru üretiyor
```

### Canlı yayın durumu (kritik)

Kod **canlıya yayınlanmadı**. Hazır kaynak klasörü:

```text
/Users/egegur/Documents/Codex/2026-11-04/sen/work/omu-bumu
```

Mevcut public URL:

```text
https://omu-bumu-ege-1104.lushmouse.chatgpt.site/
```

Bu URL eski sürümü gösterebilir. Proje Sites altyapısına bağlıdır ancak bu çalışmada Sites yayınlama araçları erişilebilir değildi. Git remote da yok; GitHub üzerinden push/deploy yolu hazır değildir.

`.openai/hosting.json` dosyasındaki mevcut Sites proje kimliği ve D1 bağlaması aynen korunmalıdır:

```json
{
  "d1": "DB",
  "r2": null,
  "project_id": "appgprj_6aeb84cc7db48191a3d29aedc4b6853c"
}
```

Kullanıcı, public erişimi zaten onayladı: bağlantıya sahip herkes girebilmelidir.

## Kategoriler ve soru bankası

Her standart konu kategorisinde 24 soru vardır. `wild` kategorisinde 48 soru vardır. `mix` ve `trending` sanal kategorilerdir; ayrı soru verisi taşımaz. Toplam 720 sorudur.

| Kimlik | Görünen isim | İçerik |
| --- | --- | --- |
| `mix` | Biraz her şey | Farklı kategorilerden karışık seçim |
| `trending` | Gündem karması | Küratörlü güncel/popüler alt küme |
| `daily` | Günlük hayat | Cam kenarı/koridor gibi gündelik seçimler |
| `food` | Yeme & içme | Yemek ve içecek |
| `adventure` | Gez & keşfet | Seyahat ve keşif |
| `culture` | Keyif zamanı | Etkinlik, hobi, kitap, müzik |
| `wild` | Biraz absürt | Tuvalet telaşı, telefonu elde aramak gibi komik ikilemler |
| `tv` | Dizi maratonu | Diziler ve izleme alışkanlıkları |
| `movies` | Film gecesi | Filmler ve film türleri |
| `characters` | Film & dizi karakterleri | Wednesday, Harry Potter, Lupin, Stranger Things, Marvel, yerli dizi karakterleri |
| `theater` | Tiyatro sahnesi | Sahne, oyun türü ve tiyatro deneyimi |
| `books` | Kitap kulübü | Kitaplar, yazarlar ve okuma |
| `museums` | Müze & sanat | Müze, sergi ve sanat |
| `countries` | Ülke seç, yola çık | Ülkeler ve rotalar |
| `cities` | Şehir sohbeti | Türkiye ve dünya şehirleri |
| `music_tr` | Türkçe müzik | Türkçe müzik |
| `music_world` | Dünya sahnesi | Global müzik |
| `artists` | Şarkıcı & müzisyen | Tarkan, Mabel Matiz, BLOK3, Taylor Swift, Beyoncé, BTS vb. |
| `games` | Oyun dünyası | Video oyunları |
| `social` | Sosyal medya | İçerik, uygulama ve internet kültürü |
| `tech` | Teknoloji & yapay zekâ | Teknoloji alışkanlıkları |
| `sports` | Spor tribünü | Takım, tribün ve izleme kültürü |
| `footballers` | Futbolcular | Messi/Ronaldo, Mbappé/Haaland, Arda Güler/Kenan Yıldız, kadın futbolu vb. |
| `athletes` | Sporcular | Basketbol, tenis, voleybol, Formula 1, yüzme, atletizm vb. |
| `friends` | Arkadaş grubu | Grup dinamikleri |
| `dating` | İlişkiler & flört | İlişki ve küçük jestler |
| `style` | Moda & stil | Stil tercihleri |
| `nostalgia` | Nostalji | Çocukluk ve eski internet |
| `animals` | Doğa & hayvanlar | Hayvanlar, doğa ve açık hava |
| `anime` | K-pop & anime | Fandomlar |
| `career` | İş, okul & para | İş, okul ve hayat planları |

### Filtre grupları

- **Tümü**: bütün kategoriler.
- **Popüler kültür**: `trending`, `tv`, `movies`, `characters`, `theater`, `books`, `museums`, `countries`, `cities`, `music_tr`, `music_world`, `artists`, `games`, `social`, `tech`, `anime`.
- **Hayat & keyif**: `daily`, `food`, `adventure`, `culture`, `style`, `nostalgia`, `animals`, `career`.
- **Biz bize**: `friends`, `dating`, `sports`, `footballers`, `athletes`, `wild`.

Kategori araması Türkçe locale ile kategori adına göre filtreler; eşleşme yoksa “Bu aramayla eşleşen kategori yok.” gösterilir.

### Soru kimliği kuralı

`app/questions.ts`, sorulara `category-index` biçiminde kimlik verir; örnek: `theater-0`, `wild-33`. Kayıtlı oyunlar bu kimlikleri saklar. Bu yüzden mevcut dizilerin başına soru ekleme, dizileri sıralama veya silme. Yeni soruları `app/question-additions.ts` içinde yalnızca ilgili dizinin **sonuna** ekle. Böylece eski oyunların soru referansları korunur.

`trendingIds`, `app/questions.ts` içinde elle seçilen ID setidir. Güncel içerik eklenirse burası da güncellenebilir.

## Mimari

### Teknoloji

- React 19 + Next 16 / Vinext
- Vite 8
- Cloudflare Workers
- Cloudflare D1 + Drizzle ORM
- TypeScript
- Lucide ikonları
- Sade CSS; ürün ekranında Tailwind kullanılmıyor

Node gereksinimi `>=22.13.0`. Bu bilgisayarda kullanılan Node yolu:

```text
/opt/homebrew/opt/node@22/bin
```

### Dosya sorumlulukları

| Dosya | Sorumluluk |
| --- | --- |
| `app/page.tsx` | Ana ekran, kategori seçimi, davet, lobi, oyun, sonuçlar ve tarayıcı durumu |
| `app/globals.css` | Responsive görsel dil |
| `app/questions.ts` | Kategori metadata’sı, sabit temel sorular, ID üretimi, `mix`, `trending`, seçim algoritması |
| `app/question-additions.ts` | Eklenen büyük soru bankası; append-only |
| `app/api/game/route.ts` | Oyun oluşturma/katılma/cevaplama/başlatma/sonraki soru API’si |
| `db/schema.ts` | `games` ve `players` tabloları |
| `drizzle/0000_high_mathemanic.sql` | D1 şema migration’ı |
| `scripts/check-game.mjs` | 71 otomatik API kontrolü |
| `.openai/hosting.json` | Sites proje kimliği ve D1 binding |
| `README.md` | Proje özeti ve yerel geliştirme notları |

### Veritabanı modeli

`games` tablosu:

```text
id, kind, host, host_name, category, questions, status, round, deadline, created
```

`players` tablosu:

```text
game, player, name, answers, joined
```

`players.game + players.player` birleşik birincil anahtardır. `questions` ve `answers` JSON dizisi olarak saklanır.

### Oyuncu kimliği

- İstemci `localStorage` içinde `omu-player` anahtarında rastgele UUID bileşimi tutar.
- Değer API’ye `x-player-key` header’ı ile gider.
- Sunucu anahtarı SHA-256 ile hash’ler ve hash’i oyuncu kimliği olarak kullanır.
- İsim 1–24 karakter olmalıdır.
- Tarayıcı verisi silinirse eski oyuncu kimliğine erişim kaybolur.
- Hesap, şifre veya cihazlar arası eşitleme yoktur.

## API ve oyun kuralları

Tek endpoint:

```text
GET  /api/game?id=<game-id>
POST /api/game
```

POST gövdesindeki action’lar:

| Action | Parametreler | Davranış |
| --- | --- | --- |
| `create` | `kind`, `name`, `category` | Oyun ve ev sahibi oyuncuyu oluşturur |
| `join` | `id`, `name` | Oyuna katılır |
| `answer` | `id`, `index`, `choice` | 0 veya 1 tercihini kaydeder |
| `start` | `id` | Oda sahibinin odalı oyunu başlatması |
| `next` | `id` | Oda sahibinin turu ilerletmesi |

### Uyum modu (`blend`)

- Her oyun 10 soru saklar.
- Aynı davet bağlantısına katılan herkes aynı soru sırasını görür.
- Kullanıcı yalnızca sıradaki soruyu cevaplayabilir; önceki cevap değiştirilemez.
- Bir oyuncunun cevapları, hem isteği yapan kişi hem de ilgili oyuncu seti tamamlamadan diğer katılımcılara açıklanmaz.
- Sonuç yüzdesi: iki oyuncunun da cevapladığı sorulardaki aynı tercih / ortak yanıt sayısı.
- Maksimum 64 katılımcı.

### Oda modu (`room`)

- Oda kodu altı karakterlidir; `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` alfabesi kullanılır.
- Maksimum 8 katılımcı.
- Başlangıç için en az 2 kişi gerekir.
- Oyuncular yalnızca oda `waiting` durumundayken katılabilir.
- `start` ve `next` yalnızca oda sahibine açıktır.
- Her soru için 20 saniye vardır.
- Herkes cevap verdiğinde veya süre bittiğinde sunucu turu `reveal` durumuna geçirir.
- Cevaplar `reveal` anına kadar gizlidir.
- Süre dolduktan sonraki cevaplar kabul edilmez.
- Son sorudan sonra durum `done` olur.

### Tekrar azaltma

Oyun oluşturulurken oyuncunun son dört oyunundaki `games.questions` dizileri okunur. Bu ID’ler `pickQuestions(category, recentIds)` fonksiyonuna gönderilir. Önce daha önce görülmeyen sorular, sonra gerekirse eski sorular karıştırılır.

`mix` modunda önce farklı kategorilerden olabildiğince birer soru alınır; ardından 10 soru seçilip karıştırılır.

## UX ayrıntıları

### Ana ekran

- Hero: “Sen hangisini seçerdin?”
- “Uyumunu keşfet” ve “Birlikte oyna” mod kartları.
- 31 kategori kartı, filtre ve arama.
- Tarayıcıdaki önceki oyunlar “Kaldığın yerden” alanında görünür.

### Kurulum

- İsim zorunludur.
- Kategori seçici arama destekler.
- Ana sayfadaki kategori araması yeni oyun kurulumuna taşınmaz; kurulum açıldığında arama sıfırlanır. Bu bilerek düzeltildi.
- Seçili kategori her zaman listede görünür.

### Oyun ve sonuç

- İki büyük kart: sol “O”, sağ “BU”.
- Soru sayacı ve ilerleme çubuğu.
- Odalı oyunda görünür geri sayım.
- Uyum modunda “Kaydet ve çık”; cevaplar kalıcıdır.
- Oda modunda kartlar açılana kadar seçim gizlidir.
- Uyum sonuçlarında yüzde ve soru bazlı aynı/farklı seçim listesi vardır.
- Oda sonuçlarında grubu en çok bölen soru vardır.
- Bağlantı Web Share API veya kopyalama ile paylaşılır; desteklenmeyen tarayıcıda kopyalama kullanılır.

### Erişilebilirlik

- `aria-label`, `role=radio`, `role=group`, `role=status`, `role=alert` kullanımı mevcut.
- Klavye odak halkası var.
- “Nasıl oynanır?” modalı Escape ile kapanır ve odak döngüsünü korur.
- Boş kategori araması yazı ile bildirilir.

## Yerelde çalıştırma ve test

Proje kökünde yerel önizleme:

```bash
PATH=/opt/homebrew/opt/node@22/bin:$PATH npm run dev -- --hostname 127.0.0.1
```

Önizleme adresi:

```text
http://127.0.0.1:5173/
```

Başka terminalde otomatik test:

```bash
PATH=/opt/homebrew/opt/node@22/bin:$PATH node scripts/check-game.mjs
```

Tür kontrolü ve üretim derlemesi:

```bash
PATH=/opt/homebrew/opt/node@22/bin:$PATH npx tsc --noEmit
PATH=/opt/homebrew/opt/node@22/bin:$PATH npm run build
```

`scripts/check-game.mjs` üretime karşı çalıştırılmamalıdır; test oyunları oluşturur.

### Otomatik test kapsamı

`scripts/check-game.mjs` 71 API kontrolü yapar. Kontrol edilen başlıca davranışlar:

1. Geçersiz oyun isteğinin reddi.
2. Uyum oyunu oluşturma ve 10 benzersiz soru.
3. Sıra dışı cevap indeksinin reddi.
4. İlk oyuncunun 10 soruyu bitirmesi.
5. Dışarıdan bakıldığında cevap gizliliği.
6. İkinci oyuncunun aynı soru setini alması.
7. İlk oyuncu cevaplarının ikinci oyuncu tamamlamadan gizli kalması.
8. İki oyunculu 8/10 uyum hesabı.
9. Kilitlenmiş cevabın değiştirilememesi.
10. Tek kişilik odanın başlatılamaması.
11. Konuğun oyunu başlatamaması.
12. Oyun başladıktan sonra yeni katılımcı alınmaması.
13. Canlı turda cevap gizliliği.
14. Herkes seçtiğinde cevapların aynı anda açılması.
15. Konuğun `next` yetkisinin olmaması.
16. 10 turluk odalı oyun ve 9/10 özet hesabı.
17. Süre dolduğunda cevapsız turun açılması.
18. Süre sonrası oyun cevabının reddi.

## Değişmiş dosyalar

Bu handoff yazılırken çalışma ağacında henüz commit edilmemiş değişiklikler:

```text
M README.md
M app/api/game/route.ts
M app/globals.css
M app/page.tsx
M app/questions.ts
?? app/question-additions.ts
?? CLAUDE_HANDOFF.md
```

| Dosya | Değişiklik |
| --- | --- |
| `app/question-additions.ts` | 660 ek soru. Popüler kültür, seyahat, ilişki, absürt yaşam ve kişi/sporcu kategorileri. Temel sorularla toplam 720. |
| `app/questions.ts` | 31 kategori, soru birleştirme, trend seti, tekrar azaltmalı seçim algoritması. |
| `app/page.tsx` | Kategori filtreleri, arama, boş sonuç, dinamik kategori sayısı, kurulumda arama sıfırlama. |
| `app/globals.css` | Filtre, arama, kategori picker ve boş sonuç stilleri. |
| `app/api/game/route.ts` | Son dört oyun sorusunu okuyarak yeni turda tekrarları azaltma. |
| `README.md` | Güncel sayılar, kategori kapsamı ve geliştirme notları. |

## Bilinen sınırlar ve sonraki işler

### Mevcut sınırlar

- Canlı deployment yapılmadı.
- Git remote yok.
- Kullanıcılar hesapla eşitlenmez; her tarayıcı bağımsız anonim kimliktir.
- Bağlantıyı bilen herkes ilgili oyuna katılabilir.
- Oyun silme, oda kapatma, moderasyon ve raporlama yok.
- Uyum modu teknik olarak 64 kişiye izin verir; ürün dili esasen iki kişi uyumuna göre tasarlanmıştır.
- Güncel içerik `trendingIds` içinde elle güncellenir; otomatik trend beslemesi yoktur.
- Kullanıcı üretimli soru, favoriler, profil veya istatistik ekranları yok.

### Önerilen sonraki işler

1. Sites entegrasyonu erişildiğinde `appgprj_6aeb84cc7db48191a3d29aedc4b6853c` projesine deploy et ve public erişimi doğrula.
2. Canlı URL üzerinde smoke test yap: ana sayfa, yeni kategori, uyum daveti, iki kişilik oda.
3. Soru yönetimini JSON/CSV veya küçük yönetim paneliyle kolaylaştır.
4. Kategori sayısı artarsa seçicide daha belirgin filtreleme ve sabit arama alanı düşün.
5. Odalara isteğe bağlı oda adı, emoji ve soru sayısı seçimi ekle.
6. Sonuç ekranına paylaşılabilir görsel kart ekle.
7. Terk edilmiş oyunlar için temizleme stratejisi ekle.
8. Analitik istenirse yalnızca anonim ve açık rızalı kullanım ölçümü tasarla.

## Claude için çalışma talimatı

1. Bu dosyanın bulunduğu klasörü proje kökü kabul et.
2. Önce `git status --short` çalıştır; mevcut değişiklikleri koru. `git reset --hard` veya `git checkout --` kullanma.
3. Soru eklerken `app/question-additions.ts` içindeki dizilere yalnızca **sona ekleme** yap.
4. Yeni kategori eklerken `app/questions.ts` metadata’sını ve `app/page.tsx` içindeki `categoryGroups` haritasını birlikte güncelle.
5. Yeni kategori en az 10, tercihen 24 farklı soru içermeli.
6. Her içerik değişiminden sonra tür kontrolü, build ve yerel `check-game` kontrolünü çalıştır.
7. Database şeması değişmedikçe migration üretme.
8. Yayın varsa `.openai/hosting.json` içindeki proje kimliğini veya `DB` binding’ini değiştirme.

## Kaynak envanteri

Claude’un mutlaka okuması gereken ürün dosyaları:

```text
app/page.tsx
app/globals.css
app/questions.ts
app/question-additions.ts
app/api/game/route.ts
db/schema.ts
drizzle/0000_high_mathemanic.sql
scripts/check-game.mjs
.openai/hosting.json
README.md
package.json
```

Altyapı destek dosyaları da korunmalıdır:

```text
app/chatgpt-auth.ts
worker/index.ts
db/index.ts
scripts/run-framework.mjs
scripts/sites-env.mjs
vite.config.ts
next.config.ts
drizzle.config.ts
cloudflare-env.d.ts
```

`components/ui/` altındaki dosyalar starter kit bileşenleridir. Oyun arayüzü doğrudan `app/page.tsx` ve `app/globals.css` ile inşa edilmiştir.

## Son cümle

Proje teknik olarak yayınlanmaya hazırdır. Eksik olan tek zorunlu dış adım, mevcut Sites projesine kaynak paketin deploy edilmesi ve public URL’de hızlı smoke test yapılmasıdır.
