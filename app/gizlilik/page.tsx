import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Gizlilik — O mu Bu mu?' };

// TASLAK: Köşeli parantezli yerler doldurulmalı ve metin yayından önce bir avukata kontrol ettirilmelidir.
export default function Privacy() {
  return <div className="app-shell">
    <header className="header"><Link className="brand" href="/" aria-label="O mu Bu mu? Ana sayfa"><span className="brand-mark">o<span>b</span></span><span>o mu bu mu<span className="brand-dot">?</span></span></Link></header>
    <main className="flow narrow legal">
      <Link className="back" href="/">← Ana sayfa</Link>
      <p className="legal-draft" role="note">Taslak metin. Yayından önce hukuki kontrolden geçecek.</p>
      <div className="eyebrow">KİŞİSEL VERİLER</div>
      <h1>Gizlilik ve aydınlatma metni</h1>
      <p>O mu Bu mu? üyelik istemeyen bir arkadaş oyunudur. Oynamak için hesap, e-posta, telefon numarası veya konum istemeyiz. Reklam ve analiz aracı kullanmayız.</p>

      <h2>Veri sorumlusu</h2>
      <p>[Ad Soyad / unvan], [adres]. İletişim: [e-posta adresi].</p>

      <h2>Hangi verileri işliyoruz?</h2>
      <ul>
        <li><strong>Oyunda yazdığın isim:</strong> Gerçek adını yazmak zorunda değilsin; takma ad yeterli.</li>
        <li><strong>Seçimlerin:</strong> Her soruda O mu, BU mu seçtiğin.</li>
        <li><strong>Anonim oyuncu anahtarı:</strong> Tarayıcında rastgele bir anahtar oluşturulur. Sunucuda bu anahtarın kendisi değil, geri çevrilemeyen özeti saklanır. Böylece aynı tarayıcıdan oyununa geri dönebilirsin.</li>
        <li><strong>Oyun bilgileri:</strong> Oyunun kategorisi, soruları, oluşturulma zamanı ve oda durumu.</li>
      </ul>
      <p>Tarayıcının kendi hafızasında (bu cihazda) şunlar tutulur: oyuncu anahtarı, son yazdığın isim ve son oyunlarının listesi. Bunları tarayıcı verilerini silerek kaldırabilirsin.</p>

      <h2>Neden işliyoruz?</h2>
      <p>Yalnızca oyunu oynatmak, seçimleri karşılaştırmak, sonucu göstermek ve aynı soruların arka arkaya gelmesini azaltmak için. Hukuki sebep: [KVKK m. 5/2-c, sözleşmenin kurulması ve ifası — avukat teyit edecek].</p>

      <h2>Kimler görür?</h2>
      <p>İsmin ve seçimlerin yalnızca aynı oyundaki katılımcılara, oyun kuralları içinde gösterilir: “Uyumunu keşfet” modunda kendi setini tamamlayanlara, “Birlikte oyna” modunda her tur açıldığında odadakilere. Oyun bağlantısını veya oda kodunu bilen herkes oyuna katılabilir; bağlantını kiminle paylaştığına dikkat et.</p>

      <h2>Ne kadar saklıyoruz?</h2>
      <p>Oyunlar ve içindeki isim ve seçimler, oyunun açılmasından 30 gün sonra otomatik olarak silinir.</p>

      <h2>Yurt dışına aktarım</h2>
      <p>Oyun [barındırma sağlayıcısı] altyapısında çalışır; veriler Türkiye dışındaki sunucularda işlenebilir. Aktarım KVKK m. 9 kapsamında [standart sözleşme — avukat teyit edecek] ile yapılır.</p>

      <h2>Hakların</h2>
      <p>KVKK m. 11 kapsamında verilerinin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve diğer haklarını kullanmak için [e-posta adresi] üzerinden bize yazabilirsin. Başvurunda oyun bağlantısını veya oda kodunu belirtirsen ilgili kaydı bulabiliriz.</p>

      <p className="legal-updated">Son güncelleme: [tarih]</p>
    </main>
  </div>;
}
