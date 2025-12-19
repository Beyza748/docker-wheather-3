import { getWeather } from './services/weather.js';
import { getTime } from './services/time.js';
import { getCountry } from './services/country.js';


async function loadDashboard() {
const weather = await getWeather(41.01, 28.97); // İstanbul
//const time = await getTime('Europe/Istanbul');
const country = await getCountry('TR');


const weatherCard = document.getElementById('weather-card');
const temp = weather.current_weather.temperature;
const wind = weather.current_weather.windspeed;


let weatherClass = 'weather-sunny';
if (wind > 20) weatherClass = 'weather-wind';


weatherCard.classList.add(weatherClass);
weatherCard.innerHTML = `
<h3>☀️ Hava Durumu</h3>
<p>Sıcaklık: ${temp}°C</p>
<p>Rüzgar: ${wind} km/h</p>
`;


document.getElementById('time-card').innerHTML = `
<h3>🕒 Yerel Saat</h3>
<p>${time.datetime.substring(11, 19)}Servis Geçici Olarak Kullanılmıyor.</p>
`;


document.getElementById('country-card').innerHTML = `
<h3>🏳️ Ülke Bilgisi</h3>
<img src="${country[0].flags.png}" width="80" />
<p>${country[0].name.common}</p>
<p>Para Birimi: ${Object.keys(country[0].currencies)[0]}</p>
`;
}


loadDashboard();
