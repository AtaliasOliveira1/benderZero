//Base 100% Editável créditos para Bender

//Página oficial benderbot.com

//Siga-me em todas as minhas redes sociais para ficar informado sobre atualizações da base 

//Módulos
const { default: makeWASocket,
  DisconnectReason, JulsBotIncConnect, getAggregateVotesInPollMessage, delay, makeCacheableSignalKeyStore, useMultiFileAuthState,
 fetchLatestBaileysVersion, 
 generateForwardMessageContent,
 prepareWAMessageMedia, 
 generateWAMessageFromContent, 
 generateMessageID,
  downloadContentFromMessage, 
  jidDecode,
   proto } = require("baileys")
const fs = require('fs')
const { Boom } = require('@hapi/boom')
const NodeCache = require("node-cache")
const readline = require("readline")
const PhoneNumber = require('awesome-phonenumber')
const cfonts = require('cfonts');
const fetch = require('node-fetch')
const pino = require('pino')
const util = require("util")
const speed = require("performance-now");
const mimetype = require('mime-types')
const { exec, spawn, execSync } = require("child_process")
let phoneNumber = "559985011115"; // mude o número
const axios = require("axios")
 const ffmpeg = require('fluent-ffmpeg')
 
 //cor
const chalk = require('chalk')
const color = (text, color) => { return !color ? chalk.green(text) : chalk.keyword(color)(text) };
 
 //banner
const banner = cfonts.render("Bender| Bot", {
  font: 'pallet',
  align: 'center',
  gradient: ["green","blue"]
})
      // FUNÇÕES DE DOWNLOAD 
const { fetchJson , getBuffer ,fetchBuffer } = require('./fuction/download/gets.js')


const {getExtension, getRandom } =require('./fuction/settings/fuctions.js')

 //Stickers
const { sendVideoAsSticker, sendImageAsSticker } = require('./fuction/sticker/rename.js');
const { sendVideoAsSticker2, sendImageAsSticker2 } = require('./fuction/sticker/rename2.js');
 
 //Grupos js
const { MoneyOfSender, addkoin, delkoin, AddReg, checkOfReg , addLevel, addXp,levelOfsender , xpOfsender ,checkOfRegM ,addkoinM , delkoinM , MoneyOfM,Rxp, addRxp ,addRep , delRep , repUser  } = require('./settings/Grupo/Js/reg.js')
     
           // JOGOS
const  { addClaim , checkClaim , timeClaim ,expiredClaim } = require('./Games/Js/claim.js')
const { checkCasino,checkAttp,checkEmoji,checkEve, addClaimTraga, checkClaimTraga, timeClaimTraga, checkRuleta,checkMinar,addCasino,addAttp,addEmoji,addEve,addRuleta ,addMinar,expiredCasino,expiredMinar,expiredAttp,expiredEmoji,expiredEve,expiredRuleta,timeAttp,timeEmoji,timeEve,timeRuleta,timeMinar,timeCasino,expiredDayli,JsonDayli,addDayli,timeDayli,checkDayli,checkPescar,timePescar,addPescar,expiredPescar}
 = require('./Games/Js/mining.js')

      
    // Menu bot js
const Menu = require ('./settings/Bot/Js/menu.js')

 //configurar grupos
const welkom = JSON.parse(fs.readFileSync('./settings/Grupo/Json/welkom.json')) 
const antilink = JSON.parse(fs.readFileSync('./settings/Grupo/Json/antilink.json'))
const bngp = JSON.parse(fs.readFileSync('./settings/Grupo/Json/grupo.json'))
const Antipv = JSON.parse(fs.readFileSync('./settings/Grupo/Json/chat.json'))
const registro = JSON.parse(fs.readFileSync('./settings/Grupo/Json/registros.json')) 
const Exportion = JSON.parse(fs.readFileSync('./Games/Json/exportion.json'))
const Exportion1 = JSON.parse(fs.readFileSync('./Games/Json/exportion1.json'))
const Cuestions = JSON.parse(fs.readFileSync('./Games/Json/cuestions.json'))
              
   // TEMPO
const moment = require("moment-timezone") 
const time = moment.tz('America/Lima').format('DD/MM HH:mm:ss')
const horap = moment().format('HH')
var timeFt ='Bom dia! 🙋'
if (horap >= '01' && horap <= '05') {
  timeFt = 'Bom dia! ✨'
} else if (horap >= '05' && horap <= '12') {
  timeFt = 'Bom dia!! ☀️'
} else if (horap >= '12' && horap <= '18') {
  timeFt = 'Boa tarde! ⛅'
} else if (horap >= '18' && horap <= '23') {
  timeFt = 'Boa noite! 🌑'
} 


// WEBHOOK HEARTBEAT
const URL_WEBHOOK = 'https://info.ataliasloami.shop/api/bot/webhook';
//const URL_WEBHOOK = 'http://localhost:3000/api/bot/webhook';

const SECRET = "bot-webhook-secret-2024";

async function ping() {
  try {
    const res = await fetch(URL_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        is_online: true, 
        secret: SECRET 
      }),
    });
    if (res.ok) console.log(chalk.greenBright("💓 Heartbeat enviado com sucesso!"));
  } catch (err) {
    console.error(chalk.red("❌ Fez algo errado ou site fora do ar."));
  }
}

// Envia a cada 60 segundos
setInterval(ping, 60000);
ping(); // Envia o primeiro logo ao abrir 

// 1. Configurações do n8n
// Use a "Production URL" que você pega dentro do nó Webhook no n8n
const URL_WEBHOOK_N8N = 'https://n8n.ataliasloami.shop/webhook/da970d9d-29eb-4942-94a2-42e334f8329c'; 
const SECRET_N8N = "bot-webhook-secret-2024";

// 2. Função que avisa ao n8n que o bot está vivo
async function enviarHeartbeat() {
  try {
    const response = await fetch(URL_WEBHOOK_N8N, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        is_online: true, 
        secret: SECRET_N8N 
      }),
    });

    if (response.ok) {
      console.log(chalk.greenBright("💓 Heartbeat: Sinal enviado ao n8n!"));
    } else {
      console.log(chalk.yellow("⚠️ n8n recebeu, mas deu erro:"), response.status);
    }
  } catch (err) {
    console.error(chalk.red("❌ Erro ao conectar no n8n (Server offline?):"), err.message);
  }
}

// 3. Inicia o monitoramento
// Envia o primeiro sinal assim que liga
enviarHeartbeat(); 

// Repete o sinal a cada 60 segundos (1 minuto)
setInterval(enviarHeartbeat, 60000);

 //Configurações 
var { creador, owner, Bot, JpgBot } = require("./settings/settings.json");        
const prefixo = ['!']// @ Prefixos



const pairingCode = true;

const useMobile = process.argv.includes("--mobile")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

function getGroupAdmins(participants) {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}

