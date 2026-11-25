// settings.js — 𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 : réglages du bot et protections du groupe
const fs = require('fs');
const info = require('../lib/botinfo');
const ui = require('../lib/ui');

function readJson(file, fallback) {
    try { return JSON.parse(fs.readFileSync(file, 'utf-8')); } catch { return fallback; }
}
const onOff = v => (v ? '🟢 ON' : '🔴 OFF');

async function settingsCommand(sock, chatId, message) {
    try {
        const isGroup = chatId.endsWith('@g.us');
        const d = './data';
        const rows = [
            ['*Mode*', ui.getMode()],
            ['*Préfixe*', require('../settings').prefix || '.'],
            ['*Version*', info.VERSION],
            ['*Antidelete*', onOff(readJson(`${d}/antidelete.json`, {}).enabled || readJson(`${d}/antidelete.json`, {}).activé)],
            ['*Anticall*', onOff(readJson(`${d}/anticall.json`, {}).activé)],
        ];
        if (isGroup) {
            const ug = readJson(`${d}/userGroupData.json`, {});
            const has = o => !!(o && o[chatId] && (o[chatId].enabled !== false));
            rows.push(
                ['*Antilink*', onOff(has(ug.antilink))],
                ['*Antibadword*', onOff(has(ug.antibadword))],
                ['*Antitag*', onOff(has(ug.antitag))],
                ['*Antibot*', onOff(readJson(`${d}/antibot.json`, {})[chatId])],
                ['*Antistiker*', onOff(readJson(`${d}/antisticker.json`, {})[chatId])],
            );
        }
        await sock.sendMessage(chatId, { text: ui.card('⚙️ RÉGLAGES', rows) }, { quoted: message });
    } catch (e) {
        await sock.sendMessage(chatId, { text: '❌ Impossible de lire les réglages.' }, { quoted: message });
    }
}

module.exports = settingsCommand;
