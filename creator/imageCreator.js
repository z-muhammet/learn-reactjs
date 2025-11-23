const SPLASH_ACCESS_KEY = import.meta.env.VITE_SPLASH_ACCESS_KEY;

const cache = new Map();
const FALLBACK_URL = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzQxMDB8MHwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNzYzODEzMTkxfDA&ixlib=rb-4.1.0&q=80&w=700";

export async function imageCreators(searchKey) {
    if (!searchKey) return FALLBACK_URL;
    if (cache.has(searchKey)) return cache.get(searchKey);

    const randomPage = Math.floor(Math.random() * 7) + 1;
    console.log(`Arama anahtarı için rastgele sayfa: ${randomPage}`);
    console.log(`Arama anahtarı: '${searchKey}'`);
    console.log(`SPLASH_ACCESS_KEY: ${SPLASH_ACCESS_KEY ? SPLASH_ACCESS_KEY : 'Yok'}`);

    const apiUrl = `https://api.unsplash.com/search/photos?client_id=${SPLASH_ACCESS_KEY}&query=${searchKey}&per_page=1&page=${randomPage}`;

    try {
        console.log(`Unsplash isteği: '${searchKey}' (page=${randomPage})`);
        const response = await fetch(apiUrl);
        if (response.status === 403) {
            console.warn(`403 Forbidden: Muhtemelen rate limit veya geçersiz anahtar. Kelime='${searchKey}'`);
            cache.set(searchKey, FALLBACK_URL);
            return FALLBACK_URL;
        }

        if (!response.ok) {
            throw new Error(`HTTP Hata: ${response.status} (${response.statusText})`);
        }

        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const regularUrl = data.results[0].urls.regular;
            cache.set(searchKey, regularUrl);
            return regularUrl;
        } else {
            console.info(`Fotoğraf bulunamadı: '${searchKey}', yedek görsel kullanılıyor.`);
            cache.set(searchKey, FALLBACK_URL);
            return FALLBACK_URL;
        }
    } catch (error) {
        console.error(`Unsplash isteği sırasında hata ('${searchKey}'):`, error.message);
        cache.set(searchKey, FALLBACK_URL);
        return FALLBACK_URL;
    }
}