async function startProo() {
  console.clear();
  console.log(banner.string);
  console.log(chalk.cyanBright("🔥 Bender Bot"));
  console.log(chalk.magentaBright("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  console.log(chalk.whiteBright("  🤖 Iniciando Bender Bot..."));
  console.log(chalk.magentaBright("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));

  // Estado da sessão
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const { version, isLatest } = await fetchLatestBaileysVersion();
  const msgRetryCounterCache = new NodeCache();

  // Criar socket
  const sock = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false, // Desabilitado para não mostrar QR
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }))
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
    syncFullHistory: false,
  });

  // 🟢 Se não houver sessão registrada, gerar código de pareamento de 8 dígitos
  if (!sock.authState.creds.registered) {
    let number = await question(
      chalk.cyan("📱 Enter your WhatsApp number with country code (numbers only): ")
    );
    rl.close();
    number = number.replace(/[^0-9]/g, "");

    if (!number) {
      console.log(chalk.redBright("❌ Número inválido."));
      process.exit(1);
    }

    console.log(chalk.yellowBright("⌛ Solicitando código de pareamento..."));
    try {
      const code = await sock.requestPairingCode(number);
      console.log(chalk.bgGreen.black("✅ CÓDIGO DE PAREAMENTO:"), chalk.white(code));
    } catch (err) {
      console.error(chalk.redBright("❌ Erro ao gerar código de pareamento:"), err.message);
      process.exit(1);
    }
  }

  // 🔄 Monitorar estado da conexão
  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
      if (reason === DisconnectReason.loggedOut) {
        console.log(chalk.redBright("❌ Sessão encerrada. Delete a pasta 'session' e pare novamente."));
      } else {
        console.log(chalk.yellowBright("⚠️ Conexão fechada, reconectando..."));
        startProo();
      }
    } else if (connection === "open") {
      console.log(chalk.greenBright("✅ Conectado com sucesso!"));
      console.log(chalk.cyanBright("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
      console.log(chalk.whiteBright("  ✨ Bender Bot está online!"));
      console.log(chalk.cyanBright("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
      exec("rm -rf tmp && mkdir tmp");
    }
  });

  // Salvar credenciais quando atualizadas
  sock.ev.on("creds.update", saveCreds);



    
               // CONEXÃO
        // BOAS-VINDAS E DESPEDIDAS
sock.ev.on("group-participants.update", async (anu) => {
if(!welkom.includes(anu.id)) return
try {
const metadata = await sock.groupMetadata(anu.id)
  participants = anu.participants
  for (let num of participants){
 
if(anu.action == 'add') {
const grup = metadata.subject
const num = anu.participants[0]
const mem = metadata.participants.length
const descr = metadata.desc
const sol = `
✦━─⌬༓༒༓⌬─━✦
*✧༺ 𝑩�-𝒗�𝒏𝒐/𝒂 ✦༻✧*

💌 「 Olá @${num.split('@')[0]} 🌟 e bem-vindo/a ao reino de *${grup}* 」
🥂 Que sua estadia seja cheia de risadas, boa conversa 🗨 e alguma cerveja 🍯🍺

📜 Lembre-se de verificar nossas regras para não invocar os dragões 🐉🔥
 
『 👥 Membros atuais: ${mem} 』
✦━─⌬༓༒༓⌬─━✦
`

await sock.sendMessage(anu.id, {
  image: { url: "https://i.ibb.co/HDf3hw9J/20250702-214923.jpg" },
  caption: sol,
  mentions: [num]  // 👈 Aqui você faz a menção real
})
}
if (anu.action == 'promote') {
    num = anu.participants[0]    
    teks = `
✦━─┈༓༒༓┈─━✦

     *✧༺ 𝓝�𝓸 𝓐𝓭𝓶𝓲𝓷 ༻✧*

🪪 𝗡𝗼𝗺: @${num.split('@')[0]}
🌐 𝗚𝗿𝘂𝗽𝗼: ${metadata.subject}
💌 「 Parabéns! 🎉 Você foi promovido à mesa dos administradores 🪄 」

✦━─┈༓༒༓┈─━✦
`
  await sock.sendMessage(anu.id,{image : { url : "https://i.postimg.cc/0ygy14nq/20251017-152852.jpg" }, caption : teks})
    }

} 
}catch(e) {
console.log(chalk.redBright('Error: %s'), color(e, "red"))
}
})

//Boas-vindas e despedidas

sock.ev.on('creds.update', saveCreds)
sock.ev.on("messages.upsert",  () => { })

sock.ev.on('messages.upsert', async m => {
 try {
 const info = m.messages[0]
 if (!info.message) return 
 if (info.key && info.key.remoteJid == "status@broadcast") return
 
 // Mark message as read
 await sock.readMessages([info.key])
 const altpdf = Object.keys(info.message)
 const type = altpdf[0] == "senderKeyDistributionMessage" ? altpdf[1] == "messageContextInfo" ? altpdf[2] : altpdf[1] : altpdf[0]
const content = JSON.stringify(info.message)
const from = info.key.remoteJid
 var body = (type === 'conversation') ? info.message.conversation : (type == 'imageMessage') ? info.message.imageMessage.caption : (type == 'videoMessage') ? info.message.videoMessage.caption : (type == 'extendedTextMessage') ? info.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? info.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? info.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? info.message.templateButtonReplyMessage.selectedId : ''

const budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''

var pes = (type === 'conversation' && info.message.conversation) ? info.message.conversation : (type == 'imageMessage') && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == 'videoMessage') && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == 'extendedTextMessage') && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ''

const numerodono = [
  `${owner}`
];


const verificarN = async(sla) => {
const [result] = await sock.onWhatsApp(sla)
if(result == undefined) {
enviar("Este usuário não existe no WhatsApp")
} else {
enviar(`${sla} Número existente no WhatsApp com id: ${result.jid}`)
}
}
    
// Constantes são
 const isGroup = info.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? info.key.participant: from
const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants || [] : [];
const nome = info.pushName ? info.pushName : ''
const groupAdmins = groupMembers.filter(p => p.admin);
const Sadm = isGroup ? getGroupAdmins(groupAdmins) :''
const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const text = args.join(' ')
const isCmd = body.startsWith(prefixo)
              
  // MULTIPREFIXO 
const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const prefixes = prefixo ? prefixo.map(prefix => prefix.toLowerCase()) : [];
const lowerBudy = budy.toLowerCase();
const hasPrefix = prefixes.some(prefix => lowerBudy.startsWith(prefix));
const commandArgs = hasPrefix ? lowerBudy.slice(prefixes.find(prefix => lowerBudy.startsWith(prefix)).length).trim().split(' ') : lowerBudy.trim().split(' ');
const comando = removeAccents(commandArgs[0]);
  // MULTIPREFIXO
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? sock.sendMessage(from, {text: teks.trim(), mentions: memberr}) : sock.sendMessage(from, {text: teks.trim(), mentions: memberr})}
const quoted = info.quoted ? info.quoted : info
const mime = (quoted.info || quoted).Mimetype || ""
const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}
const pushname = info.pushName ? info.pushName : ''
const isBot = info.key.fromMe ? true : false
const senderNumber = sender.split("@")[0]
const BotNumber = sock.user.id.split(':')[0]+'@s.whatsapp.net'
const isOwner =  numerodono.includes(sender)


const isGroupAdmins = groupAdmins.some(admin => admin.id?.includes(sender));
const isBotGroupAdmins = esAdminFlexible(sock, groupAdmins.map(p => p.id));

function esAdminFlexible(sock, listaDeAdmins = []) {
  if (!sock?.authState?.creds?.me) return false;

  const botId = sock.authState.creds.me.id;   // ex: 51916525000:26@lid
  const botLid = sock.authState.creds.me.lid; // ex: 51916525000@lid

  const clean = (jid) => jid?.split(':')[0]; // elimina o ":26" se existir

  return listaDeAdmins.some(adminJid => {
    const adminBase = clean(adminJid);
    return (
      adminJid === botId ||
      adminJid === botLid ||
      adminJid === botId.replace(/:\d+/, '') || // compara sem ":xx"
      adminJid === botLid.replace(/:\d+/, '') ||
      adminBase === clean(botId) ||
      adminBase === clean(botLid)
    );
  });
}

const isUrl = (url) => { return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi')) }
const deviceType = info.key.id.length > 21 ? 'Android' : info.key.id.substring(0, 2) == '3A' ? 'IPhone' : 'WhatsApp web'
const options = { timeZone: 'America/Lima', hour12: false }
const data = new Date().toLocaleDateString('PE', { ...options, day: '2-digit', month: '2-digit', year: '2-digit' })
const hora = new Date().toLocaleTimeString('PE', options) 

           // Novas constantes if
  const iswelkom = isGroup ? welkom.includes(from) : false
const isBanGp = isGroup ? bngp.includes(from) : false
const isAntipv = Antipv.includes('activo')
const isReg = true // Sistema de registro desabilitado - sempre retorna true
 const isAntiLink = isGroup ? antilink.includes(from) : false 
const coins = MoneyOfSender(sender)
 
 // 🟢 Sistema global de ligar/desligar bot

const estadoPath = './settings/estadoBot.json'


if (!fs.existsSync(estadoPath)) {
  fs.writeFileSync(estadoPath, JSON.stringify({ activo: true }, null, 2))
}
let botActivo = JSON.parse(fs.readFileSync(estadoPath)).activo
function guardarEstadoBot(estado) {
  fs.writeFileSync(estadoPath, JSON.stringify({ activo: estado }, null, 2))
  botActivo = estado
}

//

//MODO ADMIN 

const modoAdminPath = './settings/Grupo/Json/modo_admin.json';
const modoAdminList = fs.existsSync(modoAdminPath) ? JSON.parse(fs.readFileSync(modoAdminPath)) : [];
const isModoAdmin = isGroup ? modoAdminList.includes(from) : false;



 //Novas funções
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
} 
function DLT_FL(file) {
        try {
            fs.unlinkSync(file);
        } catch (error) {
            return;
        }
    }
    
 const enviar = (texto) => {
 sock.sendMessage(from,{ text : texto }, {quoted : info})
 }
 
 //ranks
const rangos = JSON.parse(fs.readFileSync('./settings/rangos.json'))
const YouN = levelOfsender(sender)
const Mlevel = rangos[YouN] || '🎖️𝐒𝐢𝐧 𝐑𝐚𝐧𝐠𝐨🎖️'

 
 

 
 const Rrxp = Rxp(sender)
 const Crxp = xpOfsender(sender)
 var Mrxp ;
 if(Crxp <= Rrxp + 50){
 var Mrxp = '*▒▒▒▒▒▒▒▒▒▒ 0%*'
 }else if(Crxp <= Rrxp + 100){
 var Mrxp = '*█▒▒▒▒▒▒▒▒▒ 10%*'
 }else if(Crxp <= Rrxp + 200){
 var Mrxp = '*██▒▒▒▒▒▒▒▒ 20%*'
 }else if(Crxp <= Rrxp + 300){
 var Mrxp = '*███▒▒▒▒▒▒▒ 30%*'
 } else if(Crxp <= Rrxp + 400){
 var Mrxp = '*████▒▒▒▒▒▒ 40%*'
 }else if(Crxp <= Rrxp + 500){
 var Mrxp = '*█████▒▒▒▒▒ 50%*'
 }else if(Crxp <= Rrxp + 600){
 var Mrxp = '*██████▒▒▒▒ 60%*'
 }else if(Crxp <= Rrxp + 700){
 var Mrxp = '*███████▒▒▒ 70%*'
 }else if(Crxp <= Rrxp + 800){
 var Mrxp = '*████████▒▒ 80%*'
 }else if(Crxp <= Rrxp + 999){
 var Mrxp = '*█████████▒ 90%*'
 } else if(Crxp >= Rrxp + 1000){
 var Mrxp = '*██████████ 100%*'
 }
 
             // Níveis
 // Constantes if
 const isImage = type == "imageMessage"
const isVideo = type == "videoMessage"
const isAudio = type == "audioMessage"
const isSticker = type == "stickerMessage"
const isContact = type == "contactMessage"
const isLocation = type == "locationMessage"
const isProduct = type == "productMessage"
const isMedia = (type === "imageMessage" || type === "videoMessage" || type === "audioMessage") 
typeMessage = body.substr(0, 50).replace(/\n/g, "")
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"
const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage")
const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage")
const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage")
const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage")
const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage")


const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
return buffer}



//função para mencionar 

const obtenerMencionado = (info) => {
    const context = info.message?.extendedTextMessage?.contextInfo
        || info.message?.contextInfo
        || null;

    if (context?.mentionedJid && context.mentionedJid.length > 0) {
        return context.mentionedJid[0];
    }

    if (context?.participant) {
        return context.participant;
    }

    return null;
};

     //  Time
const runtime = function(seconds) {
    seconds = Number(seconds);
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60); // Usando Math.floor() para garantir que os segundos sejam inteiros
    const parts = [];    
    if (days > 0) {
        parts.push(days + (days === 1 ? " 𝙳𝙸𝙰" : " 𝙳𝙸𝙰𝚂"));
    }
    if (hours > 0) {
        parts.push(hours + (hours === 1 ? " 𝙷𝙾𝚁𝙰" : " 𝙷𝙾𝚁𝙰𝚂"));
    }
    if (minutes > 0) {
        parts.push(minutes + (minutes === 1 ? "  𝙼𝙸𝙽𝚄𝚃𝙾" : " 𝙼𝙸𝙽𝚄𝚃𝙾𝚂"));
    }
   if (remainingSeconds > 0) {
    parts.push(remainingSeconds + (remainingSeconds === 1 ? " 𝚂𝙴𝙶𝚄𝙽𝙳𝙾" : " 𝚂𝙴𝙶𝚄𝙽𝙳𝙾𝚂"));
    }    
    return parts.join(', ');
}

  // Resposta
     const respuesta = {
  admin: "『 🚫 �𝒐çê �ã� é 𝒖� 𝒂𝒅𝒎𝒊𝒏 』",
  botadmin: "『 ⚠️ � 𝒃𝒐𝒕 ������� �𝒆 𝒑𝒆𝒓𝒎𝒊𝒔�ã� 𝒅𝒆 𝒂𝒅𝒎𝒊𝒏 』",
  grupos: "『 💬 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒅𝒊𝒔𝒑𝒐𝒏í��𝒍 ����𝒂𝒔 𝒆� 𝒈𝒓𝒖𝒑𝒐𝒔 』",
  vacio: "『 ❓ 𝒆𝒔𝒄𝒓��� 𝒂𝒍𝒈𝒐, ã ã ��������� 』",
  miowner: "『 ⛔ �𝒐çê ã� é �𝒆� 𝒓�𝒂𝒅𝒐𝒓 』",

  registro: `
╔════◇◆◇════╗
💬 ❝ 𝑷𝒓𝒊𝒎𝒆��𝒐 ��çê ����𝒊�𝒂 �𝒆 �𝒆𝒈𝒊𝒔𝒕𝒓𝒂𝒓 🤔 ¡É 𝒇á𝒊𝒍! 😄 ❞
💬 ❝ 𝑬𝒔𝒄𝒓���:  .𝒓𝒆𝒈 ❞
╚════◇◆◇════╝
`,

  yaregistro: `
╔══════◇◆◇══════╗
💬 ❝ ��������, ��çê já 𝒆𝒔𝒕á 𝒓𝒆𝒈𝒊𝒔𝒕𝒓𝒂𝒅𝒐 🗒 ❞
╚══════◇◆◇══════╝
`,

  coins: `『 💰 ᴄᴏɪɴs ɪɴsᴜғɪᴄɪᴇɴᴛᴇs @${sender.split('@')[0]} 』`
}

 
   // Verificado
 const SvnC = {key : {participant : '0@s.whatsapp.net'},message : {contactMessage : {displayName : `${pushname}`}}};
 
  // Funções para criar códigos de 6 dígitos
  
  function generateCode() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indice);
    }
    return codigo;
}


 // MENSAGENS DO CONSOLE
 
// comando privado
if (!isGroup && isCmd) console.log( '\n  ╔─━━━━ ', color(' 𝗖𝗠𝗗 「 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 」','blue'), '━━━━─╗','\n',
color(' GRUPO :','lime'),color(groupName,'cyan'),'\n',
color(' NOMBRE :','lime'),color(pushname,'cyan'),'\n',
color(' COMANDO :','lime'),color(comando,'cyan'),'\n',
color(' HORA :','lime'),color(hora,'cyan'),'\n',
color(' DATOS :','lime'),color(data,'cyan'),'\n',color(' ╚─━━━━━━ '),color ('𝗘𝗹𝗶𝘀𝘃𝗮𝗻 | 𝗥𝘆𝘂𝗸','red'), '━━━━━─╝')

//pv
if (!isCmd && !isGroup) console.log( '\n  ╔─━━━━━', color(' 𝗖𝗛𝗔𝗧 「 𝗕𝗢𝗧 」','blue'), '━━━━━─╗','\n',
color(' GRUPO :','lime'),color(groupName,'cyan'),'\n',
color(' NOMBRE :','lime'),color(pushname,'cyan'),'\n',
color(' MENSAJE :','lime'),color(budy,'cyan'),'\n',
color(' HORA :','lime'),color(hora,'cyan'),'\n',
color(' DATOS :','lime'),color(data,'cyan'),'\n',color(' ╚─━━━━━━━━ '),color ('【✔】 ','red'), '━━━━━━━━━─╝')

