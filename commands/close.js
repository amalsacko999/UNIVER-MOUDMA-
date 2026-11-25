// Close → Ferme le groupe (seuls les admins peuvent envoyer)
const isAdmin = require('../lib/isAdmin');

const channelInfo = {};

async function closeCommand(sock, chatId, senderId, message) {
    if (!chatId.endsWith('@g.us')) {
        return await sock.sendMessage(chatId, { text: '❌ *Uniquement dans les groupes !*', contextInfo: channelInfo }, { quoted: message });
    }


    try {
        // Verrouille le groupe : seuls les admins peuvent envoyer
        await sock.groupSettingUpdate(chatId, 'announcement');
        const meta = await sock.groupMetadata(chatId);

        await sock.sendMessage(chatId, {
            image: { url: 'https://i.ibb.co/LzNM7yyD/IMG-20261124-WA0178.jpg' },
            caption: `╔═══════════════════════╗\n║  🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 v1.0* 🥷  ║\n╠═══════════════════════╣\n║   🔒 *GROUPE FERMÉ*      ║\n╚═══════════════════════╝\n\n👥 *${meta.subject}*\n\n┌──────────────────────\n│ 🔒 Statut : *Fermé*\n│ 👑 Seuls les admins peuvent écrire\n│ 📅 Fermé par @${senderId.split('@')[0]}\n└──────────────────────\n\n> _Pour rouvrir : .open_\n> _Propulsé par 🥷 CENTRAL-HEX_`,
            mentions: [senderId],
            contextInfo: channelInfo
        }, { quoted: message });
    } catch (e) {
        console.error('❌ [close]', e.message);
        await sock.sendMessage(chatId, { text: '❌ *Impossible de fermer le groupe.*\n_Vérifiez les permissions du bot._', contextInfo: channelInfo }, { quoted: message });
    }
}

module.exports = closeCommand;
