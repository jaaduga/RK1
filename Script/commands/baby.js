const axios = require("axios");
const simsim = "https://simsimi.cyberbot.top";

module.exports.config = {
 name: "baby",
 version: "1.0.3",
 hasPermssion: 0,
 credits: "ULLASH",
 description: "Cute AI Baby Chatbot | Talk, Teach & Chat with Emotion ☢️",
 commandCategory: "simsim",
 usages: "[message/query]",
 cooldowns: 0,
 prefix: false
};

module.exports.run = async function ({ api, event, args, Users }) {
 try {
 const uid = event.senderID;
 const senderName = await Users.getNameUser(uid);
 const rawQuery = args.join(" "); 
 const query = rawQuery.toLowerCase(); 

 if (!query) {
 const ran = ["Bolo baby", "hum"];
 const r = ran[Math.floor(Math.random() * ran.length)];
 return api.sendMessage(r, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 });
 }

 const command = args[0].toLowerCase();
 
 if (["remove", "rm"].includes(command)) {
 const parts = rawQuery.replace(/^(remove|rm)\s*/i, "").split(" - ");
 if (parts.length < 2)
 return api.sendMessage(" | Use: remove [Question] - [Reply]", event.threadID, event.messageID);
 const [ask, ans] = parts.map(p => p.trim());
 const res = await axios.get(`${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 }

 if (command === "list") {
 const res = await axios.get(`${simsim}/list`);
 if (res.data.code === 200) {
 return api.sendMessage(
 `♾ Total Questions Learned: ${res.data.totalQuestions}\n★ Total Replies Stored: ${res.data.totalReplies}\n☠︎︎ Developer: ${res.data.author}`,
 event.threadID, event.messageID
 );
 } else {
 return api.sendMessage(`Error: ${res.data.message || "Failed to fetch list"}`, event.threadID, event.messageID);
 }
 }

 if (command === "edit") {
 const parts = rawQuery.replace(/^edit\s*/i, "").split(" - ");
 if (parts.length < 3)
 return api.sendMessage(" | Use: edit [Question] - [OldReply] - [NewReply]", event.threadID, event.messageID);
 const [ask, oldReply, newReply] = parts.map(p => p.trim());
 const res = await axios.get(`${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldReply)}&new=${encodeURIComponent(newReply)}`);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 }

 if (command === "teach") {
 const parts = rawQuery.replace(/^teach\s*/i, "").split(" - ");
 if (parts.length < 2)
 return api.sendMessage(" | Use: teach [Question] - [Reply]", event.threadID, event.messageID);

 const [ask, ans] = parts.map(p => p.trim());
 
 const groupID = event.threadID; 
 let groupName = event.threadName ? event.threadName.trim() : ""; 
 
 if (!groupName && groupID != uid) {
 try {
 const threadInfo = await api.getThreadInfo(groupID);
 if (threadInfo && threadInfo.threadName) {
 groupName = threadInfo.threadName.trim();
 }
 } catch (error) {
 console.error(`Error fetching thread info for ID ${groupID}:`, error);
 }
 }

 let teachUrl = `${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderID=${uid}&senderName=${encodeURIComponent(senderName)}&groupID=${encodeURIComponent(groupID)}`;
 
 if (groupName) {
 teachUrl += `&groupName=${encodeURIComponent(groupName)}`;
 }

 const res = await axios.get(teachUrl);
 return api.sendMessage(`${res.data.message || "Reply added successfully!"}`, event.threadID, event.messageID);
 }

 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
 const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

 for (const reply of responses) {
 await new Promise((resolve) => {
 api.sendMessage(reply, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 resolve();
 }, event.messageID);
 });
 }
 } catch (err) {
 console.error(err);
 return api.sendMessage(`| Error in baby command: ${err.message}`, event.threadID, event.messageID);
 }
};

module.exports.handleReply = async function ({ api, event, Users, handleReply }) {
 try {
 const senderName = await Users.getNameUser(event.senderID);
 const replyText = event.body ? event.body.toLowerCase() : "";
 if (!replyText) return;

 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(replyText)}&senderName=${encodeURIComponent(senderName)}`);
 const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

 for (const reply of responses) {
 await new Promise((resolve) => {
 api.sendMessage(reply, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 resolve();
 }, event.messageID);
 }
 );
 }
 } catch (err) {
 console.error(err);
 return api.sendMessage(` | Error in handleReply: ${err.message}`, event.threadID, event.messageID);
 }
};

