# Shop.co - E-Ticaret Web Uygulaması

Shop.co, kullanıcıların ürünleri inceleyebildiği, kategorilere göre filtreleme yapabildiği ve sepet yönetimi işlemlerini gerçekleştirebildiği dinamik bir e-ticaret arayüzüdür. Proje, tamamen Vanilla JavaScript kullanılarak modüler bir mimariyle geliştirilmiştir.

🔗 **Canlı Demo:** [Shop.co'yu İncele](https://serene-twilight-aae381.netlify.app/)  
---

## 🚀 Özellikler

- **Dinamik Veri Çekme:** Ürün bilgileri `db.json` üzerinden asenkron olarak çekilir (`fetch.js`).
- **Sepet Yönetimi:** Kullanıcı sepetindeki ürünler tarayıcının `Local Storage`'ında tutulur, böylece sayfa yenilendiğinde veriler kaybolmaz (`localStorage.js`, `cart.html`).
- **Modüler JavaScript Mimarisi:** Kod okunabilirliğini ve yönetimini kolaylaştırmak için işlemler farklı dosyalara ayrılmıştır (örn. `render.js`, `ui.js`, `slider.js`).
- **Çoklu Sayfa Yapısı:** - Ana Sayfa (`index.html`)
  - Kategori Sayfası (`categoryPage.html`)
  - Ürün Detay Sayfası (`productDetail.html`)
  - Sepet Sayfası (`cart.html`)
- **Dinamik Değerlendirme Sistemi:** Ürün puanlarına göre dinamik yıldız renderlama (`getStars.js`).
- **Özelleştirilmiş Stil Yönetimi:** CSS değişkenleri (`variables.css`) ve reset dosyaları (`reset.css`) ile temiz ve sürdürülebilir stil mimarisi.

---

## 🛠️ Kullanılan Teknolojiler

- **HTML5:** Semantik web standartlarına uygun iskelet yapısı.
- **CSS3:** Flexbox/Grid yapısı, CSS Variables ile tema yönetimi.
- **JavaScript (ES6+):** DOM manipülasyonu, asenkron işlemler (Fetch API) ve ES6 Modülleri.
- **JSON:** Sahte (mock) veri tabanı simülasyonu (`db.json`).

---

## 📂 Klasör ve Dosya Yapısı

Geliştirme süreci aşağıdaki klasör mimarisine göre yapılandırılmıştır:

- `css/` veya `styles/`: CSS dosyalarını barındırır (`index.css`, `reset.css`, `variables.css`).
- `js/`: İşlevlerine göre ayrılmış JavaScript modüllerini içerir.
  - `fetch.js`: API veya JSON'dan veri çeker.
  - `render.js`: Çekilen verileri DOM üzerinde HTML'e dönüştürür.
  - `localStorage.js`: Sepet verilerini tarayıcı hafızasına kaydeder ve okur.
  - `main.js`: Ana iş mantığını çalıştırır.
- `images/`: Projede kullanılan statik görseller.
- `db.json`: Ürün verilerini barındıran veri dosyası.

---

## 💻 Kurulum ve Çalıştırma

- Bu depoyu bilgisayarınıza klonlayın:
   ```bash
   git clone [https://github.com/nursahtuncel/shopCo.git](https://github.com/nursahtuncel/shopCo.git)