//comando de grupo
if (isCmd && isGroup) console.log( '\n  ╔─━━━ ', color('  𝗖𝗠𝗗「 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 」','blue'), '━━━─╗','\n',
color(' GRUPO :','lime'),color(groupName,'cyan'),'\n',
color(' NOMBRE :','lime'),color(pushname,'cyan'),'\n',
color(' COMANDO :','lime'),color(comando,'cyan'),'\n',
color(' HORA :','lime'),color(hora,'cyan'),'\n',
color(' DATOS :','lime'),color(data,'cyan'),'\n',color(' ╚─━━━━━━ '),color ('𝗘𝗹𝗶𝘀𝘃𝗮𝗻 | 𝗥𝘆𝘂𝗸','red'), '━━━━━─╝')

//mensagem de grupo
if (!isCmd && isGroup) console.log( '\n  ╔─━━━━━', color(' 𝗖𝗛𝗔𝗧「 𝗕𝗢𝗧 」','blue'), '━━━━━─╗','\n',
color(' GRUPO :','lime'),color(groupName,'cyan'),'\n',
color(' NOMBRE :','lime'),color(pushname,'cyan'),'\n',
color(' MENSAJE :','lime'),color(budy,'cyan'),'\n',
color(' HORA :','lime'),color(hora,'cyan'),'\n',
color(' DATOS :','lime'),color(data,'cyan'),'\n',color(' ╚─━━━━━━━━━ '),color ('【✔】 ','red'), '━━━━━━━━━─╝')
   
  
   expiredClaim();
 expiredMinar()
expiredAttp()
expiredEmoji()
expiredEve()
expiredDayli()
expiredPescar()
expiredRuleta()
//banir grupo
if(isBanGp) {
return
}
      // antiprivado
if(isAntipv && !isGroup && !isOwner){
sock.updateBlockStatus(sender, 'block')
}

//menu atalias
    const cabecalhomenu = `> 🤖 ʙᴏᴛ: *${Bot}*
> 👤 ᴜsᴜᴀʀɪᴏ: *${pushname}* 
> ✴️ ᴅᴏɴᴏ: *${creador}*`

// INÍCIO DOS COMANDOS
//só funciona se o bot estiver ativo
// Se o grupo estiver em modo admin e o usuário não for admin ou dono, o acesso é bloqueado
if (isModoAdmin && !isGroupAdmins && !isOwner) return;
if (!botActivo && !isOwner) return

