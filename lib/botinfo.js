// Informations fixes du bot — source unique utilisée par le menu, owner, help, etc.
const settings = require('../settings');

module.exports = {
  BOT_NAME: 'UNIVER-MOUDMA',
  STYLED_NAME: '𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀',
  SYSTEM: 'CENTRAL-HEX',
  VERSION: settings.version || '1.0.0',
  IMAGE: 'https://i.ibb.co/LzNM7yyD/IMG-20261124-WA0178.jpg',
  CHANNEL: settings.waChannel,
  TZ: 'Africa/Conakry',
  CREATORS: [
    { name: 'IB-SACKO', number: '224621963059' },
    { name: 'SALGA', number: '224663109041' },
  ],
  OWNER: { name: 'MOUDMA', number: '224623068725' },
  FOOTER: '> 🥷 _by CENTRAL-HEX_',
};
