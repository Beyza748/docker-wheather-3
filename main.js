import { getWeather } from './services/weather.js';
import { getTime } from './services/time.js';
import { getCountry } from './services/country.js';
import { getAdvice } from './services/advice.js';

async function loadDashboard() {
    // 1. HAVA DURUMU
    try {
        const weather = await getWeather(41.01, 28.97);
        document.getElementById('weather-card').innerHTML = `
            <h3>☀️ Hava Durumu</h3>
            <p>Sıcaklık: ${weather.current_weather.temperature}°C</p>
        `;
    } catch (e) {
        document.getElementById('weather-card').innerHTML = `
            <h3>☀️ Hava Durumu</h3>
            <p style="color: #ff4d4d;">⚠️ Veri görüntülenemiyor</p>
        `;
    }

    // 2. ZAMAN (Genelde hata veren yer)
    try {
        const time = await getTime('Europe/Istanbul');
        document.getElementById('time-card').innerHTML = `
            <h3>🕒 Yerel Saat</h3>
            <p>${time.datetime.substring(11, 19)}</p>
        `;
    } catch (e) {
        document.getElementById('time-card').innerHTML = `
            <h3>🕒 Yerel Saat</h3>
            <p style="color: #ff4d4d;">⚠️ Zaman görüntülenemiyor</p>
        `;
    }

    // 3. ÜLKE BİLGİSİ
    try {
        const country = await getCountry('TR');
        document.getElementById('country-card').innerHTML = `
            <h3>🏳️ Ülke Bilgisi</h3>
            <img src="${country[0].flags.png}" width="50" style="margin: 5px 0" />
            <p>${country[0].name.common}</p>
        `;
    } catch (e) {
        document.getElementById('country-card').innerHTML = `
            <h3>🏳️ Ülke Bilgisi</h3>
            <p style="color: #ff4d4d;">⚠️ Bilgi görüntülenemiyor</p>
        `;
    }

    // 4. GÜNÜN TAVSİYESİ
    try {
        const adviceData = await getAdvice();
        document.getElementById('advice-card').innerHTML = `
            <h3>💡 Tavsiye</h3>
            <p>"${adviceData.advice}"</p>
        `;
    } catch (e) {
        // Eğer HTML'de advice-card divi varsa çalışır
        const adviceDiv = document.getElementById('advice-card');
        if(adviceDiv) {
            adviceDiv.innerHTML = `<h3>💡 Tavsiye</h3><p style="color: #ff4d4d;">⚠️ Tavsiye görüntülenemiyor</p>`;
        }
    }
}

loadDashboard();