switch(comando) {


case 'prueba':
enviar(`Este é um comando de teste 🌟🌟

......`);
break

case 'comando2':
enviar(`🧩Este é um novo comando`);
break
//Comandos do dono


  
case 'menu':
case 'help':
case 'comandos':
case 'commands': {
    if (!isReg) return enviar(respuesta.registro);

    const prefix = prefixo[0];
    let menuText = `${cabecalhomenu}
┏ _ғɪɢᴜʀɪɴʜᴀs ᴀʀᴍᴀᴢᴇɴᴀᴅᴀs:_ *6.000*
┗ 📂 4 ɢʙ ]
╰══𝐅𝐈𝐆𝐔𝐑𝐈𝐍𝐇𝐀𝐒══⪨
⋟📸 ${prefixo}s (ᴍᴀʀᴄᴀʀ ғᴏᴛᴏ)
⋟✏️ ${prefixo}ʀᴇɴᴀᴍᴇ (ɴᴏᴍᴇ/ɴᴏᴍᴇ)
⋟🖼️ ${prefixo}ғɪɢᴜʀɪɴʜᴀs
╰┈┈┈◜❁◞┈┈┈
⋟📂 ${prefixo}ᴍᴇɴᴜᴀᴅᴍ
╰─┈┈┈◜❁◞┈┈┈─╯

┏ _Grupo:_ ${groupName}
┗ 📂 Usuários: *${groupMembers.length}* ]`;

    await sock.sendMessage(from, { text: menuText, mentions: [sender] }, { quoted: info });
}
break;

case 'menuadm':
case 'menuadmin':
case 'menuadmins':
case 'admmenu': {
    if (!isReg) return enviar(respuesta.registro);
    if (!isGroup) return enviar('apenas disponível em grupos');

    const prefix = prefixo[0];
    let menuText = `┏ _ғɪɢᴜʀɪɴʜᴀs ᴀʀᴍᴀᴢᴇɴᴀᴅᴀs:_ *${groupMembers.length}*
┗ 📂 ${groupName} ]
╰══𝐀𝐃𝐌𝐈𝐍══⪨
⋟👋 ${prefixo}welcome 1/0
⋟🔗 ${prefixo}antilink 1/0
⋟👑 ${prefixo}modoadmin 1/0
⋟📢 ${prefixo}todos
⋟📢 ${prefixo}anuncio
⋟🚫 ${prefixo}ban/kick
⋟🔔 ${prefixo}notify
⋟🔒 ${prefixo}grupo
⋟🏆 ${prefixo}rankrep
⋟💰 ${prefixo}rankcoins
⋟⭐ ${prefixo}ranknivel
╰══𝐆𝐄𝐑𝐀𝐋══⪨
⋟🚫 ${prefixo}bangp
⋟✅ ${prefixo}unbangp
⭕ ${prefixo}botoff
✅ ${prefixo}boton
⋟🚫 ${prefixo}antiprivado
⋟👁️ ${prefixo}revelarvisu
🔄 ${prefixo}reiniciar
╰─┈┈┈◜❁◞┈┈┈─╯`;

    await sock.sendMessage(from, { text: menuText, mentions: [sender] }, { quoted: info });
}
break;

case 'menufigus':
case 'menufigurinhas': {
    if (!isReg) return enviar(respuesta.registro);

    const prefix = prefixo[0];
    let menuText = `┏ _ғɪɢᴜʀɪɴʜᴀs ᴀʀᴍᴀᴢᴇɴᴀᴅᴀs:_ *${groupMembers.length}*
┗ 📂 ${groupName} ]
╰══𝐅𝐈𝐆𝐔𝐒══⪨
⋟🎨 ${prefix}sticker
⋟✏️ ${prefix}attp
⋟✏️ ${prefix}attp2
⋟✏️ ${prefix}attp3
⋟🔀 ${prefix}emojimix
⋟🖼️ ${prefix}toimg
╰─┈┈┈◜❁◞┈┈┈─╯`;

    await sock.sendMessage(from, { text: menuText, mentions: [sender] }, { quoted: info });
}
break;

case 'sendstickers':
case 'figurinhas':
case 'figurinha':
case 'sendsticker': {
    if (!isReg) return enviar(respuesta.registro);
    
    try {
        if (!body) return enviar("❌ Erro ao processar comando.");
        const args = body.trim().split(/\s+/);
        let quantidade = parseInt(args[1]);
        if (isNaN(quantidade)) quantidade = 1;
        quantidade = Math.min(Math.max(1, quantidade), 10);

        // Função delay
        const delay = ms => new Promise(res => setTimeout(res, ms));

        const totalFigurinhas = 5532;

        for (let i = 0; i < quantidade; i++) {
            const num = Math.floor(Math.random() * totalFigurinhas);
            const repoIndex = Math.floor(num / 1000) + 1;
            const url = `https://raw.githubusercontent.com/AtaliasOliveira1/stickers-${repoIndex}/main/fig%20(${num}).webp`;

            try {
                await sock.sendMessage(from, { sticker: { url: url } });
                await delay(1000); // delay de 1s entre envios
            } catch (err) {
                console.error(`Erro ao enviar figurinha ${num}:`, err.message);
                enviar(`❌ Não consegui enviar uma das figurinhas. Tenta de novo!`);
                break;
            }
        }
        
        await addXp(sender, 5);

    } catch (e) {
        console.error(e);
        enviar("❌ Erro ao enviar figurinhas");
    }
}
break;

case 'menudown':
case 'menudownloads': {
    if (!isReg) return enviar(respuesta.registro);

    const prefix = prefixo[0];
    let menuText = `┏ _ғɪɢᴜʀɪɴʜᴀs ᴀʀᴍᴀᴢᴇɴᴀᴅᴀs:_ *${groupMembers.length}*
┗ 📂 ${groupName} ]
╰══𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒══⪨
⋟🎵 ${prefix}play
⋟🎬 ${prefix}playvideo
⋟📄 ${prefix}playdoc
⋟🎭 ${prefix}tiktok
⋟📘 ${prefix}facebook
⋟📸 ${prefix}instagram
⋟📁 ${prefix}mediafire
⋟📱 ${prefix}descargarapk
⋟📌 ${prefix}pinterest
╰─┈┈┈◜❁◞┈┈┈─╯`;

    await sock.sendMessage(from, { text: menuText, mentions: [sender] }, { quoted: info });
}
break;

case 'boton': 
case 'botonon':
case 'encenderbot':
  if (!isOwner) return enviar(respuesta.miowner)
  if (botActivo) return enviar('✅ O bot já está ligado.')
  guardarEstadoBot(true)
  enviar('🤖 O bot foi *ATIVADO* e voltará a responder aos comandos.')
break

case 'botoff':
case 'apagabot':
case 'offbot':
  if (!isOwner) return enviar(respuesta.miowner)
  if (!botActivo) return enviar('⚠️ O bot já estava desligado.')
  guardarEstadoBot(false)
  enviar('😴 O bot foi *DESATIVADO* e parará de responder aos comandos.')
break


case 'antiprivado':
case 'antipv':{
if(!isOwner) return enviar(respuesta.miowner)
if(args[0]=== 'on' ){
if(isAntipv) return enviar('O anti-privado já está ativo')
Antipv.push('activo')
fs.writeFileSync('./settings/Json/chat.json' , JSON.stringify(Antipv))
enviar('Anti-privado ativado com sucesso')
} else if(args[0] === 'off'){
if(!isAntipv) return enviar('O anti-privado já estava desativado')
Antipv.splice('desactivo')
fs.writeFileSync('./settings/Json/chat.json' , JSON.stringify(Antipv))
enviar('Anti-privado desativado com sucesso')
} else {
enviar('on para ativar e off para desativar')
}
}
break 



case 'rvisu': case 'revelarvisu': case 'open':
    //if(!isOwner) return enviar(respuesta.miowner)
    //enviar('🥱')
    try{    
        if(JSON.stringify(info).includes("videoMessage")) {
            var vio = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
            var viewImage = vio?.imageMessage || info.message?.imageMessage || vio?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || vio?.viewOnceMessage?.message?.imageMessage
            var viewVideo = vio?.videoMessage || info.message?.videoMessage || vio?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || vio?.viewOnceMessage?.message?.videoMessage
            viewVideo.viewOnce = false
            viewVideo.video = {url: viewVideo.url}
            //viewVideo.caption += "O vídeo foi *Revelado*"
            sock.sendMessage(from, viewVideo)
        } else {
            var vio = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
            var viewImage = vio?.imageMessage || info.message?.imageMessage || vio?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || vio?.viewOnceMessage?.message?.imageMessage
            var viewVideo = vio?.videoMessage || info.message?.videoMessage || vio?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || vio?.viewOnceMessage?.message?.videoMessage
            viewImage.viewOnce = false
            viewImage.image = {url: `${viewImage.url}`}
            viewImage.caption += "😼"
            sock.sendMessage(from, viewImage)
        }
    } catch(e){
        console.log(chalk.redBright(e))
        enviar(e)
    }
    break
    
case 'reiniciar': {
    console.log("=== DEBUG REINICIAR ===");
    console.log("Número que executa o comando:", sender);
    console.log("Número(s) configurados como owner:", global.owner || owner || "Não definido");
    console.log("É owner?:", isOwner);

    if (!isOwner) return enviar(respuesta.miowner);

    enviar('𝚁𝙴𝙸𝙽𝙸�𝙸����, ������� �� ������𝙾 ');
    setTimeout(async () => {
        console.log("Reiniciando o bot...");
        process.exit(0);
    }, 1000);
}
break;

// ...

//informação 

case 'infobot': case 'ping': {
if (!isGroup) return
let timestamp = speed()
let latensi = speed() - timestamp
uptime = process.uptime()
botinfo = `
╔═【 𝑰𝒏𝒇𝒐 𝒅� 𝑩𝒐𝒕 】═╗
⏰  𝐇𝐎𝐑𝐀  »  ${time}
📅  ���𝐀 »  ${data}
🤖  𝐍𝐎𝐌𝐄 »  ${Bot}
🔰  𝐏𝐑𝐄𝐅𝐈�𝐎 »  𝓜𝓾𝓵𝓽𝓲𝓹𝓻𝓮𝓯𝓲𝓳𝓸
⚡  𝐕𝐄𝐋𝐎𝐂𝐈𝐃𝐀𝐃𝐄 »  ${latensi.toFixed(4)} seg
📲  𝐃𝐈𝐒𝐏𝐎𝐒𝐈𝐓𝐈𝐕𝐎 »  ${deviceType}
⏳  𝐄� 𝐋𝐈𝐍�𝐀 »  ${runtime(uptime)}
💾  𝐌𝐄𝐌Ó𝐑𝐈𝐀 »  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
👤  𝐔𝐒𝐔Á𝐑𝐈𝐎 »  ${pushname}
╚══❖═══════❖══╝
`
sock.sendMessage(from, { image: { url: JpgBot }, caption: botinfo }, { quoted: info })
}
break 

case 'botcompleto':
case 'bot':
enviar(`💫 ¿𝙌𝙪𝙧 𝙪� 𝙗𝙤𝙩 𝙘𝙤𝙢𝙥𝙡𝙚𝙩𝙤 𝙘𝙤� 𝙨𝙪𝙥𝙚𝙧 𝙁𝙪𝙣çõ𝙨? 🤖

*[💡]  ᴏɴʟɪɴᴇ 24/7*
*[💡]  sᴜᴘᴏʀᴛᴇ 100% ᴅɪsᴘᴏɴíᴠᴇʟ*
*[💡]  ᴏʀɢᴀɴɪᴢᴇ sᴇᴜ ɢʀᴜᴘᴏ*
*[💡]  ᴀᴅᴍɪɴɪsᴛʀᴇ sᴇᴜ ɢʀᴜᴘᴏ*
*[💡]  ᴘʀᴏᴛᴇᴊᴀ sᴇᴜ ɢʀᴜᴘᴏ*
*[💡]  ᴛᴏʀɴᴇ sᴇᴜ ɢʀᴜᴘᴏ ᴍᴀɪs ᴀᴛɪᴠᴏ*

  𝙋𝙍𝙀Ç𝙎 𝙋𝘼𝙍𝘼 � 𝘼𝙇𝙌𝙐𝙄𝙇𝙀𝙍 𝘿� 𝘽𝙊𝙏

*┠💵⃟ꦿ〢* ᴘʟᴀɴ ϙᴜɪɴᴢᴇɴᴀʟ (15 dias): USD$ 1,50
    
*┠💵⃟ꦿ〢* ᴘʟᴀɴ ᴍᴇɴsᴀʟ (30 dias): USD$ 2,90 ⭐(ᴍᴀɪs ᴘᴏᴘᴜʟᴀʀ)

*┠💵⃟ꦿ〢* ᴘʟᴀɴ sᴇᴍᴇsᴛʀᴀʟ (180 dias): USD$ 13,90

*┠💵⃟ꦿ〢* ᴘʟᴀɴ ᴀɴᴜᴀʟ (360 dias): USD$ 28,90

*┠💵⃟ꦿ〢* ʙᴏᴛ ᴘᴇʀsᴏɴᴀʟɪᴢᴀᴅᴏ (30 dias): USD$ 5,90 ⭐(ᴘᴏᴘᴜʟᴀʀ)


╚═════❖•ೋ° 🌟 °ೋ•❖═════╝

*__________🔒 𝙋𝙍𝙊𝙏𝙀ÇÕ𝙎 🔒__________*

*[🔐] ANTI-LINK*
*[🔐] ANTI-FAKE*
*[🔐] ANTI-CONTATO*
*[🔐] ANTI-LOCALIZAÇÃO*
*[🔐] ANTI-DOCUMENTO*
*[🔐] ANTI-VIDEO*
*[🔐] ANTI-IMAGEM*
*[🔐] ANTI-AUDIO*
*[🔐] ANTI-VIEWONCE*

*_________🔧 𝙍𝙀𝘾𝙐𝙍𝙎𝙊𝙎 🔧__________*
*[🛠️] ᴄʀɪᴀʀ sᴛɪᴄᴋᴇʀs*
*[🛠️] ᴅᴇsᴄᴀʀɢᴀʀ ᴍúsɪᴄᴀs*
*[🛠️] ᴅᴇsᴄᴀʀɢᴀʀ ᴠíᴅᴇᴏs*
*[🛠️] ᴀʙʀɪʀ ᴇ ғᴇᴄʜᴀʀ ɢʀᴜᴘᴏ ᴄᴏᴍ ᴛᴇᴍᴘᴏ*
*[🛠️] ʙᴀɴ ᴇ ᴋɪᴄᴋ*
*[🛠️] ᴊᴏɢᴏs*
*[🛠️] ᴄᴏᴍᴀɴᴅᴏs +🔞*


*_________👑 𝘾𝙊𝙉𝙏𝙍𝘼𝙏𝙀 👑__________*
[🔥] *Você pode contratar o bot diretamente do nosso site oficial*👇
[💬] https://naufrabot.com/`);
break

case 'personalizarbot': {

let texto = `🤖 *PERSONALIZAR BENDER BOT*

Este bot é *100% editável*, você pode modificá-lo completamente ao seu gosto.

📚 *Passos para personalizar o bot*

1️⃣ Mudar nome do bot
Edite o nome no arquivo principal do bot.

2️⃣ Mudar prefixo
Você pode mudar o prefixo de comandos facilmente.

3️⃣ Mudar mensagens
Todas as mensagens do bot são editáveis.

4️⃣ Mudar logo ou foto
Você pode colocar sua própria imagem ou marca.

5️⃣ Adicionar ou remover comandos
O bot é modular, você pode modificar os *case*.

6️⃣ Configurar APIs
Alguns comandos precisam de API externa.

7️⃣ Personalizar menu
Você pode editar o menu principal.

🎥 *Tutoriais completos no YouTube*

Criei *mais de 10 vídeos* explicando como personalizar o bot passo a passo 👇

📺 YouTube:
https://youtube.com/playlist?list=PLsjiVxv1dUKw1bKCmvj43AuUDYOm8ghPF&si=NB_u_fSGZx0HhggK

Lá você encontrará guias para:

✔ Personalizar comandos
✔ Modificar funções
✔ Configurar APIs
✔ Criar novos sistemas

🚀 *BENDER BOT é totalmente personalizável.*

Faça sua própria versão do bot!`

await sock.sendMessage(from,{ text: texto },{ quoted: info })

}
break


case 'comprarapi': {

let texto = `🌐 *COMPRAR API PARA O BOT*

Alguns comandos do bot precisam de *API externa* para funcionar corretamente.

Por exemplo:

📥 Downloads
🎨 Gerar stickers com texto
🌍 Requisições HTTP
📹 Downloads de Facebook
📸 Downloads de redes sociais
⚙️ Inteligência artificial 

Para usar estas funções você precisa de uma *API Key*.

🚀 *API oficial da Bender*

Você pode comprar sua API aqui:

🔗 https://api.naufrabot.com

📚 *Passos para usar a API*

1️⃣ Criar uma conta no site  
2️⃣ Comprar sua API Key  
3️⃣ Copiar a API Key  
4️⃣ Colar na configuração do bot  
5️⃣ Reiniciar o bot  

Depois disso os comandos funcionarão corretamente.

✨ *Vantagens da API*

✔ Respostas rápidas  
✔ Alta estabilidade  
✔ Muitas funções disponíveis  
✔ Suporte contínuo  

🌐 Site oficial:
https://api.naufrabot.com

🚀 *Potencialize seu bot com a API oficial da Bender.*`

await sock.sendMessage(from,{ text: texto },{ quoted: info })

}
break


case 'grupos':
enviar(`🧩 𝙂𝙍𝙐𝙋𝙊 𝙊𝙁𝙄𝘾𝙄𝘼𝙇 𝙋𝘼𝙍𝘼 𝙐𝙎𝘼𝙍 𝙐� 𝘽𝙊𝙏 𝘼𝙏𝙄𝙑𝙊 24/7 👇

➫https://chat.whatsapp.com/Jd7WKQBsAhkCG4k1SPxK7r?mode=ac_t`);
break

case 'serdueño':
case 'sercreador':
case 'owner':
case 'serowner':
enviar(`*🧩 Veja o seguinte vídeo onde ensino como se tornar dono do bot e usar os comandos de owner 👇*

➫https://youtu.be/LugjBfJEoiQ?si=Z-qaGhjNdC-p3fGS`);
break

case 'canal':
case 'canales':
enviar(`𝘾𝙖𝙣𝙖𝙡𝙚𝙨 𝙤𝙛𝙞𝙘𝙞𝙖𝙡𝙚𝙨 𝙥𝙖𝙧𝙖 𝙧𝙚𝙘𝙞𝙗𝙞𝙧:
🌐𝙉𝙤𝙫𝙚𝙙𝙖𝙙𝙚𝙨 
🌐𝙎𝙤𝙧𝙩𝙚𝙤𝙨
🌐𝙄𝙣𝙛𝙤𝙧𝙢𝙖𝙘𝙞𝙤𝙣 
🌐𝘼𝙘𝙩𝙪𝙖𝙡𝙞𝙯𝙖𝙘𝙞𝙤𝙣𝙚𝙨 𝙨𝙤𝙗𝙧𝙚 𝙚𝙡 𝙗𝙤𝙩

*➫ YouTube* 
https://youtube.com/@naufrazapp_bots?si=Ie89Ben9B1Mn-jOU

*➫ Sitio web*
https://naufrabot.com/

*➫ Instagram*
https://www.instagram.com/benderbot_official?igsh=cXFwemd0b213dWl1

*➫ Tik tok*
https://www.tiktok.com/@naufra.zapp?_t=8lMjEw7d9SX&_r=1

*➫ WhatsApp*
https://whatsapp.com/channel/0029Vaz3WoQ6RGJPJQcMXQ14
`)
break




case 'serbot':
    try {
        const moneybot = `𝗣𝗲𝗻𝘀𝗮 𝗾𝘂𝗲 ��𝗰ê 𝗴𝗲𝗮𝗿𝗶𝗮 � 𝗖ó𝗶𝗴𝗼 𝗤𝗥, 𝗩𝗲𝗿𝗱𝗮𝗱𝗲? 😂

𝗟𝗮𝗺𝗲𝗻𝘁𝗮���𝗲𝗻𝘁𝗲, *𝗲𝘀𝘁𝗲 𝗯𝗼𝘁 𝗻ã𝗼 𝗽�𝗲 𝘀𝗲𝗿 𝘀𝗲� 𝘀𝘂𝗯 𝗯𝗼𝘁* 𝗽𝗼𝗿𝗾𝘂𝗲 �𝘀�� 𝗰𝗼𝗺𝗽𝗿𝗼𝗺𝗲𝘁𝗲 𝘀 𝗿𝗲𝗰𝘂𝘀𝗼𝘀 𝗱� 𝘀𝗲𝗿𝘃𝗶𝗱𝗼𝗿 �  ����𝗮 𝗺𝗮�� 𝗹𝗲𝗻𝘁𝗼.  
𝗦� �𝗼𝗰ê �𝗲𝗮𝗹𝗺𝗲𝗻𝘁𝗲 𝗾𝘂�𝘀�𝗿 ��� 𝘀𝗲� 𝘀𝘂𝗯 𝗯𝗼𝘁, 𝗽�𝗲 𝗼𝗯𝘁𝗲 𝗺𝗮�� 𝗶𝗻𝗳𝗼𝗿𝗺𝗮çõ�� 𝗲� 𝗻��𝘀 𝗽á𝗶𝗻𝗮 𝘄𝗲𝗯:  
🔗 https://naufrabot.com/subbots/`;

        // Enviar mensagem final
        await enviar(moneybot);

    } catch (e) {
        console.error(e);
        enviar("Erro ao processar o comando.");
    }
break;


//CONFIGURAÇÕES DO GRUPO

case 'welcome' : 
case 'bienvenida' :
if (!isGroup) return 
if(args.length<1) return enviar('「 𝟏 𝐏𝐚𝐫𝐚 𝐀𝐜𝐭𝐢𝐯𝐚𝐫 𝐲 𝟎 𝐏𝐚𝐫𝐚 𝐃𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐫 」 ')
if(!isGroupAdmins) return enviar(respuesta.admin)
if(!isBotGroupAdmins) return enviar('O bot precisa ser administrador') 
if(Number(args[0])=== 1) {
if(iswelkom) return enviar('「 ✅ � 𝐁���-𝐯�𝐧𝐚𝐬 �á 𝐄𝐬𝐭á 𝐀𝐢𝐯𝐚𝐝𝐚 �� 𝐫𝐮𝐩𝐨 」 ')
welkom.push(from)
fs.writeFileSync('./settings/Grupo/Json/welkom.json',JSON.stringify(welkom))
enviar('「 ✅ 𝐀𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐄𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞 」')
} else if (Number(args[0])=== 0 ) {
if (!iswelkom) return enviar('「 ❌ � 𝐛���-𝐯�𝐧𝐚𝐬 𝐧ã𝐨 𝐞𝐬𝐭á 𝐚𝐢𝐯𝐚𝐝𝐚」')
welkom.splice(from,1)
fs.writeFileSync('./settings/Grupo/Json/welkom.json',JSON.stringify(welkom))
enviar('❌ 𝐃𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞 ')
} else {
enviar('「 𝟏 𝐏𝐚𝐫𝐚 𝐀𝐜𝐭𝐢𝐯𝐚𝐫 𝐲 𝟎 𝐏𝐚𝐫𝐚 𝐃𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐫 」')
}
break


case 'bangp':{
  if (!isGroup) return  
  if(!isOwner) return enviar(respuesta.miowner)
  if(!isBanGp) { // antes estava ao contrário
    const JsonGp = './settings/Grupo/Json/grupo.json';
    bngp.push(from)
    fs.writeFileSync(JsonGp, JSON.stringify(bngp));
    enviar('✅ GRUPO BANEADO COM SUCESSO')
  } else {
    enviar('⚠️ O GRUPO JÁ ESTÁ BANEADO')
  }
}
break

case 'unbangp':{
  if (!isGroup) return  
  if(!isOwner) return enviar(respuesta.miowner)
  if(isBanGp) { // antes também estava ao contrário
    const JsonGp = './settings/Grupo/Json/grupo.json';
    bngp = bngp.filter(g => g !== from)
    fs.writeFileSync(JsonGp, JSON.stringify(bngp));
    enviar('✅ GRUPO DESBANEADO COM SUCESSO')
  } else {
    enviar('⚠️ O GRUPO JÁ ESTÁ DESBANEADO')
  }
}
break



case 'todos':
case 'revivir':
  if(!isReg) return enviar(respuesta.registro)
if(!isGroup) return enviar('Es enserio invocar en un chat , te violo tu tio verdad')
if(!isGroupAdmins) return enviar(respuesta.admin) 
members_id = []
teks = (args.length > 1) ? body.slice(8).trim(): ''
teks += `𝐓𝐎𝐓𝐀𝐋 : ${groupMembers.length}\n`
nu = 0
for (let mem of groupMembers) {
nu += 1
teks += ` ➫[${nu.toString()}] @${mem.id.split('@')[0]}\n`
members_id.push(mem.id)
}
mentions(`
🗣️💬 ❝¡𝑳𝑳𝒂𝒎𝒂𝒅𝒂 𝒂 𝒕𝒐𝒅𝒐 𝑴𝒖𝒏𝒅𝒐!❞ \n\n➫ ${teks}
`, members_id, true)
break


case 'anuncio':{
if(!isGroup) return enviar('Es enserio invocar en un chat , te violo tu tio verdad')
if(!isGroupAdmins) return enviar(respuesta.admin) 
men = []
num = 0
teks = `
🗣💬 ❝𝑨𝒕𝒆𝒏çã𝒐 𝒂 𝒆𝒔𝒕𝒆 𝑨𝒏ú𝒏𝒄𝒊𝒐.❞
 👉 ❝ ${q} ❞ 👈 
\n`
for(let m of groupMembers){
num +=1 
teks += `• [${num.toString()}] @${m.id.split('@')[0]}\n`
men.push(m.id)
}
mentions(teks,men,true)
}
break 


case 'modoadmin': {
  if (!isGroup) return enviar("⚠️ Este comando só pode ser usado em grupos.");
  if (!isGroupAdmins) return enviar("🚫 Apenas administradores podem mudar este modo.");
  
  const JsonModoAdmin = './settings/Grupo/Json/modo_admin.json';
  let modoAdmin = JSON.parse(fs.readFileSync(JsonModoAdmin));

  const estado = args[0]; // pode ser "1" ou "0"

  if (!estado) return enviar("🧩 Use o comando corretamente:\n\n*modoadmin 1* → Ativar modo admin\n*modoadmin 0* → Desativar modo admin");

  if (estado === "1") {
    if (!modoAdmin.includes(from)) {
      modoAdmin.push(from);
      fs.writeFileSync(JsonModoAdmin, JSON.stringify(modoAdmin, null, 2));
      enviar("✅ *Modo admin ativado* — Agora apenas administradores podem usar o bot neste grupo.");
    } else {
      enviar("⚠️ O modo admin já estava ativado neste grupo.");
    }
  } 
  
  else if (estado === "0") {
    if (modoAdmin.includes(from)) {
      modoAdmin = modoAdmin.filter(g => g !== from);
      fs.writeFileSync(JsonModoAdmin, JSON.stringify(modoAdmin, null, 2));
      enviar("🟢 *Modo admin desativado* — Todos os membros podem usar o bot novamente.");
    } else {
      enviar("⚠️ O modo admin já estava desativado neste grupo.");
    }
  } 
  
  else {
    enviar("❌ Você só pode usar *1* para ativar ou *0* para desativar.");
  }
}
break;



case 'hidetag' :
case 'notify' :
  if(!isReg) return enviar(respuesta.registro)
  if(!isGroupAdmins) return enviar(respuesta.admin)
if(!q) return enviar('Digite um texto exemplo !notify olá irmãos 🔥')
if(!isGroup) return enviartexto ('Sério , hidetag em um chat')
if(!isGroupAdmins) return enviartexto ("O bot precisa ser administrador")
			var group = await sock.groupMetadata(from)
			var member = group['participants']
			var mem = []
			member.map(async adm => {
			mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
			})
			var optionshidetag = {
			text : q,
			contextInfo: { mentionedJid: mem },
			quoted: m
			}
			sock.sendMessage(from, optionshidetag)
			break


case 'kick' :
case 'ban' :
case 'largate' :{
if (!isGroup) return  
if(!isGroupAdmins) return enviar(respuesta.admin)
if(!isBotGroupAdmins) return enviar (respuesta.botadmin)
let mentioned = obtenerMencionado(info);

    if (!mentioned) return enviar("⚠️ Você deve mencionar alguém para usar este comando.");

if(mentioned === BotNumber || mentioned === owner) return enviar('🤨')
await sock.groupParticipantsUpdate(from, [mentioned] , 'remove')
enviar('Ação realizada com sucesso')
}
break 
     



// ⚙️ Comando para ativar/desativar antilink
case 'antilink':
  if (!isGroupAdmins) return enviar(respuesta.admin)
  if (!isBotGroupAdmins) return enviar(respuesta.botadmin)
  if (args.length < 1) return enviar(`𝐃𝐈𝐆𝐈𝐓𝐄 𝟏 𝐏𝐀𝐑𝐀 𝐀𝐓𝐈𝐕𝐀𝐑 � 𝟎 𝐏𝐀𝐑𝐀 𝐃𝐄𝐒𝐀𝐓𝐈𝐕𝐀𝐑`)

  if (Number(args[0]) === 1) {
    if (isAntiLink) return enviar('✅ O antilink já está ativado neste grupo')
    antilink.push(from)
    fs.writeFileSync('./settings/Grupo/Json/antilink.json', JSON.stringify(antilink, null, 2))
    enviar('✅ ● ️𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊 𝐀𝐓𝐈𝐕𝐀𝐃𝐎 ● ️')
  } 
  else if (Number(args[0]) === 0) {
    if (!isAntiLink) return enviar('❌ O antilink já está desativado neste grupo')
    const index = antilink.indexOf(from)
    antilink.splice(index, 1)
    fs.writeFileSync('./settings/Grupo/Json/antilink.json', JSON.stringify(antilink, null, 2))
    enviar('❌ ● ️𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊 𝐃𝐄𝐒𝐀𝐓𝐈𝐕𝐀𝐃𝐎 ● ️')
  } 
  else {
    enviar(`𝐃𝐈𝐆𝐈𝐓𝐄 𝟏 𝐏𝐀𝐑𝐀 𝐀𝐓𝐈𝐕𝐀𝐑 � 𝟎 𝐏𝐀𝐑𝐀 𝐃𝐄𝐒𝐀𝐓𝐈𝐕𝐀𝐑`)
  }
break;


case 'grupo': {

if (!isGroup) return enviar(respuesta.grupos)
if (!isGroupAdmins) return enviar(respuesta.admin)
if (!isBotGroupAdmins) return enviar(respuesta.botadmin)

if (!args[0]) {
return enviar(`⚙️ *Configuração do grupo*

Use:
• */grupo abrir* → Abrir o grupo
• */grupo cerrar* → Fechar o grupo`)
}

if (args[0] === 'abrir') {

await sock.groupSettingUpdate(from, 'not_announcement')

enviar(`🟢 *GRUPO ABERTO*

Agora todos os membros podem enviar mensagens.`)

} else if (args[0] === 'cerrar') {

await sock.groupSettingUpdate(from, 'announcement')

enviar(`🔒 *GRUPO FECHADO*

Apenas administradores podem enviar mensagens.`)

} else {

enviar(`⚠️ Opção inválida

Use:
• */grupo abrir*
• */grupo cerrar*`)
}

}
break


//STICKERS 
case 's':
case 'sticker':
  if(!isReg) return enviar(respuesta.registro)
var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var boij2 = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
var boij = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage
if(boij2){
await sock.sendMessage(from, { react: { text: "⏳", key: info.key } });
var pack = `
👑 Dueño 👑
 ✅Bender
⭐𝐂𝐫𝐞𝐚𝐝𝐨 𝐩𝐨𝐫 :
 ${pushname} `
var author2 = ` 
🤖 𝐁𝐨𝐭 🤖
 ⃟Bender Bot
💐 𝐆𝐫𝐮𝐩𝐨💐
${groupName} `
owgi = await getFileBuffer(boij2, 'image')
let encmediaa = await sendImageAsSticker2(sock, from, owgi, info, { packname:pack, author:author2})
await DLT_FL(encmediaa)
await addXp(sender,1)
// await delkoin(sender,1)
} else if(boij && boij.seconds < 11){
await sock.sendMessage(from, { react: { text: "⏳", key: info.key } });
var pack = `
👑 Dueño 👑
 ✅Bender
⭐𝐂𝐫𝐞𝐚𝐝𝐨 𝐩𝐨𝐫 :
 ${pushname} `
var author2 = ` 
🤖 𝐁𝐨𝐭 🤖
 ⃟Bender Bot
💐 𝐆𝐫𝐮𝐩𝐨💐
${groupName} `
owgi = await getFileBuffer(boij, 'video')
let encmedia = await sendVideoAsSticker2(sock, from, owgi, info, { packname:pack, author:author2})
await DLT_FL(encmedia)
await addXp(sender,1)
// await delkoin(sender,1)
} else {
return enviar(`Marque uma imagem ou \nUm vídeo máximo de 10 segundos ⏲️`)
}
break

case 'rename':
case 'renomear': {
  if(!isReg) return enviar(respuesta.registro)
  if(!isQuotedSticker) return enviar('[❗] Marque um sticker para renomear.')
  if(!q) return enviar('[❗] Use: !rename nome/autor\nExemplo: !rename Meu Pack/Meu Nome')
  
  try {
    const [packName, authorName] = q.split('/');
    if(!packName || !authorName) return enviar('[❗] Use: !rename nome/autor\nExemplo: !rename Meu Pack/Meu Nome')
    
    enviar('`Renomeando sticker...`')
    buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
    let encmedia = await sendImageAsSticker2(sock, from, buff, info, { packname: packName, author: authorName })
    await DLT_FL(encmedia)
    await addXp(sender, 2)
    //enviar('✅ Sticker renomeado com sucesso!')
  } catch {
    enviar('❌ Ocorreu um erro ao renomear o sticker.')
  }
}
break

///Você precisa de chave de API//


                
                case 'emojimix': {
    if (!isReg) return enviar(respuesta.registro);
    
    if (!q) return enviar(`
🔁𝑪𝒐𝒎𝒃𝒊𝒏� 𝒆𝒎𝒐𝒋𝒊𝒔 � 𝒅𝒆𝒔𝒄𝒖𝒃𝒓� 𝒏�𝒗𝒂𝒔 𝒄𝒓𝒊�çõ𝒆𝒔‼️
☑️𝑬𝒔𝒄𝒓��� � 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒂𝒔𝒊𝒎:
👉 *!emojimix 😊+😂*`);

    enviar('`🔁 𝑴𝒆𝒛𝒄𝒍𝒂𝒏𝒅𝒐...`');

    try {
        let [emoji1, emoji2] = q.split`+`;
        var em = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&
            contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);
        
        for (let res of em.results) {
            let templateMessage = {
                image: { url: `${res.url}`, quoted: info }
            };
            sock.sendMessage(from, templateMessage, { quoted: info });

            // Reduzir 1 coin e adicionar 1 experiência
            // await delkoin(sender, 1);
            await addXp(sender, 1);
        }
        
    } catch (err) {
        enviar('❌ Ocorreu um erro, tente com outros emojis.');
        console.log(chalk.yellowBright(err));
    }
}
break;


