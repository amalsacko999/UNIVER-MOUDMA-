require('dotenv').config();

// ═══════════════════════════════════════════════════════
//   𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 — configuration générale
//   Système : CENTRAL-HEX
// ═══════════════════════════════════════════════════════
const settings = {
  packname: process.env.PACK_NAME || 'UNIVER-MOUDMA',
  author: process.env.PACK_AUTHOR || 'CENTRAL-HEX',
  botName: process.env.BOT_NAME || 'UNIVER-MOUDMA',
  botOwner: process.env.OWNER_NAME || 'MOUDMA',
  ownerNumber: process.env.OWNER_NUMBER || '224623068725',
  prefix: process.env.PREFIX || '.',
  giphyApiKey: process.env.GIPHY_API_KEY || '',
  commandMode: process.env.COMMAND_MODE || 'public',
  maxStoreMessages: 20,
  storeWriteInterval: 10000,
  description: 'Bot WhatsApp multifonctions - UNIVER-MOUDMA',
  version: process.env.BOT_VERSION || '1.0.0',
  ytch: process.env.YT_CHANNEL || '',
  waChannel: process.env.WA_CHANNEL || 'https://whatsapp.com/channel/0029VbDCmVWISTkNEy1D3p3H',
  updateZipUrl: process.env.UPDATE_ZIP_URL || '',
};

module.exports = settings;
