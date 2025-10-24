module.exports.config = {
 name: "hug",
 version: "7.3.1",
 hasPermssion: 0,
 credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
 description: "hug frame create",
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

module.exports.onLoad = async () => {
 const { resolve } = global.nodemodule["path"];
 const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
 const { downloadFile } = global.utils;
 const dirMaterial = __dirname + `/cache/canvas/`;
 const path = resolve(__dirname, 'cache/canvas', 'hugv3.png');
 if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });
 if (!existsSync(path)) await downloadFile("https://i.imgur.com/7lPqHjw.jpg", path);
};

async function circle(image) {
 const jimp = require("jimp");
 image = await jimp.read(image);
 image.circle();
 return await image.getBufferAsync("image/png");
}

async function makeImage({ one, two }) {
 const fs = global.nodemodule["fs-extra"];
 const path = global.nodemodule["path"];
 const axios = global.nodemodule["axios"];
 const jimp = global.nodemodule["jimp"];
 const __root = path.resolve(__dirname, "cache", "canvas");
 const bgPath = __root + "/hugv3.png";
 const pathImg = __root + `/hug_${one}_${two}.png`;
 const avatarOne = __root + `/avt_${one}.png`;
 const avatarTwo = __root + `/avt_${two}.png`;

 const getAvatar = async (id, path) => {
 const response = await axios.get(
 `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
 { responseType: 'arraybuffer' }
 );
 fs.writeFileSync(path, Buffer.from(response.data, 'utf-8'));
 };

 await getAvatar(one, avatarOne);
 await getAvatar(two, avatarTwo);

 const baseImg = await jimp.read(bgPath);
 const circleOne = await jimp.read(await circle(avatarOne));
 const circleTwo = await jimp.read(await circle(avatarTwo));

 baseImg.composite(circleOne.resize(220, 220), 200, 50);
 baseImg.composite(circleTwo.resize(220, 220), 490, 200);

 const raw = await baseImg.getBufferAsync("image/png");
 fs.writeFileSync(pathImg, raw);
 fs.unlinkSync(avatarOne);
 fs.unlinkSync(avatarTwo);
 return pathImg;
}

module.exports.run = async function ({ event, api, args }) {
 const fs = global.nodemodule["fs-extra"];
 const { threadID, messageID, senderID } = event;
 const mention = Object.keys(event.mentions);

 if (mention.length !== 1)
 return api.sendMessage("Arre yaar ek hi person ko mention karo🤧🤣", threadID, messageID);

 const captions = [
 "❝ Agar kabhi feeling ho, toh mere feelings tumhare liye duniya ke sabse best feelings hai!🌻",
 "❝ Tum mere zindagi ka sabse best chapter ho, jo baar-baar padhne ka mann karta hai!💝",
 "❝ Tumhare pyaar ka value main kaise doon, ye mujhe nahi pata, bas pehle jaise pyaar kiya tha, waise hi karta rahunga!💜",
 "❝ Main pyaar me padne se pehle tumhari maya me ghusa, jo maya nasha jaise hai, main chahoon toh tumhara nasha hata nahi sakta!💝",
 "❝ Tumhe chaha tha, aur sirf tumhe chahunga, tum meri mohabbat ho🖤 tum mere jeene ki wajah ho!💞",
 "❝ Mere paas tumhe pyaar karne ki koi definition nahi hai, tumhe pyaar karna meri chup rehne wali feeling hai!❤️",
 "❝ Tum meri zindagi ki wo story ho, jo padhte waqt har baar kuch naya seekhta hoon!💚",
 "❝ Mere dil ke gehre me basne wali princess, tumhe bohot pyaar karta hoon.❤️‍🩹",
 "❝ I feel complete in my life, jab sochta hoon tum jaise ek lucky insaan mere life partner!🌺"
 ];

 try {
 const path = await makeImage({ one: senderID, two: mention[0] });
 const caption = captions[Math.floor(Math.random() * captions.length)];
 return api.sendMessage(
 {
 body: caption,
 attachment: fs.createReadStream(path)
 },
 threadID,
 () => fs.unlinkSync(path),
 messageID
 );
 } catch (e) {
 console.error(e);
 return api.sendMessage("❌ Failed to generate hug image.", threadID, messageID);
 }
};
