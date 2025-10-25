module.exports.config = {
    name: "married3",
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

module.exports.onLoad = async() => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'marriedv4.png');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.ibb.co/9ZZCSzR/ba6abadae46b5bdaa29cf6a64d762874.jpg", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"]; 
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let batgiam_img = await jimp.read(__root + "/marriedv4.png");
    let pathImg = __root + `/batman${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;
    
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));
    
    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));
    
    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    batgiam_img.composite(circleOne.resize(130, 130), 200, 70).composite(circleTwo.resize(130, 130), 350, 150);
    
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
        "💟ღــ💘तुम्हारा प्यार, मेरी ज़िंदगी का सबसे बड़ा तोहफ़ा है।💘ღــ💟",
        "जब तुम्हारी आँखों में देखता हूँ, तो लगता है मेरी पूरी दुनिया वहीं है!💚❤️‍🩹💞",
        "तुम मेरे जीवन की वो कहानी हो जिसे मैं कभी खत्म नहीं करना चाहता!🥰😘🌻",
        "मैं बहुत खुशकिस्मत हूँ कि तुम जैसे प्यारे इंसान मेरे जीवन साथी हो!❤️‍🩹💞🌺",
        "जब सोचता हूँ कि तुम मेरी ज़िंदगी का हिस्सा हो, तो सब कुछ पूरा लगता है!💝",
        "तुमसे शुरू हुआ और तुमपर ही खत्म, तुम्हारे बिना ये कहानी अधूरी है!🌺",
        "मैं था, मैं हूँ और मैं रहूँगा... सिर्फ तुम्हारे लिए!💞",
        "❥💙══ღ══❥तुम्हें गले लगाने का सुख इस दुनिया की किसी चीज़ से खरीदा नहीं जा सकता, मेरी जान।══ღ══❥💙❥",
        "🌻•━इतना प्यार करता हूँ तुम्हें कि जब तुम पास नहीं होती, तो सब सूना लगता है!🌻•━",
        "🌼══ღ══❥चलते वक्त मेरा हाथ थाम लेना, अगर मैं लड़खड़ा जाऊं तो तुम मुझे संभाल लेना।🌼══ღ══❥",
        "💠✦💟✦💠मुझे लगता है मेरे दिल के सबसे नरम कोने में सिर्फ तुम्हारा ही घर है।💠✦💟✦💠",
        "मुझे न खुशियाँ चाहिए, न दौलत... बस तुम्हारा साथ चाहिए!🌼"
    ];
    const caption = captions[Math.floor(Math.random() * captions.length)];

    if (!mention[0]) return api.sendMessage("Please mention 1 person.", threadID, messageID);
    else {
        const one = senderID, two = mention[0];
        return makeImage({ one, two }).then(path =>
            api.sendMessage(
                { body: caption, attachment: fs.createReadStream(path) },
                threadID,
                () => fs.unlinkSync(path),
                messageID
            )
        );
    }
}