///////////////////FERRAMENTAS///////////

case 'amp3':
case 'tomp3':
  if(!isReg) return enviar(respuesta.registro)
if(!isQuotedVideo) return enviar (`[❗] ${sender.split('@')[0]}, Marque um vídeo `)
enviar('`Criando....`')
tomp = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage , 'video')
	sock.sendMessage(from,{audio :  tomp, mimetype: 'audio/mpeg'},{ quoted: info })		
		await addXp(sender,6)
		// await delkoin(sender,3)
				break 
				
		
  case 'toimg':
  if(!isReg) return enviar(respuesta.registro)
if(!isQuotedSticker) return enviar('[❗]• 𝗠𝗔𝗥𝗤𝗨𝗘 𝗨� 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 •')
try {
enviar('`Criando....`')
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
sock.sendMessage(from, {image: buff , caption : ` [❗] *${pushname}*, Aqui está seu pedido `},{quoted : info }).catch(e => {
console.log(chalk.redBright(e));
enviar('Não foi possível converter para imagem, verifique se é um sticker e não um gif ❌')
})
await addXp(sender,3)
// await delkoin(sender,2)
} catch {
enviar('ocorreu um erro ')
}
break


case 'calcular':
  case 'cal' :
          if (!isReg) return enviar(respuesta.registro)
          if(args.length == 0) return enviar( ` ┣「 𝗢𝗣𝗘𝗥𝗔ÇÕ𝗦 」┫
╭──────────────────
│➫┇+ 𝐒�𝐦𝐚
│➫┇- ���𝐭��çã𝐨
│➫┇/ 𝐃𝐢𝐯𝐢𝐬ã
│➫┇* 𝐌𝐮𝐥𝐭𝐢𝐩𝐥𝐢𝐜𝐚çã
│➫ 𝔼�𝕖𝕞𝕡𝕝𝕠 : 𝐂𝐚𝐥 𝟒+𝟒
╰──────────────────`)
            const resultzx = eval(q)
            await sleep(1000)
            enviar(`\n╭──────────────────\n││「 𝗥𝗘𝗦𝗨𝗟𝗧𝗔𝗗𝗢𝗦 」│\n│➫┇${q} = *${resultzx}*\n╰──────────────────`)
            break
            



