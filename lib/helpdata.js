// Explications détaillées — utilisées par : .help <commande>
// [description, utilisation, exemple]
module.exports = {
  // ───────────── GÉNÉRAL ─────────────
  help: [
    "Sans nom : explique comment utiliser le bot. Avec un nom de commande : explique en détail ce que fait cette commande, comment l'utiliser et donne un exemple.",
    ".help   ou   .help <commande>",
    ".help stiker",
  ],
  menu: [
    "Affiche le menu illustré : infos du bot (nom, développeurs, version, mode, préfixe, heure, date) puis toutes les commandes rangées par catégorie, chacune avec sa courte description.",
    ".menu",
    ".menu",
  ],
  'all-menu': [
    "Affiche la liste compacte de toutes les commandes, par catégorie, sans les descriptions. Pratique pour retrouver un nom rapidement.",
    ".all-menu",
    ".all-menu",
  ],
  ping: [
    "Mesure la vitesse de réponse du bot en millisecondes et montre qu'il est bien en ligne.",
    ".ping",
    ".ping",
  ],
  test: [
    "Fait un test rapide : le bot réagit à ton message, puis indique son statut, son temps de réponse et son temps de fonctionnement.",
    ".test",
    ".test",
  ],
  info: [
    "Affiche la fiche d'identité du bot : nom, version, développeurs, mode et système CENTRAL-HEX.",
    ".info",
    ".info",
  ],
  uptime: [
    "Indique depuis combien de temps le bot fonctionne sans interruption (jours, heures, minutes, secondes) et la mémoire qu'il utilise.",
    ".uptime",
    ".uptime",
  ],
  owner: [
    "Affiche les créateurs du bot (IB-SACKO & SALGA), le propriétaire (MOUDMA) et le système CENTRAL-HEX, avec leurs numéros. Les fiches de contact sont envoyées juste après pour les enregistrer en un clic.",
    ".owner",
    ".owner",
  ],
  script: [
    "Donne les liens officiels du bot : la chaîne WhatsApp CENTRAL-HEX et les contacts des créateurs.",
    ".script   (alias : .sc  .repo  .git)",
    ".script",
  ],
  loi: [
    "Affiche les règles du groupe (respect, pas de spam, pas de liens sans permission…). Tout manquement = avertissement puis expulsion.",
    ".loi",
    ".loi",
  ],
  meta: [
    "Affiche des informations sur WhatsApp / Meta et sur la bibliothèque utilisée par le bot.",
    ".meta",
    ".meta",
  ],

  // ───────────── GROUPE ─────────────
  staff: [
    "Liste tous les admins du groupe (le créateur du groupe est indiqué) et les mentionne. Fonctionne uniquement dans un groupe.",
    ".staff   (alias : .admins  .listadmin)",
    ".staff",
  ],
  'groupe info': [
    "Affiche la fiche du groupe : nom, description, nombre de membres et d'admins, date de création et photo. Fonctionne uniquement dans un groupe.",
    ".groupe info   (alias : .groupinfo  .infogp)",
    ".groupe info",
  ],
  totalmembres: [
    "Compte les membres du groupe : total, admins, super-admins et membres simples. Fonctionne uniquement dans un groupe.",
    ".totalmembres   (alias : .totalmembers)",
    ".totalmembres",
  ],
  gstatuts: [
    "Affiche le statut du groupe : nombre de membres, d'admins, date de création et liste des admins. Fonctionne uniquement dans un groupe.",
    ".gstatuts   (alias : .gstatus)",
    ".gstatuts",
  ],
  jid: [
    "Envoie l'identifiant (JID) de la discussion où tu écris : groupe ou chaîne WhatsApp. Utile pour configurer des outils.",
    ".jid",
    ".jid",
  ],
  gjid: [
    "Comme .jid mais en version complète : JID + nom du groupe, date de création et nombre de membres.",
    ".gjid",
    ".gjid",
  ],
  clan: [
    "Système de clans : crée un clan, rejoins celui d'un ami, quitte le tien ou affiche la liste des clans avec leur nombre de membres.",
    ".clan list  ·  .clan create <nom>  ·  .clan join <nom>  ·  .clan leave",
    ".clan create Les Invincibles",
  ],
  link: [
    "Raccourci rapide du blocage des liens (même système que .antilink). Sans option : affiche l'état. Dans un groupe uniquement.",
    ".link   ·   .link on   ·   .link off",
    ".link on",
  ],

  // ───────────── ADMINISTRATION ─────────────
  open: [
    "Ouvre le groupe : tout le monde peut de nouveau écrire. Le bot doit être admin du groupe.",
    ".open",
    ".open",
  ],
  close: [
    "Ferme le groupe : seuls les admins peuvent écrire. Le bot doit être admin du groupe.",
    ".close",
    ".close",
  ],
  mute: [
    "Coupe le chat du groupe (seuls les admins écrivent). Avec un nombre de minutes, le groupe se rouvre tout seul à la fin du délai. Le bot doit être admin.",
    ".mute   ou   .mute <minutes>",
    ".mute 30",
  ],
  unmute: [
    "Rouvre le chat du groupe et annule un mute programmé. Le bot doit être admin.",
    ".unmute",
    ".unmute",
  ],
  kick: [
    "Expulse un membre du groupe. Cible-le en le mentionnant ou en répondant à son message. Le bot doit être admin.",
    ".kick @membre   (ou réponds à son message avec .kick)",
    ".kick @224600000000",
  ],
  kickall: [
    "Expulse tous les membres non-admins du groupe d'un seul coup. Les admins et le bot sont épargnés. Aucune confirmation : à utiliser avec prudence. Le bot doit être admin.",
    ".kickall",
    ".kickall",
  ],
  ban: [
    "Bannit un utilisateur du bot : il ne pourra plus utiliser aucune commande. Cible-le par mention ou en répondant à son message.",
    ".ban @membre   (ou réponds à son message)",
    ".ban @224600000000",
  ],
  warn: [
    "Donne un avertissement à un membre. À 3 avertissements, il est expulsé automatiquement. Cible par mention ou réponse. Le bot doit être admin.",
    ".warn @membre   (ou réponds à son message)",
    ".warn @224600000000",
  ],
  sanction: [
    "Applique une sanction choisie : warn (avertissement), mute (ferme le groupe) ou kick (expulsion). Cible par mention ou réponse. Sans type, c'est un avertissement.",
    ".sanction <warn|mute|kick> @membre",
    ".sanction kick @224600000000",
  ],
  promote: [
    "Nomme un membre admin du groupe. Cible par mention ou réponse. Le bot doit être admin.",
    ".promote @membre   (ou réponds à son message)",
    ".promote @224600000000",
  ],
  demote: [
    "Retire le rôle d'admin à un membre. Cible par mention ou réponse. Le bot doit être admin.",
    ".demote @membre   (ou réponds à son message)",
    ".demote @224600000000",
  ],
  approve: [
    "Approuve un membre : il est ignoré par les protections du bot (antilink, antibadword, etc.) dans ce groupe. Cible par mention ou réponse.",
    ".approve @membre   (ou réponds à son message)",
    ".approve @224600000000",
  ],
  purge: [
    "Nettoie le chat : le bot supprime les derniers messages qu'il a en mémoire dans le groupe (10 par défaut, 50 maximum). Le bot doit être admin pour supprimer les messages des autres.",
    ".purge   ou   .purge <nombre>",
    ".purge 20",
  ],

  // ───────────── MENTIONS ─────────────
  tagall: [
    "Mentionne tous les membres du groupe dans un seul message. Fonctionne uniquement dans un groupe.",
    ".tagall",
    ".tagall",
  ],
  tag: [
    "Envoie un message qui mentionne tout le monde avec ton texte, ou re-poste le message auquel tu réponds avec les mentions.",
    ".tag <texte>   (ou réponds à un message avec .tag)",
    ".tag Réunion à 20h !",
  ],
  hidetag: [
    "Mentionne tous les membres sans montrer la liste des @ : seul ton texte apparaît, mais tout le monde est notifié. Marche aussi en répondant à un média.",
    ".hidetag <texte>   (ou réponds à un message)",
    ".hidetag Venez vite !",
  ],

  // ───────────── PROTECTIONS ─────────────
  antilink: [
    "Supprime automatiquement les liens envoyés dans le groupe. Choisis l'action : delete (supprime), warn (supprime + avertit) ou kick (expulse). Les membres approuvés et les admins sont exemptés.",
    ".antilink on  ·  .antilink off  ·  .antilink set delete|warn|kick",
    ".antilink on",
  ],
  antibadword: [
    "Détecte les mots interdits (insultes) et applique l'action choisie : supprimer, avertir ou expulser. Les admins et membres approuvés sont exemptés.",
    ".antibadword on  ·  .antibadword off  ·  .antibadword set delete|warn|kick",
    ".antibadword on",
  ],
  antibot: [
    "Détecte les messages envoyés par d'autres bots dans le groupe et les ignore / bloque. Sans option, affiche l'état.",
    ".antibot on   ·   .antibot off",
    ".antibot on",
  ],
  antimention: [
    "Empêche le spam de mentions : un message qui mentionne plus de personnes que le seuil fixé est supprimé (admins exemptés).",
    ".antimention on  ·  .antimention off  ·  .antimention seuil <nombre>",
    ".antimention seuil 3",
  ],
  antistiker: [
    "Supprime automatiquement tous les stickers envoyés par les non-admins du groupe.",
    ".antistiker on   ·   .antistiker off   (alias : .antisticker)",
    ".antistiker on",
  ],
  antitag: [
    "Bloque les tags massifs (mentions de tous les membres). Action au choix : delete (supprime) ou kick (supprime + expulse).",
    ".antitag on  ·  .antitag off  ·  .antitag set delete|kick",
    ".antitag set kick",
  ],
  antidelete: [
    "Quand quelqu'un supprime un message, le bot te l'envoie en privé (texte, image, vidéo, audio, sticker). Les médias en vue unique sont aussi conservés.",
    ".antidelete on   ·   .antidelete off",
    ".antidelete on",
  ],
  anticall: [
    "Rejette automatiquement les appels reçus par le bot et envoie un message d'avertissement à l'appelant.",
    ".anticall on  ·  .anticall off  ·  .anticall status",
    ".anticall on",
  ],

  // ───────────── PARAMÈTRES ─────────────
  mode: [
    "Choisit qui peut utiliser le bot. En mode public, tout le monde peut utiliser les commandes. En mode privé, seul le propriétaire est écouté. Sans option, affiche le mode actuel.",
    ".mode public   ·   .mode private",
    ".mode public",
  ],
  setting: [
    "Affiche les réglages actuels du bot : mode, protections activées, préfixe, version.",
    ".setting   (alias : .settings)",
    ".setting",
  ],
  prompt: [
    "Définit la personnalité / le comportement de l'IA du bot. Sans option, affiche le prompt actuel. « reset » remet celui d'origine.",
    ".prompt   ·   .prompt set <texte>   ·   .prompt reset",
    ".prompt set Tu es un expert en football",
  ],
  menustyle: [
    "Change le style visuel du menu parmi 5 styles (Ninja, Électrique, Sombre, Minimal, Royal). Sans numéro, affiche la liste des styles.",
    ".menustyle   ·   .menustyle <1-5>",
    ".menustyle 3",
  ],
  setpp: [
    "Change la photo de profil du bot. Réponds à une image avec la commande.",
    ".setpp   (en répondant à une image)",
    ".setpp",
  ],

  // ───────────── MÉDIAS ─────────────
  stiker: [
    "Transforme une image ou une courte vidéo (12 secondes max) en sticker WhatsApp avec le pack UNIVER-MOUDMA.\n\n📌 Comment faire :\n1️⃣ Envoie ou choisis une image / vidéo\n2️⃣ Réponds-lui avec .stiker  (ou envoie le média avec .stiker en légende)\n3️⃣ Le bot te renvoie le sticker.\n\nAstuce : une image carrée donne un meilleur résultat.",
    ".stiker   (alias : .sticker  .s)   en répondant à une image/vidéo",
    ".stiker",
  ],
  take: [
    "Change le nom du pack et l'auteur d'un sticker existant. Réponds à un sticker avec la commande. Sépare le pack et l'auteur avec « | ».",
    ".take <pack> | <auteur>   (en répondant à un sticker)",
    ".take Mes Stickers | MOUDMA",
  ],
  attp: [
    "Crée un sticker animé à partir d'un texte (texte coloré qui clignote).",
    ".attp <texte>",
    ".attp Bonjour la team",
  ],
  ss: [
    "Prend une capture d'écran d'un site web et te l'envoie en image. Le lien doit commencer par http:// ou https://.",
    ".ss <lien>   (alias : .ssweb  .screenshot)",
    ".ss https://wikipedia.org",
  ],
  play: [
    "Cherche une musique sur YouTube (par titre ou lien) et l'envoie en audio.",
    ".play <titre ou lien YouTube>",
    ".play Burna Boy Last Last",
  ],
  video: [
    "Cherche une vidéo sur YouTube (par titre ou lien) et l'envoie en MP4.",
    ".video <titre ou lien YouTube>",
    ".video Davido Unavailable",
  ],

  // ───────────── VUE UNIQUE ─────────────
  waouh: [
    "Récupère un média « vue unique » (photo, vidéo ou vocal) et te l'envoie directement en privé, dans ta discussion avec le bot. Le bot reste silencieux dans la discussion d'origine.\n\n📌 Comment faire :\n1️⃣ Réponds au message vue unique\n2️⃣ Écris waouh (avec ou sans point)\n3️⃣ Va voir ton PV : le média est là.",
    "waouh   (en répondant à un média vue unique)",
    "waouh",
  ],
  humm: [
    "Comme .waouh : récupère un média « vue unique » et te l'envoie en privé, sans aucune réponse ni réaction dans la discussion. Il ne se passe rien si le message n'est pas une vue unique.",
    "humm   (en répondant à un média vue unique)",
    "humm",
  ],
  save: [
    "Sauvegarde dans ton privé le message auquel tu réponds : texte, image, vidéo, audio, sticker et aussi les médias en vue unique.",
    "save   (en répondant à un message)",
    "save",
  ],

  // ───────────── DIVERS ─────────────
  weather: [
    "Donne la météo actuelle d'une ville : conditions du ciel et température.",
    ".weather <ville>",
    ".weather Conakry",
  ],
  '8ball': [
    "Pose une question fermée à la boule magique, elle te répond (pour rire !).",
    ".8ball <question>",
    ".8ball Est-ce que je vais réussir ?",
  ],
};
