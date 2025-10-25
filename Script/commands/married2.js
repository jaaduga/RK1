module.exports.config = {
    name: "married2",
    version: "3.1.1",
    hasPermssion: 0,
    credits: "—͟͟͞͞𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
    description: "married",
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
    const path = resolve(__dirname, 'cache/canvas', 'marriedv3.png');
    if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.ibb.co/5TwSHpP/Guardian-Place-full-1484178.jpg", path);
};

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let married_img = await jimp.read(__root + "/marriedv3.png");
    let pathImg = __root + `/married_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    married_img.composite(circleOne.resize(90, 90), 250, 1).composite(circleTwo.resize(90, 90), 350, 70);

    let raw = await married_img.getBufferAsync("image/png");

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
    const mention = Object.keys(event.mentions || {});

    const captions = [
       "💖🌸 Tum meri zindagi ka wo hisa ho, jise kho dene ka khayal bhi dil tod deta hai. 🌸💖",
       "🌷 Jab tum muskuraati ho, lagta hai meri duniya roshan ho gayi. 💫💝",
       "💞 Tum meri subah ka sapna aur raat ki dua dono ho. 💞🌙",
       "🌺 Tum meri wo aadat ho jise chhod kar main jee nahi sakta. 🥺💗",
       "💘 Tumse milkar laga jaise har adhura pal poora ho gaya. 💘🌸",
       "🌹 Tum meri zindagi ka wo chapter ho, jise main hamesha padhta rahun. 📖❤️",
       "💞 Tum meri aankhon ka sapna nahi, meri duaon ka jawaab ho. 💫💞",
       "💝 Jab tum paas hoti ho to dil chain paata hai, aur door hoti ho to har lamha udaas ho jaata hai. 💔🌺",
       "🌸 Tum meri kahani ka wo hissa ho, jahan se pyaar shuru hota hai aur kabhi khatam nahi hota. 💖",
       "🌼 Tum meri duniya nahi, meri duniya ka sabse khoobsurat ehsaas ho. 🌼💗",
       "💘 Agar pyaar ek dua hai, to tum meri har dua ka pehla lafz ho. 💘✨",
       "💞 Tum meri zindagi ka wo geet ho, jise main har din dil se gaata hoon. 🎶💞"
    ];

    if (!mention[0]) return api.sendMessage("Please mention 1 person.", threadID, messageID);

    const one = senderID, two = mention[0];
    const caption = captions[Math.floor(Math.random() * captions.length)];

    try {
        const path = await makeImage({ one, two });
        return api.sendMessage({
            body: caption,
            attachment: fs.createReadStream(path)
        }, threadID, () => fs.unlinkSync(path), messageID);
    } catch (err) {
        return api.sendMessage("sorry boss fir se try kro", threadID, messageID);
    }
};
