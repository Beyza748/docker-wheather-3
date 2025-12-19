import { getWeather } from './services/weather.js';
import { getTime } from './services/time.js';
import { getCountry } from './services/country.js';
import { getAdvice } from './services/advice.js';

async function loadDashboard() {
    // 1. Hava Durumu (Hata alsa da diğerlerini engellemez)
    try {
        const weather = await getWeather(41.01, 28.97);
        document.getElementById('weather-card').innerHTML = `
            <h3>☀️ Hava Durumu</h3>
            <p>Sıcaklık: ${weather.current_weather.temperature}°C</p>
        `;
    } catch (e) { console.error("Hava durumu yüklenemedi"); }

    // 2. Zaman (HATA BURADAYDI - Try/Catch içine aldık)
    try {
        const time = await getTime('Europe/Istanbul');
        document.getElementById('time-card').innerHTML = `
            <h3>🕒 Yerel Saat</h3>
            <p>${time.datetime.substring(11, 19)}</p>
        `;
    } catch (e) {
        document.getElementById('time-card').innerHTML = `
            <h3>🕒 Yerel Saat</h3>
            <p style="font-size: 12px; color: gray;">Servis geçici olarak kapalı.</p>
        `;
    }

    // 3. Ülke Bilgisi
    try {
        const country = await getCountry('TR');
        document.getElementById('country-card').innerHTML = `
            <h3>🏳️ Ülke Bilgisi</h3>
            <img src="${country[0].flags.png}" width="50" style="margin: 5px 0;" />
            <p>${country[0].name.common}</p>
        `;
    } catch (e) { console.error("Ülke yüklenemedi"); }

    // 4. Günün Tavsiyesi
    try {
        const adviceData = await getAdvice();
        // Eğer index.html'de advice-card yoksa hata vermemesi için kontrol ekledik
        const adviceDiv = document.getElementById('advice-card');
        if(adviceDiv) {
            adviceDiv.innerHTML = `<h3>💡 Tavsiye</h3><p>"${adviceData.advice}"</p>`;
        }
    } catch (e) { console.error("Tavsiye yüklenemedi"); }
}

loadDashboard();