//você precisa de api
//nesecita API 

//Níveis econômicos e experiência 

case 'perfil' : case 'cartera' :
case 'nivel' : case 'minivel' : {

if(!isReg) return enviar(respuesta.registro)

var saldo = MoneyOfSender(sender)
const Xp = xpOfsender(sender)
const Mnv = levelOfsender(sender)
const Rxxp = Rxp(sender)
const myrep2 = repUser(sender)
const Xpnull = Rxxp - 1000

if(Xp === null) return addXp(sender,Xpnull)

let foto

try {
foto = await sock.profilePictureUrl(sender, 'image')
} catch {
foto = 'https://i.postimg.cc/85NsPp8j/20260131-152616.jpg'
}

const Mp = `
╔══✦❖【 ��� 𝑷𝒆𝒓𝒇𝒊𝒍 】❖✦══╗
🏷️  𝐍𝐨𝐦      »  @${sender.split('@')[0]}
⚔️  𝐑𝐚𝐧𝐠𝐨       »  ${Mlevel}
👑  𝐑𝐞𝐩𝐮𝐭𝐚çã  »  ${myrep2}
💰  𝐃𝐢𝐧����𝐨     »  ₹${saldo} 𝐑𝐮𝐩𝐢𝐚𝐬
📈  𝐍í𝐞𝐥       »  ${Mnv} ➜ ${Mnv + 1}
📚  𝐄𝐗𝐏         »  ${Xp} / ${Rxxp + 1000}
╚══✦❖【 𝐏𝐫𝐨𝐠𝐫𝐞𝐬�� 】❖✦══╝
▰▰ ${Mrxp} ▰▰
`

await sock.sendMessage(from,{
image: { url: foto },
caption: Mp,
mentions: [sender]
},{ quoted: info })

}
break
//comando de caça-níqueis 
case 'tragamonedas':
case 'tragamoneda':
if (!isReg) return enviar("Você deve se registrar para jogar.");
const apuestas = 1; // Custo por jogar

const ahora = Date.now();
const tiempoGuardado = timeClaimTraga(sender) || 0;
const tiempoRestante = tiempoGuardado - ahora;

if (tiempoRestante > 0) {
    return await enviar(`[❗] 𝙴𝚂𝙿𝙴𝚁𝙴 ${runtime(tiempoRestante / 1000)} para jogar novamente.`);
} else {
    const espera = 8 * 60 * 60 * 1000; // 8 horas
    await addClaimTraga(sender, espera);
}


// Subtrair uma coin para jogar
// await delkoin(sender, apuestas);

// Lista de símbolos para caça-níqueis
const simbolos = ['🥕', '🐰', '🐸', '🦊', '🐱', '🍋', '🔔', '🍒', '🍉', '🍌'];

// Gerar linhas aleatórias
const obtenerFila = () => [
    simbolos[Math.floor(Math.random() * simbolos.length)],
    simbolos[Math.floor(Math.random() * simbolos.length)],
    simbolos[Math.floor(Math.random() * simbolos.length)]
];

// Gerar as três linhas
const filaArriba = obtenerFila();
const filaAbajo = obtenerFila();

let filaCentro;
const probabilidad = Math.random(); // Número entre 0 e 1

// 60% de probabilidade de que os três símbolos do centro sejam iguais
if (probabilidad < 0.6) {
    const simboloGanador = simbolos[Math.floor(Math.random() * simbolos.length)];
    filaCentro = [simboloGanador, simboloGanador, simboloGanador]; // Fazer todas 3 iguais
} else {
    filaCentro = obtenerFila(); // Caso contrário, gerar aleatoriamente
}

// Verificar se o usuário ganhou
const esGanador = filaCentro[0] === filaCentro[1] && filaCentro[1] === filaCentro[2];

let resultadoMensaje = "😢 Você perdeu... Tente novamente dentro de 8 horas.";
let premioTexto = "";

// Se ganhar, recebe aleatoriamente Coins ou EXP entre 5 e 10
if (esGanador) {
    const premioCantidad = Math.floor(Math.random() * 6) + 5; // Número aleatório entre 5 e 10
    const tipoPremio = Math.random() < 0.5 ? 'coins' : 'exp'; // 50% de probabilidade para cada tipo

    if (tipoPremio === 'coins') {
        // await addkoin(sender, premioCantidad);
        premioTexto = `🎉 Você recebeu ${premioCantidad} Coins 🪙.`;
    } else {
        await addXp(sender, premioCantidad);
        premioTexto = `📚 Você recebeu ${premioCantidad} de EXP.`;
    }

    resultadoMensaje = "🎉 Você ganhou! 🎉";
}

// Construction of response message
const mensajeCasino = `
         *༻  𝙏𝙍𝘼𝙂𝘼𝙈𝙊𝙉𝙀𝘿𝘼𝙎 ༺*
            ┏━━━━┛🎰┗━━━━┓
             ||   【${filaArriba[0]}】【${filaArriba[1]}】【${filaArriba[2]}】   ||
           ◢◞───────────◟◣
        █ ||   【${filaCentro[0]}】【${filaCentro[1]}】【${filaCentro[2]}】   || █
           ◥◝───────────◜◤
             ||   【${filaAbajo[0]}】【${filaAbajo[1]}】【${filaAbajo[2]}】   ||
            ┗━━━━┓🎰┏━━━━┛
   🪙◆━━━━━━━▣✦▣━━━━━━━━◆🪙
Has gastado ${apuestas} Coin 🪙.
${resultadoMensaje}
${premioTexto}
`;

// Send message after 3 seconds
setTimeout(() => {
    enviar(mensajeCasino);
}, 3000);

break;



case"dayli": case "daily":
if(!isGroup) return
if(!isReg) return 
const dayli = checkDayli(sender)
if(dayli) {
const ahora = Date.now()
const time = timeDayli(sender)
const result = ahora - time
const resultado = (0 - result) / 1000;
return sock.sendMessage(from,{text : `Espere ${runtime(resultado)} para sua nova recompensa`},{quoted : info})
} else {
const time = 24* 60* 60* 1000
await addDayli(sender,time)
const montoExperiencia = 5
const monto = 1
enviar(`
⏳🪙 𝐑𝐄𝐂𝐎𝐌𝐏𝐄𝐍𝐒𝐀 𝐃𝐈Á𝐑𝐈𝐀 🪙⏳

𝑮𝒂𝒏��� ${monto} 𝑪𝒐𝒊𝒏𝒔 � ${montoExperiencia} 𝒅𝒆 𝑬𝒙𝒑𝒆𝒓𝒊ê𝒏𝒄𝒊𝒂.
`)
// await addkoin(sender,monto)
await addXp(sender,montoExperiencia)
}
break

 

case 'reg': case 'registrarme': case 'registrame': case 'rg':
    if (isReg) return enviar(respuesta.yaregistro)
    const nombre = pushname
    await AddReg(sender, nombre)
    sock.sendMessage(from, {
        image: { url: JpgBot },
        caption: `★━━━━★━━━━★★━━━━★
         *༻  𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎  ༺*
🎉𝑅𝑒𝑔𝑖𝑠𝑡𝑟𝑜 𝑐𝑜𝑚𝑝𝑙𝑒𝑡𝑎𝑑𝑜 *${nombre}* 🥳
🪙𝑹𝒆𝒄�𝒃𝒊� *₹50 Rupias* 🪙 𝒄𝒐𝒎𝒐 𝑹𝒆𝒈𝒂𝒍𝒐 𝒅𝒆 𝑩𝒊𝒆𝒏-𝒗�𝒏𝒅𝒂.
◆━━━━━━━▣✦▣━━━━━━━━◆`
    }, { quoted: info })
    break


case 'levelup': {
const XpR = xpOfsender(sender)
const Rxxp = Rxp(sender)
if(XpR >= Rxxp + 1000) {
await addLevel(sender , 1)
sleep(100)
// await addkoin(sender,10)
sleep(100)
await addXp(sender,100)
sleep(100)
await addRxp(sender,1000)
const Mup = ` 
        ★━━━ 𝐒𝐔𝐁𝐈�� 𝐃𝐄 𝐍Í𝐕𝐄𝐋 ━━━★
✪ @${sender.split('@')[0]}
🎉 ¡𝑭𝒆𝒍𝒊𝒄𝒊𝒅𝒂𝒅𝒆𝒔 𝑯𝒂𝒛 𝒅𝒆𝒔𝒃𝒍𝒐𝒒𝒖𝒆𝒂𝒅𝒐 𝒖� 𝒏�𝒗𝒐 𝒓𝒂𝒏𝒈𝒐! 💪
`
sock.sendMessage(from,{text : Mup , mentions : [sender]},{quoted : info})
} else {
enviar(`
❌ 𝑬𝒙𝒑𝒆𝒓𝒊ê𝒏𝒄𝒊𝒂 𝒊𝒏𝒔𝒖𝒇𝒊𝒄𝒊ê𝒏𝒕𝒆. ${pushname} 𝒅𝒆�𝒆 𝒆𝒏𝒕𝒓𝒂𝒓 𝒎𝒂𝒊𝒔 𝒔𝒆𝒈𝒖𝒊𝒅𝒐. 
`)
}
}
break




