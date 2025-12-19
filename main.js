import { getWeather } from './services/weather.js';
import { getTime } from './services/time.js';
import { getCountry } from './services/country.js';
import { getAdvice } from './services/advice.js';

async function loadDashboard() {
    // 1. Hava Durumu (Hata alsa bile durmaz)
    try {
        const weather = await getWeather(41.01, 28.97);
        document.getElementById('weather-card').innerHTML = `
            <h3>☀️ Hava Durumu</h3>
            <p>Sıcaklık: ${weather.current_weather.temperature}°C</p>
            <p>Rüzgar: ${weather.current_weather.windspeed} km/h</p>
        `;
    } catch (e) {
        console.error("Hava durumu yüklenemedi");
    }

    // 2. Zaman (Hata verirse sadece bu kart mesaj verir, diğerleri çalışır)
    try {
        const time = await getTime('Europe/Istanbul');
        document.getElementById('time-card').innerHTML = `
            <h3>🕒 Yerel Saat</h3>
            <p>${time.datetime.substring(11, 19)}</p>
        `;
    } catch (e) {
        document.getElementById('time-card').innerHTML = `
            <h3>🕒 Yerel Saat</h3>
            <p>Servis şu an kullanım dışı.</p>
        `;
    }

    // 3. Ülke Bilgisi
    try {
        const country = await getCountry('TR');
        document.getElementById('country-card').innerHTML = `
            <h3>🏳️ Ülke Bilgisi</h3>
            <img src="${country[0].flags.png}" width="80" />
            <p>${country[0].name.common}</p>
        `;
    } catch (e) {
        console.error("Ülke bilgisi yüklenemedi");
    }

    // 4. Günün Tavsiyesi
    try {
        const adviceData = await getAdvice();
        document.getElementById('advice-card').innerHTML = `
            <h3>💡 Günün Tavsiyesi</h3>
            <p>"${adviceData.advice}"</p>
        `;
    } catch (e) {
        console.error("Tavsiye yüklenemedi");
    }
}

loadDashboard();
