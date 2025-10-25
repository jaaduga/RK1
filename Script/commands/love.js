module.exports.config = {
 name: "love",
 version: "7.3.1",
 hasPermssion: 0,
 credits: "—͟͟͞͞𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
 description: "Get Pair From Mention",
 commandCategory: "img",
 usages: "[@mention]",
 cooldowns: 5,
 dependencies: {
 "axios": "",
 "fs-extra": "",
 "path": "",
 "jimp": ""
 }
};

module.exports.onLoad = async() => {
 const { resolve } = global.nodemodule["path"];
 const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
 const { downloadFile } = global.utils;
 const dirMaterial = __dirname + '/cache/canvas/';
 const path = resolve(__dirname, 'cache/canvas', 'arr2.png');
 if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
 if (!existsSync(path)) await downloadFile("https://i.imgur.com/iaOiAXe.jpeg", path);
}

async function makeImage({ one, two }) {
 const fs = global.nodemodule["fs-extra"];
 const path = global.nodemodule["path"];
 const axios = global.nodemodule["axios"];
 const jimp = global.nodemodule["jimp"];
 const __root = path.resolve(__dirname, "cache", "canvas");

 let batgiam_img = await jimp.read(__root + "/arr2.png"); 
 let pathImg = __root + `/batman${one}_${two}.png`; 
 let avatarOne = __root + `/avt_${one}.png`; 
 let avatarTwo = __root + `/avt_${two}.png`; 
 
 let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data; 
 fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8')); 
 
 let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data; 
 fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8')); 
 
 let circleOne = await jimp.read(await circle(avatarOne)); 
 let circleTwo = await jimp.read(await circle(avatarTwo)); 
 batgiam_img.composite(circleOne.resize(200, 200), 70, 110).composite(circleTwo.resize(200, 200), 465, 110); 
 
 let raw = await batgiam_img.getBufferAsync("image/png"); 
 
 fs.writeFileSync(pathImg, raw); 
 fs.unlinkSync(avatarOne); 
 fs.unlinkSync(avatarTwo); 
 
 return pathImg;
}

async function circle(image) {
 const jimp = require("jimp");
 image = await jimp.read(image);
 image.circle();
 return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api, args }) {
 const fs = global.nodemodule["fs-extra"];
 const { threadID, messageID, senderID } = event;
 const mention = Object.keys(event.mentions);
 
 
 const captions = [
 "💖 ⎯͢⎯⃝🩷😽 meri najr me tub sab se khubsurat ladki ho ⎯͢⎯⃝🩷🐰🍒",
 "💖🥺❤️ shibli..! 😊\nKabhi rulati ho, kabhi hasati ho,\nAur kabhi aisa pyaar deti ho,\nJaise duniya ka sabse bada sukh tum mein hi mil jaye...! 💔❤️",
 "Bichhadne ke baad bhi sambandh bana rahe, usi ka naam hai maya... 💖💗🌺",
 "People's memories are more personal than people's...\nInsaan se zyada uski yaadein apni lagti hain,\nInsaan chhod jaata hai, par yaadein nahi-!!",
 "Ichchhaein hoti hain bin shabdon ke...!!\nSoch har din hoti hai..!\nKalpanaon ke rang gahre hain,\nPar haqiqat bahut kathin....!! 🌸💔",
 "Pyaar ka matlab sirf prem nahi,\nBalki wo shakhs — jiske muskurahat se subah hoti hai,\nAur aansuon se raat khatam hoti hai! 💖💌🩵",
 "Jo rishta aankhon se nahi dikhta,\nPar dil mein mehsoos hota hai — wahi sabse sachcha pyaar hai! 💖🌙🥺",
 "Tum shaayad door ho,\nPar meri har ek feeling ka pata abhi bhi tum hi ho! 💖💞🕊️",
 "Aankhon ki bhaasha samajhne wala hi sachcha pyaar hota hai,\nKyuki pyaar lafzon se nahi, nazaron se vyakt hota hai! 💖🌸✨",
 "Tum sirf ek insaan nahi ho,\nTum ek meethi aadat ho — jise chhod kar jeena mushkil hai! 💖🐻🌈"
 ];
 
 
 const randomCaption = captions[Math.floor(Math.random() * captions.length)];

 if (!mention[0]) return api.sendMessage("Please mention 1 person.", threadID, messageID);
 else {
 const one = senderID, two = mention[0];
 return makeImage({ one, two }).then(path => api.sendMessage({ 
 body: randomCaption, 
 attachment: fs.createReadStream(path) 
 }, threadID, () => fs.unlinkSync(path), messageID));
 }
}