case 'minar' : {
if(!isReg) return enviar(respuesta.registro)
if(!isGroup) return enviar(respuesta.grupos)
const isMin = checkMinar(sender)
if(isMin) {
const ahora = Date.now()
const time = timeMinar(sender)
const result = ahora - time
const resultado = (0 - result) / 1000;
return enviar(`𝑪𝒉𝒂𝒎𝒃𝒆𝒂𝒏𝒅𝒐... ${runtime(resultado)} `)
} else {
const time = 24* 60* 60* 1000
await addMinar(sender,time)
const numbeR = [5, 6, 7, 8, 9, 10];
const randomIndex = Math.floor(Math.random() * numbeR.length);
const monto = numbeR[randomIndex];
enviar(`
               ★━━━ 𝐌𝐈𝐍𝐀𝐍𝐃𝐎... ━━━★
💰 Você descobriu ouro puro e obteve *₹${monto} Rupias* 
💬 ❝ 🌟 𝑮𝒓𝒂ç𝒂𝒔 𝒂� 𝑮𝒓𝒆𝒎𝒊𝒐 𝒅𝒆 𝑴𝒊𝒏𝒆𝒓𝒐𝒔 ⛏ 𝒔𝒆 𝒈𝒂𝒓𝒂𝒏𝒕𝒊𝒛𝒂 𝑺𝒖𝒆𝒍𝒅𝒐 𝑴𝒊𝒏í𝒎𝒐 𝒅𝒆 *₹5 Rupias* 🪙.❞

⏳ 𝑽�𝒍�𝒆 𝒆� 24 𝒉𝒐𝒓𝒂𝒔.
`)
// await addkoin(sender,monto)
}
}
break 


    case "ruleta": {
if (!q) return enviar(`Indique um valor para apostar, exemplo .ruleta 4`);
if (!isReg) return enviar(respuesta.registro)
const montto = q
const monto = (montto * 1) / 1
if (isNaN(monto)) return enviar(`Indique um valor válido em coins`);
if (monto > MoneyOfSender(sender)) return enviar(`Você não tem dinheiro suficiente`);
if (monto > 5) return enviar('A aposta não deve ser maior que 5 Rupias');
const isMinxxx = checkRuleta(sender)
if(isMinxxx) {
const ahora = Date.now()
const time = timeRuleta(sender)
const result = ahora - time
const resultado = (0 - result) / 1000;
return enviar(`Espere... ${runtime(resultado)} `)
} else {
const time = 24* 60* 60* 1000
await addRuleta(sender,time)
const ppt = ["muere", "vive"]; // Possibilities
const pptb = ppt[Math.floor(Math.random() * ppt.length)];  // Elección aleatoria del sistema
let vit;

// Lethal Duel Mode
if (pptb === "muere") {
    vit = `💭「𝙍𝙖𝙯𝙚𝙧, 𝙚𝙡 𝙎𝙞𝙣 𝙈𝙞𝙚𝙙𝙤 🐺 𝙖𝙥𝙪𝙣𝙩𝙖 𝙖 𝙡𝙖 𝙘𝙖𝙗𝙚𝙯𝙖 𝙙𝙚 ${pushname} 😨🔫」
💭「𝙍𝙖𝙯𝙚𝙧 🐺 𝙖𝙥𝙧𝙚𝙩𝙖 𝙚𝙡 𝙜𝙖𝙩𝙞𝙡𝙡𝙤... 💥 𝘽𝙊𝙊𝙈!」
💭「${pushname} 𝙝𝙖 𝙘𝙖í𝙙𝙤 � 𝙥𝙚𝙧𝙙�𝙪 ${monto} Rupias 🪙」`;
    // await delkoin(sender, monto);
    // The player loses
} else if (pptb === "vive") {
    vit = `💭「𝙍𝙖𝙯𝙚𝙧, 𝙚𝙡 𝙎𝙞𝙣 𝙈𝙞𝙚𝙙𝙤 🐺 𝙖𝙥𝙪𝙣𝙩𝙖 𝙖 𝙡𝙖 𝙘𝙖𝙗𝙚𝙯𝙖 𝙙𝙚 ${pushname} 😨🔫」
💭「𝙍𝙖𝙯𝙚𝙧 🐺 𝙖𝙥𝙧𝙚𝙩𝙖 𝙚𝙡 𝙜𝙖𝙩𝙞𝙡𝙡𝙤... 💥 𝘽𝙊𝙊𝙈!」
💭「𝙀𝙨 𝙪�𝙖 𝙗𝙧𝙤𝙢𝙖, ${pushname} 𝙨𝙤𝙗𝙧𝙚𝙫𝙞𝙫𝙚 � 𝙜𝙖𝙣𝙝𝙖 ${monto} Rupias 🪙」`;
    // await addkoin(sender, monto);
    // The player wins
}

const datatt = `
╭━━━╾⭑✦.   ✦⭑╼━━━╮
         ⌬ 𝙍𝙐𝙇𝙀𝙏𝘼 𝙍𝙐𝙎𝘼 ⌬
${vit}
⌛ 𝙑𝙪𝙚𝙡𝙫𝙚 𝙚𝙣 24 𝙝𝙤𝙧𝙖𝙨...
╚━━━╾⭑✦ ❖ ✦⭑╼━━━╯
`;


enviar(datatt);
}
}
        break




case "pescar": {
if (q) return enviar(`não coloque nenhuma palavra, apenas /pescar`);
if (!isReg) return enviar(respuesta.registro)
const isMinxxx = checkPescar(sender)
if(isMinxxx) {
const ahora = Date.now()
const time = timePescar(sender)
const result = ahora - time
const resultado = (0 - result) / 1000;
return enviar(`Espere... ${runtime(resultado)} `)
} else {
const time = 8 * 60 * 60 * 1000;
await addPescar(sender,time)
const ppt = ["delfin", "pulpo","pez","pez2","pez3","zapato"]; // Possibilities
const pptb = ppt[Math.floor(Math.random() * ppt.length)];  // Elección aleatoria del sistema
let vit;

// Marine Hunter
if (pptb === "delfin") {
    vit = `💭「𝙃𝙖𝙨 𝙖𝙩𝙧𝙖𝙥𝙖𝙙𝙤 𝙪𝙣 🦈 � 𝙖𝙡 𝙫𝙚𝙣𝙙𝙚𝙧𝙡𝙤 𝙖 𝙆𝙖𝙞 🐯 𝙜𝙖𝙣�� 20 𝙙𝙚 𝙀𝙓𝙋 📚」`;
    await addXp(sender, 20);
    // The player wins
} else if (pptb === "pulpo") {
    vit = `💭「𝙃𝙖𝙨 𝙖𝙩𝙧𝙖𝙥𝙖𝙙𝙤 𝙪𝙣 🐙 � 𝙖𝙡 𝙫𝙚𝙣𝙙𝙚𝙧𝙡𝙤 𝙖 𝙆𝙖𝙞 🐯, 𝙧𝙚𝙘�𝙗𝙚 8 𝙍𝙪𝙥𝙞𝙖𝙨 💎」`;
    // await addkoin(sender, 8);
} else if (pptb === "pez") {
    vit = `💭「𝙃𝙖𝙨 𝙖𝙩𝙧𝙖𝙥𝙖𝙙𝙤 𝙪𝙣 🐠 � 𝙖𝙡 𝙫𝙚𝙣𝙙𝙚𝙧𝙡𝙤 𝙖 𝙆𝙖𝙞 🐯 𝙧𝙚𝙘�𝙗𝙚 4 𝙍𝙪𝙥𝙞𝙖𝙨 💎 � 5 𝙙𝙚 𝙀𝙓𝙋 📚」`;
    // await addkoin(sender, 4);
    await addXp(sender, 5);
} else if (pptb === "pez2") {
    vit = `💭「𝙃𝙖𝙨 𝙖𝙩𝙧𝙖𝙥𝙖𝙙𝙤 𝙪𝙣 🐟 � 𝙖𝙡 𝙫𝙚𝙣𝙙𝙚𝙧𝙡𝙤 𝙖 𝙆𝙖𝙞 🐯 𝙧𝙚𝙘�𝙗𝙚 3 𝙍𝙪𝙥𝙞𝙖𝙨 💎 � 3 𝙙𝙚 𝙀𝙓𝙋 📚」`;
    await addkoin(sender, 3);
    await addXp(sender, 3);
} else if (pptb === "pez3") {
    vit = `💭「𝙃𝙖𝙨 𝙖𝙩𝙧𝙖𝙥𝙖𝙙𝙤 𝙪𝙣 🐡 � 𝙖𝙡 𝙫𝙚𝙣𝙙𝙚𝙧𝙡𝙤 𝙖 𝙆𝙖𝙞 🐯 𝙧𝙚𝙘�𝙗𝙚 1 𝙍𝙪𝙥𝙞𝙖 💎 � 2 𝙙𝙚 𝙀𝙓𝙋 📚」`;
    await addkoin(sender, 1);
    await addXp(sender, 2);
} else if (pptb === "zapato") {
    vit = `💭「𝙃𝙖𝙨 𝙖𝙩𝙧𝙖𝙥𝙖𝙙𝙤 𝙪𝙣 🥾 � 𝙖𝙡 𝙩𝙧𝙖𝙩𝙖𝙧 𝙙𝙚 𝙫𝙚𝙣𝙙𝙚𝙧𝙡𝙤 𝙖 𝙆𝙖𝙞 🐯, 𝙚́𝙡 𝙨𝙚 𝙧𝙞𝙚 🤣 𝙙𝙚 𝙩𝙞 🥲」`;
}

const datatt = `
╔════ ⭑✦.   ✦⭑ ════╗
         ❖ 𝙋𝙀𝙎𝘾𝘼 𝙀𝙉 𝙀𝙇 𝙈𝘼𝙍 ❖
${vit}
⌛ 𝙑𝙪𝙚𝙡𝙫𝙚 𝙚𝙣 8 𝙝𝙤𝙧𝙖𝙨...
╚════ ⭑✦ ❖ ✦⭑ ════╝
`;


enviar(datatt);
}
}
        break







case 'listreg' : {
R_ = []
teks = '*REGISTRADOS* 😼\n'
for(let R of registro){
teks += `• @${R.id.split('@')[0]}\n`
R_.push(R.id)
}
teks += '• ' + registro.length
mentions(teks,R_,true)
}
break 




case 'regalar':
case 'tradecoin':
case 'tradecoins':
case 'enviarcoins':
case 'enviar': {
  if (!isGroup) return enviar("⚠️ Este comando só funciona em grupos.");

  (async () => {
    try {
      const mencionado = obtenerMencionado(info); // recipient
      const emisor = sender; // who sends the coins
      const monto = Number(args[1]);

      if (!mencionado) return enviar("⚠️ Você deve mencionar alguém para enviar moedas.\nEx: .regalar @usuario 100");
      if (mencionado === emisor) return enviar("⚠️ Você não pode enviar moedas para si mesmo.");
      if (isNaN(monto) || monto <= 0) return enviar("⚠️ Insira uma quantidade válida de moedas.\nEx: .regalar @usuario 100");

      const saldoEmisor = await MoneyOfM(emisor);
      if (saldoEmisor < monto) return enviar("❌ Você não tem moedas suficientes para fazer esta transferência.");

      // Perform transfer
      // await delkoin(emisor, monto);
      // await addkoin(mencionado, monto);
      await sleep(100);

      const nuevoSaldo = await MoneyOfM(emisor);
      enviar(`✅ Transferência concluída.\nVocê enviou *₹${monto} Rupias.*`, {
        mentions: [emisor, mencionado]
      });
    } catch (e) {
      enviar('❌ Error: ' + e.message);
    }
  })();
}
break;









