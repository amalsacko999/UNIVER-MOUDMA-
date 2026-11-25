const fs = require('fs');
const path = require('path');

const ANTIBOT_FILE = path.join(__dirname, '../data/antibot.json');
const channelInfo = {};

function readState() { try { return JSON.parse(fs.readFileSync(ANTIBOT_FILE)); } catch { return {}; } }
function saveState(s) { fs.writeFileSync(ANTIBOT_FILE, JSON.stringify(s, null, 2)); }
function isAntibotEnabled(chatId) { return readState()[chatId] === true; }

// Signature corrigée : (sock, chatId, message, args, isSenderAdmin)
async function antibotCommand(sock, chatId, message, args, isSenderAdmin) {
    if (!chatId.endsWith('@g.us')) {
        return await sock.sendMessage(chatId, {
            text: '❌ *Uniquement dans les groupes !*', contextInfo: channelInfo
        }, { quoted: message });
    }

    const state = readState();
    const action = Array.isArray(args) ? args[0]?.toLowerCase() : args?.toLowerCase();
    const current = state[chatId] ? '🟢 Activé' : '🔴 Désactivé';

    if (!action) {
        return await sock.sendMessage(chatId, {
            image: { url: 'https://i.ibb.co/LzNM7yyD/IMG-20261124-WA0178.jpg' },
            caption: `╔═════════════════════╗\n║   🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀* 🥷   ║\n╠═════════════════════╣\n║   🤖 *ANTI-BOT*            ║\n╚═════════════════════╝\n\n📊 *Statut :* ${current}\n\n📌 *Commandes :*\n┌─────────────────────\n│ ⬡ .antibot on\n│ ⬡ .antibot off\n└─────────────────────\n\n🛡️ Bloque les messages des autres bots dans le groupe.\n\n> _Propulsé par 🥷 *CENTRAL-HEX*_`,
            contextInfo: channelInfo
        }, { quoted: message });
    }

    if (action === 'on') {
        state[chatId] = true;
        saveState(state);
        return await sock.sendMessage(chatId, {
            text: `╔═════════════════════╗\n║   🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀* 🥷   ║\n╚═════════════════════╝\n\n🤖 *Anti-Bot :* 🟢 Activé\n\n🛡️ _Aucun autre bot ne pourra interagir ici._`,
            contextInfo: channelInfo
        }, { quoted: message });
    }

    if (action === 'off') {
        state[chatId] = false;
        saveState(state);
        return await sock.sendMessage(chatId, {
            text: `╔═════════════════════╗\n║   🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀* 🥷   ║\n╚═════════════════════╝\n\n🤖 *Anti-Bot :* 🔴 Désactivé`,
            contextInfo: channelInfo
        }, { quoted: message });
    }
}

module.exports = { antibotCommand, isAntibotEnabled };
