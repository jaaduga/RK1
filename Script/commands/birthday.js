module.exports.config = {
 name: "birthday",
 version: "1.0.0",
 hasPermssion: 2,
 credits: "Shahadat SAHU",
 description: "মেনশন করলে শুভেচ্ছা জানাবে",
 commandCategory: "group",
 usages: "[@মেনশন]",
 cooldowns: 5,
 dependencies: {
 "fs-extra": "",
 "axios": ""
 }
};

module.exports.run = async function ({ api, event, args }) {
 try {
 if (Object.keys(event.mentions).length === 0) {
 return api.sendMessage("jisko birthday wish krna hai us ko mention karo na !😘", event.threadID);
 }

 const mention = Object.keys(event.mentions)[0];
 const name = event.mentions[mention].replace("@", "");
 const arraytag = [{ id: mention, tag: name }];

 const sendMessage = (msg) => {
 api.sendMessage({ body: msg, mentions: arraytag }, event.threadID);
 };

 
 sendMessage(`Boss Faizan khan ki taraf se tumhe janmadin ki hardik shubhkamnaye, @${name}!\n🎉HAPPY BIRTHDAY🎉`);
 const messages = [
 { delay: 3000, msg: `Ek aur saal ho gaya complete! Khush raho, healthy raho, yahi dua hai humari!\n🥰happpy birthday🥰 @${name}` },
 { delay: 6000, msg: `Tumhara har din khushi aur pyaar se bhara rahe!\n 🥰Happy Birthday dear😍 @${name}` },
 { delay: 10000, msg: `Thoda late sahi~\npar wish toh dil se hai 😋 Cake khana mat bhoolna!\n🌼happpy birthday🌼 @${name}` },
 { delay: 14000, msg: `Tumhari zindagi khushiyon se mehke har din tumhara special bane @${name}` },
 { delay: 18000, msg: `Dua karta hu tumhara har sapna poora ho 🤲 Enjoy your day।\n❦~happpy birthday~❦ @${name}` },
 { delay: 22000, msg: `Hamesha muskurate raho aur zindagi me aise hi chamakte raho।\nhapppy birthday@${name}` },
 { delay: 26000, msg: `Har pal tumhare liye।💖\nkhushiyon se bhara rahe 💕 aur tumhara face hamesha smile kare☺️ @${name}` },
 { delay: 30000, msg: `Tumhara safar khushiyon, @${name}!🎂\n pyaar aur success se bhara rahe 🎈 Happy Birthday।` },
 { delay: 34000, msg: `many many happy returns of the day 🥰😘\n Happy Birthday🎂 @${name}` },
 { delay: 38000, msg: `Dil se dua hai tumhe har khushi mile🥰 \n Happy Birthday🎂@${name}!` },
 { delay: 42000, msg: `Bas ek hi baat  hamesha aise hi cute aur happy raho🥰😘 @${name}` }
 ];

 messages.forEach(({delay, msg}) => {
 setTimeout(() => sendMessage(msg), delay);
 });

 } catch (error) {
 console.error(error);
 api.sendMessage("Kuch error aaya!\ndobara try karo", event.threadID);
 }
};