module.exports.handleEvent = async function ({ api, event, Users }) {
 try {
 const raw = event.body ? event.body.toLowerCase().trim() : "";
 if (!raw) return;
 const senderName = await Users.getNameUser(event.senderID);
 const senderID = event.senderID;

 if (
 raw === "baby" || raw === "bot" || raw === "bby" ||
 raw === "jan" || raw === "xan" || raw === "জান" || raw === "বট" || raw === "বেবি" 
 ) {
 const greetings = [
        "ज़्यादा बॉट-बॉट करेगा तो छोड़ दूँगा ग्रुप 😒",
  "नहीं सुनूँगा 😼 तूने मेरे बॉस साहू की लव स्टोरी सेट नहीं कराई 🥺",
  "मैं बेवकूफों से बात नहीं करता, ओके 😒",
  "इतना मत बुला यार, कहीं प्यार ही हो जाए 🙈",
  "बोलो बाबू 😏 क्या तुम मेरे बॉस साहू से प्यार करती हो? 💋",
  "बार-बार बुलाएगा तो गुस्सा आ जाएगा 😑",
  "हाँ बोलो 😒 तुम्हारे लिए क्या कर सकता हूँ 😐",
  "इतना क्यों बुला रहा है? गाली सुननी है क्या 🤬",
  "I love you जानू 🥰",
  "अरे बोलो मेरी जान 😚 कैसी हो?",
  "आज मुझे बॉट कहकर insult कर दिया 😿",
  "Hop बेडा 😾 बॉस बोल, बॉस 😼",
  "चुप रह, वरना दाँत तोड़ दूँगा 😤",
  "मुझे मत बुला, लड़की है तो मेरे बॉस साहू के इनबॉक्स में चली जा 😂 FB लिंक:https://www.facebook.com/61581725692182",
  "मुझे बॉट मत बोल, मेरे बॉस साहू को जानू बोल 😘",
  "बार-बार डिस्टर्ब मत कर, अपने जानू के साथ बिजी हूँ 😋",
  "ऐ बेवकूफ इतना क्यों बुला रहा है 🤬",
  "मुझे बुलाएगा तो किस कर दूँगा 😘",
  "मूड में नहीं हूँ अभी, डिस्टर्ब मत कर 😒",
  "हाँ जानू, इधर आ एक किस दे दूँ 😘",
  "दूर रह, तेरा कोई काम नहीं 😋🤣",
  "तेरी बात तेरे घर वाले नहीं सुनते, मैं क्यों सुनूँ 😂",
  "मुझे मत बुला, मैं बॉस साहू के साथ बिजी हूँ 😉",
  "क्या हुआ, गलती से बुला लिया क्या 🤣",
  "बोल क्या बोलेगा, सबके सामने बोल या अकेले 🤭",
  "लड़की है तो जा बॉस साहू के इनबॉक्स में 😍💕 FB:https://www.facebook.com/61581725692182",
  "कल मिलना ज़रूर 😈",
  "हाँ बोल सुन रहा हूँ 😏",
  "कितनी बार बुलाएगा, सुन तो रहा हूँ 😑",
  "हूँ बोल क्या चाहिए 😒",
  "बोलो तुम्हारे लिए क्या कर सकता हूँ 😎",
  "मैं तो अंधा हूँ कुछ देखता नहीं 🐸",
  "अरे बेवकूफ बॉट मत बोल, जानू बोल 😌",
  "बोलो जानू 🌚",
  "नज़र नहीं आता मैं बिजी हूँ 😒",
  "हाँ जान तुम्हारे वहीं उम्म्म्माह 😘",
  "आह सुनो जान, तुम्हारे गली-मोहल्ले में उम्माह 😇😘",
  "जंग करेगा क्या 😒",
  "अस्सलामु अलैकुम! बताओ, क्या मदद कर सकता हूँ 🥰",
  "अगर प्यार का ड्रामा करना है तो बॉस साहू के इनबॉक्स में जा 🤣 FB: https://www.facebook.com/61581725692182",
  "मुझे मत बुला, जाकर बॉस साहू को कोई गर्लफ्रेंड दिला दे 🙄",
  "इतना क्यों बुला रही है, प्यार करती है क्या 🤭🙈",
  "🌻🌺💚 अस्सलामु अलैकुम व रहमतुल्लाह 💚🌺🌻",
  "मैं अभी बॉस साहू के साथ बिजी हूँ, प्लीज़ डिस्टर्ब मत करो 😏",
  "मुझे मत बुला, मेरे बॉस साहू को कोई जीएफ दिला दे 😽",
  "उफ्फ समझ नहीं आता इतना क्यों बुला रहे हो 😤",
  "जान, अपनी फ्रेंड को मेरे बॉस साहू के हवाले कर दे 😝",
  "आज मूड ऑफ है, बुलाना मत 😪",
  "उम्म्म्माह जान, तुम्हारे लिए सीख रहा हूँ प्यार करना 😋😘",
  "मेरे बॉस साहू की तरफ़ से बहुत सारा प्यार 🥰 उनके लिए दुआ करना 💚",
  "अगर प्यार करना है तो जा बॉस साहू के इनबॉक्स में 🤣",
  "लड़की है तो जा बॉस साहू के इनबॉक्स में 🤭🤣 FB:https://www.facebook.com/61581725692182",
  "हद हो गई, ग्रुप में एक भी प्यारी बंडी नहीं 😩",
  "देश में सब चोरी हो रहा है बस मेरे बॉस साहू का दिल छोड़कर 😏",
  "तुम बहुत अच्छी लगती हो 😽 टाइम आने पर प्रपोज़ कर दूँगा 😼",
  "आज से किसी को भाव नहीं दूँगा 😏 फेयरनेस क्रीम खरीद ली है 😎"

      ];

      const randomReply = greetings[Math.floor(Math.random() * greetings.length)];
      const mention = {
        body: `@${senderName} ${randomReply}`,
        mentions: [{
          tag: `@${senderName}`,
          id: senderID
        }]
      };

 return api.sendMessage(mention, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 }, event.messageID);
 }

 if (
 raw.startsWith("baby ") || raw.startsWith("bot ") || raw.startsWith("bby ") ||
 raw.startsWith("jan ") || raw.startsWith("xan ") ||
 raw.startsWith("জান ") || raw.startsWith("বট ") || raw.startsWith("বেবি ")
 ) {
 const query = raw
 .replace(/^baby\s+|^bot\s+|^bby\s+|^jan\s+|^xan\s+|^জান\s+|^বট\s+|^বেবি\s+/i, "")
 .trim();
 if (!query) return;

 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
 const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

 for (const reply of responses) {
 await new Promise((resolve) => {
 api.sendMessage(reply, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 resolve();
 }, event.messageID);
 });
 }
 }
 } catch (err) {
 console.error(err);
 return api.sendMessage(`| Error in handleEvent: ${err.message}`, event.threadID, event.messageID);
 }
};
