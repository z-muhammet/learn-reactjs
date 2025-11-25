# Alışveriş Listesi

> Basit bir arayüze sahip, state yönetimi ve component'ler arası veri akışını anlamak için oluşturulmuş bir React projesidir.

<p align="center">
  <img src="preview/fullScreen.png" alt="Tam Ekran Görüntüsü" width="320" />
  <img src="preview/tabletScreen.png" alt="Tablet Görüntüsü" width="240" />
  <img src="preview/mobileScreen.png" alt="Mobil Görüntüsü" width="180" />
</p>

---
## Amaç
- React `state` ve `props` kullanarak component'ler arası veri iletişimini kavramak.
- Kullanıcı etkileşimleriyle (ekleme, silme, tamamlama) state'in nasıl güncellendiğini görmek.
- Form yönetimi ve kullanıcı girdisine göre yeni veri oluşturmak.
- Listeleri dinamik olarak render etmek ve `map` fonksiyonunu etkin kullanmak.
- Basit bir proje üzerinden React'in temel yapı taşlarını (component, state, props) pekiştirmek.

---
## Önemli Dosyalar
| Yol | Açıklama |
|-----|----------|
| `src/App.jsx` | Ana component. Tüm state'leri (toplam öğe, tamamlanan öğe) tutar ve diğer component'lere `props` aracılığıyla veri ve fonksiyonları aktarır. |
| `src/header.jsx` | Sayfanın başlığını gösteren basit bir component. |
| `src/form.jsx` | Yeni alışveriş öğesi eklemek için kullanılan form. Kullanıcı girdisini alıp `App` component'ine yeni öğe verisini gönderir. |
| `src/mainList.jsx` | Alışveriş listesini ve listedeki her bir öğeyi (`Item`) render eden component. Öğeleri silme ve tamamlama işlemlerinin mantığını içerir. |
| `src/summary.jsx` | Listenin alt kısmında bulunan, toplam ve tamamlanan öğe sayısını gösteren özet component'i. |

---
## Uygulama Akışı

1.  **Başlangıç**: `mainList.jsx` içinde tanımlı olan varsayılan liste ekranda gösterilir. `App.jsx` bu listedeki tamamlanmış ve toplam öğe sayılarını hesaplayarak `Summary` component'ine gönderir.
2.  **Öğe Ekleme**: Kullanıcı `form.jsx` üzerinden ürün adı ve miktar girip "Ekle" butonuna tıklar.
    -   Form, `App.jsx`'e yeni öğe objesini gönderir.
    -   `App.jsx` state'ini günceller ve bu yeni öğeyi `mainList.jsx`'e ekler.
    -   Toplam öğe sayısı artar ve `Summary` güncellenir.
3.  **Öğe Tamamlama**: Kullanıcı bir öğenin üzerine veya yanındaki checkbox'a tıklar.
    -   `mainList.jsx` içindeki `Item` component'i, öğenin `completed` durumunu `true` veya `false` olarak değiştirir.
    -   Tamamlanan öğe sayısı yeniden hesaplanır ve `App.jsx` üzerinden `Summary` component'ine iletilir.
4.  **Öğe Silme**: Kullanıcı bir öğenin yanındaki "❌" butonuna tıklar.
    -   `Item` component'i, öğeyi `items` dizisinden filtreler.
    -   Toplam ve tamamlanan öğe sayıları yeniden hesaplanır ve `Summary` güncellenir.

---
## Öğrenme Noktaları
| Konu | Örnek |
|------|-------|
| State Tanımı ve Güncelleme | `const [totalItems, setTotalItems] = useState(6);` |
| Props ile Veri Aktarımı | `<Summary completedItem={completedItem} totalItems={totalItems} />` |
| Props ile Fonksiyon Aktarımı | `<Form ItemSend={AddNewItem} />` |
| Listeleri Render Etme | `items.map((item) => (<Item item={item} key={item.id} />))` |
| Koşullu Stil Verme | `<li className={item.completed ? 'completed' : ''}>` |
| Form Kontrolü | `const [name, setName] = useState('');` <br> `<input type="text" value={name} onChange={(e)=> setName(e.target.value)} />` |

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
## Lisans
Bu çalışma öğrenme amaçlıdır. Kendi projelerinizde dilediğiniz gibi uyarlayabilir ve kullanabilirsiniz.