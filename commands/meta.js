// meta.js — UNIVER-MOUDMA
async function metaCommand(sock, chatId, message) {
    const version = require('@whiskeysockets/baileys').version || '6.x';
    await sock.sendMessage(chatId, {
        text: `📱 *META & WHATSAPP INFO*\n\n🏢 Entreprise : Meta Platforms Inc.\n📱 App : WhatsApp\n🌐 API : Baileys v${version}\n✅ Statut services : En ligne\n🔐 Chiffrement : End-to-end\n📊 Utilisateurs : +2 milliards\n🌍 Disponible : 180+ pays\n\n💡 Version bot : UNIVER-MOUDMA v1.0.0\n⚡ Framework : @whiskeysockets/baileys\n\n> 🥷 CENTRAL-HEX · CENTRAL-HEX`
    }, { quoted: message });
}
module.exports = metaCommand;
