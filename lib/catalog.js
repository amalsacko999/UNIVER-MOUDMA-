// Catalogue des commandes — source unique pour .menu, .all-menu et .help
// [nom affiché, description courte (≤ 20 caractères)]
const CATEGORIES = [
  { icon: '🤖', title: 'GÉNÉRAL', cmds: [
    ['help', "aide d'une commande"],
    ['menu', 'menu du bot'],
    ['all-menu', 'toutes les commandes'],
    ['ping', 'vitesse du bot'],
    ['test', 'tester le bot'],
    ['info', 'infos du bot'],
    ['uptime', 'temps en ligne'],
    ['owner', 'créateurs & proprio'],
    ['script', 'lien du bot'],
    ['loi', 'règles du groupe'],
    ['meta', 'infos WhatsApp'],
  ]},
  { icon: '👥', title: 'GROUPE', cmds: [
    ['staff', 'liste des admins'],
    ['groupe info', 'infos du groupe'],
    ['totalmembres', 'nombre de membres'],
    ['gstatuts', 'statut du groupe'],
    ['jid', 'JID du groupe'],
    ['gjid', 'JID + infos groupe'],
    ['clan', 'clans du groupe'],
    ['link', 'blocage liens rapide'],
  ]},
  { icon: '🛠️', title: 'ADMINISTRATION', cmds: [
    ['open', 'ouvrir le groupe'],
    ['close', 'fermer le groupe'],
    ['mute', 'couper le chat'],
    ['unmute', 'rouvrir le chat'],
    ['kick', 'expulser un membre'],
    ['kickall', 'expulser tous'],
    ['ban', 'bannir du bot'],
    ['warn', 'avertir (3 = kick)'],
    ['sanction', 'warn / mute / kick'],
    ['promote', 'nommer admin'],
    ['demote', 'retirer admin'],
    ['approve', 'exempter un membre'],
    ['purge', 'nettoyer le chat'],
  ]},
  { icon: '📣', title: 'MENTIONS', cmds: [
    ['tagall', 'mentionner tous'],
    ['tag', 'mention + texte'],
    ['hidetag', 'mention invisible'],
  ]},
  { icon: '🛡️', title: 'PROTECTIONS', cmds: [
    ['antilink', 'bloque les liens'],
    ['antibadword', 'bloque les insultes'],
    ['antibot', 'bloque les bots'],
    ['antimention', 'bloque les mentions'],
    ['antistiker', 'bloque les stickers'],
    ['antitag', 'bloque les tags'],
    ['antidelete', 'anti-suppression'],
    ['anticall', 'bloque les appels'],
  ]},
  { icon: '⚙️', title: 'PARAMÈTRES', cmds: [
    ['mode', 'public / privé'],
    ['setting', 'réglages du bot'],
    ['prompt', "personnalité de l'IA"],
    ['menustyle', 'style du menu'],
    ['setpp', 'photo du bot'],
  ]},
  { icon: '🎨', title: 'MÉDIAS', cmds: [
    ['stiker', 'image → sticker'],
    ['take', 'renommer sticker'],
    ['attp', 'texte → sticker'],
    ['ss', "capture d'un site"],
    ['play', 'musique YouTube'],
    ['video', 'vidéo YouTube'],
  ]},
  { icon: '👁️', title: 'VUE UNIQUE', cmds: [
    ['waouh', 'vue unique → PV'],
    ['humm', 'vue unique → PV'],
    ['save', 'sauver un média'],
  ]},
  { icon: '🎲', title: 'DIVERS', cmds: [
    ['weather', 'météo d\'une ville'],
    ['8ball', 'boule magique'],
  ]},
];

// Alias acceptés → nom du catalogue (pour .help <alias>)
const ALIASES = {
  menu: 'menu', 'all-menu': 'all-menu', allmenu: 'all-menu', allcmd: 'all-menu',
  sticker: 'stiker', stiker: 'stiker', s: 'stiker',
  antisticker: 'antistiker', antistiker: 'antistiker',
  gstatus: 'gstatuts', gstatuts: 'gstatuts',
  settings: 'setting', setting: 'setting',
  totalmembers: 'totalmembres', totalmembres: 'totalmembres',
  groupinfo: 'groupe info', groupeinfo: 'groupe info', 'groupe': 'groupe info', infogp: 'groupe info',
  github: 'script', sc: 'script', repo: 'script', script: 'script',
  mp3: 'play', ytmp3: 'play', song: 'play', ytmp4: 'video',
  screenshot: 'ss', ssweb: 'ss', steal: 'take',
};

function allNames() {
  return CATEGORIES.flatMap(c => c.cmds.map(x => x[0]));
}
function total() { return allNames().length; }

function resolve(input) {
  const k = String(input || '').toLowerCase().replace(/^[.!\/#]/, '').trim();
  if (!k) return null;
  if (ALIASES[k]) return ALIASES[k];
  return allNames().includes(k) ? k : null;
}

module.exports = { CATEGORIES, ALIASES, allNames, total, resolve };
