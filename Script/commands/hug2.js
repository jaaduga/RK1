const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const jimp = require("jimp");

module.exports.config = {
 name: "hug2",
 version: "3.1.2",
 hasPermssion: 0,
 credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐒𝐀𝐇𝐔",
 description: "hug frame generat",
 commandCategory: "img",
 usages: "[@mention]",
 cooldowns: 5
};

module.exports.onLoad = async () => {
 const dir = path.join(__dirname, "cache", "canvas");
 const filePath = path.join(dir, "hugv2.png");
 if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
 if (!fs.existsSync(filePath)) {
 const imgURL = "https://i.ibb.co/zRdZJzG/1626342271-28-kartinkin-com-p-anime-obnimashki-v-posteli-anime-krasivo-30.jpg";
 const imgData = (await axios.get(imgURL, { responseType: "arraybuffer" })).data;
 fs.writeFileSync(filePath, Buffer.from(imgData));
 }
};

async function circle(imagePath) {
 const img = await jimp.read(imagePath);
 img.circle();
 return await img.getBufferAsync("image/png");
}

async function makeImage({ one, two }) {
 const dir = path.join(__dirname, "cache", "canvas");
 const bg = await jimp.read(path.join(dir, "hugv2.png"));
 const pathImg = path.join(dir, `hug2_${one}_${two}.png`);
 const avatarOnePath = path.join(dir, `avt_${one}.png`);
 const avatarTwoPath = path.join(dir, `avt_${two}.png`);

 const getAvatar = async (uid, filePath) => {
 const url = `https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`;
 const avatarData = (await axios.get(url, { responseType: 'arraybuffer' })).data;
 fs.writeFileSync(filePath, Buffer.from(avatarData));
 };

 await getAvatar(one, avatarOnePath);
 await getAvatar(two, avatarTwoPath);

 const circleOne = await jimp.read(await circle(avatarOnePath));
 const circleTwo = await jimp.read(await circle(avatarTwoPath));

 bg.composite(circleOne.resize(100, 100), 370, 40)
 .composite(circleTwo.resize(100, 100), 330, 150);

 const finalBuffer = await bg.getBufferAsync("image/png");
 fs.writeFileSync(pathImg, finalBuffer);
 fs.unlinkSync(avatarOnePath);
 fs.unlinkSync(avatarTwoPath);

 return pathImg;
}

module.exports.run = async function ({ event, api }) {
 const { threadID, messageID, senderID, mentions } = event;
 const mention = Object.keys(mentions);
 if (!mention[0]) {
 return api.sendMessage("please mention 1 paeson!", threadID, messageID);
 }

 const one = senderID, two = mention[0];

 const captions = [
 "Agar pyaar koi feeling hoti, toh mere feelings tumhare liye duniya ke best feelings hain!🌺",
 "Tum meri zindagi ka best chapter ho, jo baar-baar padhne ka mann karta hai!😘",
 "Tumhare pyaar ka value main kaise doon, mujhe nahi pata, bas jaise pehle pyaar kiya tha, waise hi karta rahunga!💜",
 "Main pyaar me padne se pehle tumhari maya me ghusa, jo nasha jaise hai, main chahoon toh usse hata nahi sakta!💞",
 "Tumhe chaha tha aur sirf tumhe chahunga, tum meri mohabbat ho🖤 tum mere jeene ki wajah ho!🥰",
 "Mere liye tumhe pyaar karne ki koi definition nahi hai, tumhe pyaar karna meri chup rehne wali feeling hai!😍",
 "Tum meri zindagi ki wo story ho, jo padhte waqt har baar kuch naya seekhta hoon!🌻",
 "Mere dil ke gehre me basne wali princess, tumhe bohot pyaar karta hoon.❤️‍🩹",
 "I feel complete in my life, jab sochta hoon tum jaise lucky insaan mere life partner!🌺",
 "Jo tumhari soch se milta ho, usse kabhi mat chhodo 🤗 aise log har kisi ke life me nahi aate!😘",
 "Tumhare ek chhote se pyaar se main poora life jee sakta hoon!💜",
 "Tumhari hasi me meri duniya ruk jaati hai!😊",
 "Tum sirf ek insaan nahi, tum meri feeling ho, mera mann!🖤",
 "Tum meri sab kuch ho, mera aaj aur mera kal!❤️‍🔥",
 "Tumhari aankhon me aankhon daal ke sab dard bhool jaata hoon!😘"
 ];

 const caption = captions[Math.floor(Math.random() * captions.length)];

 try {
 const imagePath = await makeImage({ one, two });
 return api.sendMessage({
 body: caption,
 attachment: fs.createReadStream(imagePath)
 }, threadID, () => fs.unlinkSync(imagePath), messageID);
 } catch (e) {
 console.error(e);
 return api.sendMessage("❌ ছবিটি তৈরি করতে সমস্যা হয়েছে!", threadID, messageID);
 }
};
