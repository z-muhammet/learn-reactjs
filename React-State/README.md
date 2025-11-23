# React-State  

> Dinamik veri üretimi, görsel çağırma (Unsplash), Tailwind CSS ile stillendirme ve component state yönetimini tek bir mini projede deneyimlemek için hazırlanmış bir çalışma alanı.

<p align="center">
  <img src="previewImg/galleryPage.png" alt="Galeri Ekranı" width="320" />
  <img src="previewImg/phonePage.png" alt="Mobil Görünüm" width="180" />
  <img src="previewImg/tabletView.png" alt="Tablet Görünüm" width="240" />
</p>

---
## Amaç
- React `state` ve `props` ilişkisini öğrenmek
- API'den dinamik içerik oluşturmak (rastgele kelime + baconipsum + görsel)
- Görseller için Unsplash API anahtarı kullanımı
- Tailwind CSS entegrasyonu ve responsive tasarım
- Basit galeri gezinmesi (ileri / geri) + seçili öğeye göre yeniden render

## Mimari Akış (Özet)

<p align="center">
  <img src="previewImg/artifactureFlow.png" alt="Veri üretim ve bileşen akışı diyagramı" width="520" />
</p>

- App ilk yüklemede veriyi üretir (kelime + cümle + görsel).
- Üretilen dizi ve selectedIndex MainContent'e aktarılır.
- Gallery index'i değiştirir; Detail seçili öğeyi gösterir.
- Görsel elde edilemezse imageCreator fallback uygular.

---
## Önemli Dosyalar
| Yol | Açıklama |
|-----|----------|
| `src/App.jsx` | Uygulama giriş noktası, veri çekme & seçili index state'i |
| `src/components/mainContent.jsx` | Seçilen öğeye göre galeri + detayları düzenler |
| `src/components/gallery.jsx` | Görsel gösterir ve gezinme butonlarını tetikler |
| `src/components/detail.jsx` | Seçili öğenin metinsel detaylarını listeler |
| `src/database/data.js` | `dynamicData` ile dış dünyaya veri sağlar |
| `creator/dataCreator.Js` | İçerik üretim orkestrasyonu (kelime / cümle / görsel) |
| `creator/imageCreator.js` | Unsplash görseli veya fallback üretir |
| `tailwind.config.js` | Tailwind içerik tarama ayarları |

---
## Ortam Değişkenleri
Unsplash için bir erişim anahtarı gerekiyor:
```
VITE_SPLASH_ACCESS_KEY=YOUR_UNSPLASH_ACCESS_KEY
```
Bu değer `.env` dosyasında tanımlanır ve `imageCreator.js` içinde `import.meta.env.VITE_SPLASH_ACCESS_KEY` ile okunur.
---
## Kurulum & Çalıştırma
```bash
# Bağımlılıkları kur
npm install

# Geliştirme sunucusunu çalıştır
npm run dev

```

Vite çalıştığında tarayıcıda tipik olarak: `http://localhost:5173`

---
## Veri Üretimi Mantığı
`createCustomDataArray` içeriği (basitleştirilmiş):
```js
createCustomDataArray({
  itemCount: 5,
  wordCount: 1,
  sentenceCount: 1,
  shortSentence: 1,
  imageCount: 1
}) => [ { title, word1, Sentence1, ShortSentence1, image1 }, ... ]
```
- Rastgele kelimeler: `random-word-api`
- Açıklamalar: `baconipsum`
- Görsel: Unsplash araması (başlığa göre)
- Fallback görsel: Rate limit veya sonuç yoksa tek sabit URL

---
## Arayüz Akışı
1. Uygulama açıldığında veri çekilir (5 öğe).  
2. State: `data[]` + `selectedIndex`.  
3. Gallery butonları `selectedIndex`'i günceller.  
4. Değişim -> React yeniden render -> Detay ve görsel değişir.  

---
## Öğrenme Noktaları
| Konu | Örnek |
|------|-------|
| State tanımı | `const [selectedIndex, setSelectedIndex] = useState(0);` |
| Prop geçişi | `<MainContent data={data} selectedIndex={selectedIndex} onChangeIndex={setSelectedIndex} />` |
| Derived state | `const current = data[selectedIndex];` |
| Fallback | Görsel bulunamazsa sabit URL kullanma |

---
## Hata / Rate Limit Yönetimi
- Unsplash 403 => `console.warn` + cache + fallback URL
- Aynı kelime tekrar istenirse cache sayesinde yeni istek atılmaz
- StrictMode çift çağrılarına karşı guard kullanılabilir (`useRef` ile)

---
## Tailwind Kullanımı
Bileşenlerde utility sınıflar: `flex`, `gap`, `text-slate-300`, `backdrop-blur-sm` vb.  
Responsive örneği: `flex-col-reverse sm:flex-row` ile mobilde alt-üst, geniş ekranda yan yana.

---

---
## Sık Sorular
| Soru | Cevap |
|------|-------|
| Neden bazı görseller aynı? | Rate limit / sonuç yok -> fallback devreye giriyor. |
| Neden veri iki kez çekildi? | Geliştirme modunda StrictMode effectleri iki kez çalıştırır. |
| Neden `.env` lazım? | Unsplash API güvenli anahtar saklama. |

---
## Lisans
Bu çalışma öğrenme amaçlıdır. Kendi projende dilediğin gibi uyarlayabilirsin. Görseller Unsplash lisansına tabidir.

---
---
## Özet
Bu proje; React state yönetimini, prop zincirini, dış API entegrasyonunu, görsel fallback mantığını ve Tailwind ile hızlı stil vermeyi aynı yerde gösterir. Kodla oynayarak state değişiminin render sürecini içselleştir.
