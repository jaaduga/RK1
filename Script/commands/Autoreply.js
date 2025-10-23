const fs = global.nodemodule["fs-extra"];
const path = global.nodemodule["path"];

module.exports.config = {
  name: "autoreplybot",
  version: "6.0.2",
  hasPermssion: 0,
  credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
  description: "Auto-response bot with specified triggers",
  commandCategory: "No Prefix",
  usages: "[any trigger]",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body) return; 
  const name = await Users.getNameUser(senderID);
  const msg = body.toLowerCase().trim();

  const responses = {
    "miss you": "itna hi miss krti ho to apna nobar hi dedo😶👻😘",
    "kiss de": "aajana meri janeman ummaaa ummaaa💋",
    "👍": "ye thenga dikha kr kiya sabit kroge ki tum anpadh ho yhi na..!🐸🤣👍⛏️",
    "help": "abe pehle Prefix dalo",
    "hi": "hii Hello 👋🏻 or aage bolo..!😜🫵",
    "bc": "SAME TO YOU😊",
    "pro": "Khud k0o KYa LeGend SmJhTi Hai 😂",
    "good morning": "GOOD MORNING meri janu😚",
    "tor ball": "~ ye kiya hota? 🤖",
    "Faizan": "kiya kam ge mere boss ka ..!😘",
    "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ faizan Islam☜\nFacebook: https://www.\nWhatsApp: +sorry bos mna kiya",
    "admin": "He is Faizan khan ne muje bnaya he Bot Team Saport Admin faizan😘☺️",
    "baby": "ha baby😍.",
    "chup": "tu chup re",
    "assalamualaikum": "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ 💖",
    "fork": "id aa",
    "kiss me": "umaaa meri janu 🤭",
    "thanks": "muje thanks na bolo meri id 3logo ko sand kro.!🐸🥵",
    "i love you": "love u too 😘🫢😻",
    "by": "bay tata ..!🌚🌶️",
    "shibli": "mere boss ki jaan hai.?☺️",
    "bot ke baccha": "bacha na hu gabbar mera boss he faltu bole ga to pel dege.!!🌚⛏️",
    "tor nam ki": "MY NAME IS ─꯭─⃝‌‌BOT CHAT BOT 💖",
    "pic de": "ID ME AA😒",
    "cudi": "kehna kiya chate ho..!🥱🌝🌚",
    "bal": "ye ki he 🥰",
    "heda": "tera sir fod duga🥰",
    "chikni": "ha bolne chikni..!🌚🤣",
    "love you": "😘",
    "kiya kr rhe ho": "tumse bat",
    "fiza": "meri malkin bsy he btao muje me kehduga 😘😽🙈"
  };

  if (responses[msg]) {
    return api.sendMessage(responses[msg], threadID, messageID);
  }
};

module.exports.run = async function ({ api, event, args, Users }) {
  return this.handleEvent({ api, event, Users });
};