case 'rep' : case 'mirep' : case 'mireputacion':
if(!isReg) return enviar(respuesta.registro)
const myrep = repUser(sender)
const mitulamide30milimetros = `
╭━━━╾⭑✦REPUTAÇÃO✦⭑╼━━━╮
𝑳𝒂 𝑹𝒆𝒑𝒖𝒕𝒂çã 𝒅𝒆 ${pushname} 𝒆́ 𝒅𝒆 ${myrep}.
`
if (myrep < 20) {
    await sock.sendMessage(from, {
        image: { url: "https://i.postimg.cc/NfJfvsBW/Untitled-05-12-2024-09-16-50-1.png" },
        caption: mitulamide30milimetros
    }, { quoted: info });
} else if (myrep >= 21 && myrep <= 40) {
    await sock.sendMessage(from, {
        image: { url: "https://i.postimg.cc/PxjdQNQ8/Untitled-05-12-2024-09-16-50-2.png" },
        caption: mitulamide30milimetros
    }, { quoted: info });
} else if (myrep >= 41 && myrep <= 60) {
    await sock.sendMessage(from, {
        image: { url: "https://i.postimg.cc/HL5pMbXg/Untitled-05-12-2024-09-16-50-3.png" },
        caption: mitulamide30milimetros
    }, { quoted: info });
} else if (myrep >= 61 && myrep <= 80) {
    await sock.sendMessage(from, {
        image: { url: "https://i.postimg.cc/brWX3NWB/IMG-20241223-WA0014.jpg" },
        caption: mitulamide30milimetros
    }, { quoted: info });
} else {
    await sock.sendMessage(from, {
        image: { url: "https://i.postimg.cc/Cx9hdcZ7/Untitled-05-12-2024-09-16-50-5.png" },
        caption: mitulamide30milimetros
    }, { quoted: info });
}

break 

case 'rank' : case 'rankrep' : 
if(!isGroup) return 
if(!isGroupAdmins) return enviar(respuesta.admin)
let teks2 = `
▭▬ ۞ ▬▛ ༼⁠ᘛ 𝑳𝒖𝒏𝒂-𝑩𝒐𝒕 ᘚ༽ ▜▬ ۞ ▬▭
*༻❦ 𝐑𝐀𝐍𝐊𝐈𝐍𝐆 𝐃𝐄 𝐑𝐄𝐏𝐔𝐓𝐀𝐂𝐈𝐎𝐍 ❦༺\n`;
registro.sort((a, b) => b.rep - a.rep) // Sort from highest to lowest
       .slice(0, 10) // Take only the first 10
       .forEach((usuario, indice) => {
           teks2 += `• 🚩Numero ${indice + 1}: *${usuario.nombre}* | *${usuario.rep}* de Reputação\n`;
       });
enviar(teks2)
break 

case 'rankcoins': {
  if (!isGroup) return;
  if(!isGroupAdmins) return enviar(respuesta.admin)
  const pathi = './settings/Grupo/Json/registros.json';

  // Read updated data at the moment
  const registro = JSON.parse(fs.readFileSync(pathi, 'utf8'));

  let rankingMensaje = `*🏆 RANKING DE MILIONÁRIOS*\n\nTOP.  USUÁRIO.   RUPIAS\n\n`;

  // Convert to array if registro is an object
  const rankingArray = Array.isArray(registro)
    ? registro
    : Object.entries(registro).map(([jid, data]) => ({
        nombre: data.nombre || jid.split('@')[0],
        dinero: data.dinero || 0,
      }));

  rankingArray
    .sort((a, b) => b.dinero - a.dinero)
    .slice(0, 10)
    .forEach((usuario, index) => {
      rankingMensaje += `• ${index + 1}. *${usuario.nombre}* ➫ _${usuario.dinero}_ Rupias\n`;
    });

  enviar(rankingMensaje);
}
break;




case 'ranknivel':{
if(!isGroup) return 
if(!isGroupAdmins) return enviar(respuesta.admin)
let teks = `
*RANKING DE NÍVEL* :
TOP.   USUÁRIO.   NÍVEL\n`
registro.sort((a,b) => b.nivel - a.nivel).forEach((usuario,index) => {
teks +=`• ${index + 1 }.     *${usuario.nombre}*  ➫  _*${usuario.nivel}*_\n`
});
enviar(teks)
}
break 

case "tienda":

if (!q) return enviar(`
✦━───༺༻───━✦
🎀❖ ��� ❖🎀

🐾💬 "𝓑�-𝓿�𝓷𝓸 𝓪 𝓵𝓪 ��� 🌙"
━━━━━━━━━━━━━━━
🍀 𝘼𝙧𝙩𝙞𝙘𝙪𝙡𝙤 1️⃣:
👉 *.tienda 1* 👈
🏷️ 50 𝓒𝓸𝓲𝓷𝓼 🪙 🔁 200 𝓔𝓧𝓟 📚

🌟 𝘼𝙧𝙩𝙞𝙘𝙪𝙡𝙤 2️⃣:
👉 *.tienda 2* 5 Os dragões 👈
🏷️ 50 𝓒𝓸𝓲𝓷𝓼 🪙 🔁 𝓒𝓪𝓶𝓫𝓲𝓪 𝓷𝓸𝓶𝓫𝓻𝓮 𝓭𝓮 𝓻𝓪𝓷𝓰𝓸𝓼
( .𝓽𝓲𝓮𝓷𝓭𝓪 2 + 𝓷í𝓮𝓵 𝓭𝓮 𝓻𝓪𝓷𝓰𝓸 + 𝓷𝓸𝓶𝓫𝓻𝓮𝓝𝓾𝓮𝓿� )

💎 𝘼𝙧𝙩𝙞𝙘𝙪𝙡𝙤 3️⃣:
👉 *.emojimix 😇+😈* 👈
🏷️ 1 𝓒𝓸𝓲𝓷 🪙 🔁 𝓒𝓸𝓶𝓫𝓲𝓷𝓪 🌀 𝓮𝓶𝓸𝓳𝓲𝓼.

🎨 𝘼𝙧𝙩𝙞𝙘𝙪𝙡𝙤 4️⃣:
👉 *.sticker* 👈
🏷️ 1 𝓒𝓸𝓲𝓷 🪙 🔁 𝓒𝓻𝓮𝓪 𝓼𝓽𝓲𝓬𝓴𝓮𝓻𝓼 𝓬𝓸� 𝓯𝓸𝓽𝓸𝓼 𝓸 𝓖𝓘𝓕�.

✦━───༺༻───━✦
`);


if (q.startsWith("1")) {
    // await delkoin(sender, 50)
    await addXp(sender, 200);

    return enviar(`🐱💬 Obrigado ${pushname}, você trocou 50 Rupias por 200 EXP.`);
}

if (q.startsWith("2")) {
    const args = q.split(" ");
    const nivel = parseInt(args[1]);
    const nuevoNombre = args.slice(2).join(" ");

    if (isNaN(nivel) || !nuevoNombre) {
        return enviar("❌ Use o comando corretamente: .tienda 2 <nível> <novo nome>\nExemplo: .tienda 2 8 Os Poderosos");
    }

    if (false) {
        return enviar("❌ Você não tem Coins suficientes para mudar o nome do rank. Você precisa de 50 Coins.");
    }

    const path = './settings/rangos.json';
    let rangosData;

    try {
        rangosData = JSON.parse(fs.readFileSync(path));
    } catch (e) {
        return enviar("⚠️ Erro ao ler os ranks. Certifique-se de que o arquivo exista e esteja bem formatado.");
    }

    rangosData[nivel] = nuevoNombre;

    try {
        fs.writeFileSync(path, JSON.stringify(rangosData, null, 2));
        // await delkoin(sender, 50)

        return enviar(`✅ ¡Perfeito, ${pushname}!\nVocê mudou o rank do nível *${nivel}* para:\n✨ *${nuevoNombre}* ✨\nE 50 Rupias foram descontadas 🪙`);
    } catch (e) {
        return enviar("⚠️ Não foi possível salvar o novo nome. Tente novamente.");
    }
}

break;

//DOWNLOADS


//você precisa de api

case 'playvideo':







//você precisa de api

  
//Couples


case 'alea': case 'casar' : case 'parejas':{
  if(!isReg) return enviar(respuesta.registro)
const men1 = groupMembers[Math.floor(Math.random() * groupMetadata.participants.length)]
const men3 = groupMembers[Math.floor(Math.random() * groupMetadata.participants.length)]
const men2 = men1.id
const men4 = men3.id
const rmen = `𝙰 @${men4.split('@')[0]} 𝙻𝙴 �𝚄𝚂𝚃𝙰 @${men2.split('@')[0]} � �����𝙸�� �����`
sock.sendMessage(from,{text : rmen , mentions :[men4,men2]},{quoted : info})
}
break 




// COMMANDS WITHOUT PREFIX
default:
// React with emoji for non-existent commands
if (body && body.startsWith(prefixo[0])) {
  try {
    await sock.sendMessage(from, { react: { text: "❓", key: info.key } });
  } catch (e) {
    console.log("Erro ao reagir:", e);
  }
}

/// 🚫 IMPROVED ANTILINK WITH DEBUGGING AND LID/JID COMPATIBILITY

const { jidNormalizedUser } = require("baileys")
const texto = (budy || "").toLowerCase()

if (isGroup && isAntiLink && !isGroupAdmins && !isOwner) {
  if (texto.includes(".com") || texto.includes("http://") || texto.includes("https://")) {
    console.log(chalk.yellowBright("⚠️ Link detectado:"), texto)

    const groupMetadata = await sock.groupMetadata(from)
    const botIsAdmin = groupMetadata.participants.find(p => p.id === owner && p.admin)
    if (!isBotGroupAdmins) return enviar("⚠️ Não sou administrador, não posso expulsar.")

    const member = groupMetadata.participants.find(p => p.id === sender)
    if (!member) return console.log(chalk.yellowBright("⚠️ O usuário já não está no grupo."))

    const Kick = jidNormalizedUser(sender)
    console.log(chalk.cyanBright("👞 Tentando expulsar:"), Kick)

    try {
      console.log(chalk.yellow("🗑️ Excluindo mensagem..."))
      await sock.sendMessage(from, { 
        delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } 
      })

      console.log(chalk.yellow("🚷 Expulsando usuário..."))
      const result = await sock.groupParticipantsUpdate(from, [Kick], "remove")
      console.log(chalk.greenBright("✅ Resultado expulsão:"), result)

      await enviar(`⚠️ Foi detectado um link proibido, o usuário @${sender.split("@")[0]} foi eliminado`, { mentions: [sender] })

    } catch (err) {
      console.log(chalk.redBright("❌ Erro ao executar antilink:"))
      console.log(chalk.yellow("Mensagem:"), err.message)
      console.log(chalk.red("Stack completo:"), err)
      await enviar(`⚠️ Não foi possível expulsar @${sender.split("@")[0]}\nMotivo: ${err.message}`, { mentions: [sender] })
    }
  }
}

//Funções Atalias - Auto detect figurinhas
if (isGroup && budy.toLowerCase().includes('figurinha') && !budy.toLowerCase().startsWith('!')) {
  (async () => {
    try {
      const totalFigurinhas = 5532;
      const num = Math.floor(Math.random() * totalFigurinhas);
      const repoIndex = Math.floor(num / 1000) + 1;
      const url = `https://raw.githubusercontent.com/AtaliasOliveira1/stickers-${repoIndex}/main/fig%20(${num}).webp`;

      await sock.sendMessage(from, { sticker: { url } });
    } catch (error) {
      console.log(error);
    }
  })();
}

   if (budy.startsWith('=>Duueño')) {
    if (!isOwner) return enviar(respuesta.miowner)
        function Return(sul) {
             sat = JSON.stringify(sul, null, 2)
                  bang = util.format(sat)
                       if (sat == undefined) {
                            bang = util.format(sul)
                            }
                            enviar(bang)
                    }
                    try {
                        enviar(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        enviar(String(e))
                    }
                }
                
                		      		      
              		      		      		      	
                		      		      		      		      		      		      		      		      
}
 
 } catch (e) {

 e = String(e)
if (!e.includes("this.isZero") && !e.includes("Could not find MIME for Buffer <null>") && !e.includes("Cannot read property 'conversation' of null") && !e.includes("Cannot read property 'contextInfo' of undefined") && !e.includes("Cannot set property 'mtype' of undefined") && !e.includes("jid is not defined")) {
console.log('Error : %s', color(e, 'red'))
}
 
 }   
 
 
 
 
 
 
        
    })


    
}
///////////MODIFIC INDEX 
startProo()
fs.watchFile('./index.js', (curr, prev) => {
if (curr.mtime.getTime() !== prev.mtime.getTime()) {
console.log(color('  [❗] O arquivo index.js foi modificado. Reiniciando!',"blue"));
process.exit()
}
})

