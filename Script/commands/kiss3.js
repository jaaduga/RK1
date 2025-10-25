module.exports.config = {
    name: "kiss3",
    version: "7.3.1",
    hasPermssion: 0,
    credits: "—͟͟͞͞𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
    description: "kiss",
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
    const path = resolve(__dirname, 'cache/canvas', 'kissv3.png');
    if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/3laJwc1.jpg", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let kiss_img = await jimp.read(__root + "/kissv3.png");
    let pathImg = __root + `/kissv3_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    kiss_img.composite(circleOne.resize(350, 350), 200, 300).composite(circleTwo.resize(350, 350), 600, 80);

    let raw = await kiss_img.getBufferAsync("image/png");

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
        "tumhe kyu chahta hu iska koi khaas reason mujhe nahi pata! lekin tumhare paas hamesha rehne ke hazaar reason mere paas hain!💚",
        "tumhare saath bitaaye hue lamhon ko soch kar lagta hai, ye ek janam tumhare saath bahut kam hai!😘",
        "priye kya tum meri zindagi ki wo kahani banogi? jisme shuruaat to hogi, par ant kabhi nahi!♥️",
        "tum paas ho to sab kuch sundar lagta hai, zindagi ek madhur kavita ban jaati hai!😍",
        "tumhare bina zindagi adhoori hai, tum meri mohabbat ki poornata ho!🧡",
        "tum mera sapna ho, meri zindagi ke har khoobsurat pal ka hissa ho!🌻",
        "mere aankhon me apna wajood mat dhoondhna, kho jaaoge! kyunki mere poore jahan me tumhari hi khamosh aahat hai!🌺",
        "tumse hi shuru tumpe hi khatam, agar tum nahi to hamari kahani yahin khatam!😘",
        "agar pyaar ek ehsaas hai, to tumhare liye mera ehsaas duniya ka sabse khoobsurat ehsaas hai.🌻ღ🌺"
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
        return api.sendMessage("ছবি বানাতে সমস্যা হয়েছে।", threadID, messageID);
    }
};
