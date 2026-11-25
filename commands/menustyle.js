const fs = require('fs');
const path = require('path');
const isOwnerOrSudo = require('../lib/isOwner');

const stylePath = path.join(__dirname, '../data/menustyle.json');
const channelInfo = {};

if (!fs.existsSync(stylePath)) fs.writeFileSync(stylePath, JSON.stringify({ style: 1 }));
function getStyle() { try { return JSON.parse(fs.readFileSync(stylePath)).style || 1; } catch { return 1; } }
function saveStyle(s) { fs.writeFileSync(stylePath, JSON.stringify({ style: s })); }

const styles = {
    1: { name: '🥷 Style Ninja (défaut)', preview: '╔══╗\n║  ║\n╚══╝' },
    2: { name: '⚡ Style Électrique',    preview: '┌──┐\n│  │\n└──┘' },
    3: { name: '🌑 Style Sombre',        preview: '▛▀▀▜\n▌  ▐\n▙▄▄▟' },
    4: { name: '🎯 Style Minimal',       preview: '────\n    \n────' },
    5: { name: '👑 Style Royal',         preview: '◈════◈\n║    ║\n◈════◈' },
};

async function menustyleCommand(sock, chatId, senderId, args, message) {
    const current = getStyle();
    const num = parseInt(args[0]);

    if (!num || isNaN(num)) {
        let list = `╔══════════════════════╗\n║   🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀* 🥷   ║\n╠══════════════════════╣\n║  🎨 *STYLES DE MENU*   ║\n╚══════════════════════╝\n\n`;
        for (const [k, v] of Object.entries(styles)) {
            list += `┌──────────────────────\n│ *Style ${k}* — ${v.name}${parseInt(k) === current ? ' ✅' : ''}\n└──────────────────────\n`;
        }
        list += `\n💡 *Usage :* \`.menustyle <1-5>\`\n_Exemple : .menustyle 3_\n\n> _Propulsé par 🥷 CENTRAL-HEX_`;
        return await sock.sendMessage(chatId, { text: list, contextInfo: channelInfo }, { quoted: message });
    }

    if (!styles[num]) {
        return await sock.sendMessage(chatId, {
            text: `❌ *Style invalide !* Choisissez entre *1* et *5*.`, contextInfo: channelInfo
        }, { quoted: message });
    }

    saveStyle(num);
    return await sock.sendMessage(chatId, {
        text: `╔══════════════════════╗\n║   🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀* 🥷   ║\n╚══════════════════════╝\n\n✅ *Style de menu changé !*\n🎨 *Actuel :* ${styles[num].name}\n\n> _Utilisez .menu pour voir le changement._`,
        contextInfo: channelInfo
    }, { quoted: message });
}

module.exports = menustyleCommand;
