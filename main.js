import { getWeather } from './services/weather.js';
import { getCountry } from './services/country.js';
import { getAdvice } from './services/advice.js';

async function loadDashboard() {
    try {
        // 1. Verileri çekiyoruz
        const weather = await getWeather(41.01, 28.97);
        const country = await getCountry('TR');
        const adviceData = await getAdvice();

        // 2. Hava Durumu Kartı
        const weatherCard = document.getElementById('weather-card');
        const temp = weather.current_weather.temperature;
        const wind = weather.current_weather.windspeed;

        weatherCard.innerHTML = `
            <h3>☀️ Hava Durumu</h3>
            <p>Sıcaklık: ${temp}°C</p>
            <p>Rüzgar: ${wind} km/h</p>
        `;

        // 3. Zaman Kartı (Hata almamak için sabit yazı)
        document.getElementById('time-card').innerHTML = `
            <h3>🕒 Yerel Saat</h3>
            <p>Servis Geçici Olarak Kullanılmıyor.</p>
        `;

        // 4. Ülke Bilgisi Kartı
        const countryCard = document.getElementById('country-card');
        countryCard.innerHTML = `
            <h3>🏳️ Ülke Bilgisi</h3>
            <img src="${country[0].flags.png}" width="80" />
            <p>${country[0].name.common}</p>
            <p>Para Birimi: ${Object.keys(country[0].currencies)[0]}</p>
        `;

        // 5. Günün Tavsiyesi Kartı (Buraya ekledik)
        document.getElementById('advice-card').innerHTML = `
            <h3>💡 Günün Tavsiyesi</h3>
            <p>"${adviceData.advice}"</p>
        `;

    } catch (error) {
        console.error("Veriler yüklenirken bir hata oluştu:", error);
    }
}

// Fonksiyonu başlatıyoruz
loadDashboard();
