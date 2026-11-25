// weather.js — 𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 : météo d'une ville (wttr.in, sans clé)
const axios = require('axios');
const ui = require('../lib/ui');

module.exports = async function weatherCommand(sock, chatId, message, city) {
    try {
        const { data } = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1&lang=fr`, { timeout: 15000 });
        const cur = data.current_condition[0];
        const area = data.nearest_area?.[0]?.areaName?.[0]?.value || city;
        const desc = cur.lang_fr?.[0]?.value || cur.weatherDesc?.[0]?.value || '—';
        await sock.sendMessage(chatId, {
            text: ui.card('🌦️ MÉTÉO', [
                ['*Ville*', area],
                ['*Ciel*', desc],
                ['*Température*', `${cur.temp_C}°C (ressenti ${cur.FeelsLikeC}°C)`],
                ['*Humidité*', `${cur.humidity}%`],
                ['*Vent*', `${cur.windspeedKmph} km/h`],
            ]),
        }, { quoted: message });
    } catch (e) {
        await sock.sendMessage(chatId, { text: `❌ *Météo introuvable pour « ${city} ».*\nVérifie l'orthographe de la ville.` }, { quoted: message });
    }
};
