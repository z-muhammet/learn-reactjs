import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), './', '.env') });

const SPLASH_ACCESS_KEY = process.env.Splash_access_Key;
let _regularUrl = "";

export async function imageCreators(searchKey) {
    
    const randomkey = Math.floor(Math.random() * 8); // random gelmesi gerekiyordu watafaaaaak
    const key = randomkey === 0 ? 1 : randomkey;

    const apiUrl = `https://api.unsplash.com/search/photos?client_id=${SPLASH_ACCESS_KEY}&query=${searchKey}&per_page=1&page=${key}`;
    try {
            console.log(`API'ye istek gönderiliyor: ${apiUrl}`);
            
            const response = await fetch(apiUrl); 
            if (!response.ok) {
                throw new Error(`HTTP Hata: ${response.status} (${response.statusText})`);
            }
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const firstPhoto = data.results[0];
                const regularUrl = firstPhoto.urls.regular; 
                _regularUrl = regularUrl;
                return regularUrl;
            } else {
                _regularUrl = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzQxMDB8MHwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNzYzODEzMTkxfDA&ixlib=rb-4.1.0&q=80&w=700";
                console.log(`'${searchKey}' kelimesi için fotoğraf bulunamadı.`);
            }

        } catch (error) {
            console.error("İstek işlenirken kritik bir hata oluştu:", error.message);
            throw error;
        }
    return _regularUrl;
}
