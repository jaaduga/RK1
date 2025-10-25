module.exports.config = {
    name: "kiss",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
    description: "Kiss the person you want",
    commandCategory: "Love",
    usages: "kiss [tag]",
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
    const dirMaterial = __dirname + `/cache/`;
    const path = resolve(__dirname, 'cache', 'hon0.jpeg');
    if (!existsSync(dirMaterial + "")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/j96ooUs.jpeg", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache");

    let hon_img = await jimp.read(__root + "/hon0.jpeg");
    let pathImg = __root + `/hon0_${one}_${two}.jpeg`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    hon_img.resize(700, 440).composite(circleOne.resize(150, 150), 390, 23).composite(circleTwo.resize(150, 150), 115, 130);

    let raw = await hon_img.getBufferAsync("image/png");

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

module.exports.run = async function ({ event, api, args, Currencies }) {
    const fs = global.nodemodule["fs-extra"];
    const hc = Math.floor(Math.random() * 101);
    const rd = Math.floor(Math.random() * 100000) + 100000;
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);
    var one = senderID, two = mention[0];
    await Currencies.increaseMoney(event.senderID, parseInt(hc * rd));

    const captions = [
       "Tere bina life adhoori lagti hai yaar 💋",  
    "Tu meri heartbeat hai re 😘",  
    "Bas ek baar tujhe dekh lu, din ban jata hai mera 💞",  
    "Tere lips pe smile dekhu bas, aur kuchh nai chahiye mujhe 💖",  
    "Tu meri duniya hai, aur main tera deewana 💕",  
    "Tere bina sab kuchh suna suna lagta hai baby 😍",  
    "Tere saath hoon to har cheez perfect lagti hai 💫",  
    "Tujhse milke lagta hai sab kuchh mil gaya mujhe 💗",  
    "Tu meri aankhon ka sapna nahi, meri reality hai ❤️",  
    "Kiss bhi ek emotion hota hai... aur tu meri reason hai 💋" 
    ];

    const caption = captions[Math.floor(Math.random() * captions.length)];

    if (!two) return api.sendMessage("Please tag 1 person", threadID, messageID);
    else {
        return makeImage({ one, two }).then(path => api.sendMessage({
            body: `${caption}`,
            attachment: fs.createReadStream(path)
        }, threadID, () => fs.unlinkSync(path), messageID));
    }

}
