module.exports.config = {
 name: "broken",
 version: "1.0.0",
 hasPermssion: 2,
 credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
 description: "5 বারের জন্য ক্রমাগত বন্ধুর ট্যাগ ট্যাগ করুন\nসেই ব্যক্তিকে আত্মা কলিং বলা যেতে পারে",
 commandCategory: "nsfw",
 usages: "please @mention",
 cooldowns: 10,
 dependencies: {
 "fs-extra": "",
 "axios": ""
 }
};

module.exports.run = async function({ api, args, Users, event }) {
 var mention = Object.keys(event.mentions)[0];
 if (!mention) return api.sendMessage("आप किसे समझाना चाहते हैं? कृपया 1 को @मेंशन करें। 😘🥰", event.threadID);
 
 let name = event.mentions[mention];
 var arraytag = [];
 arraytag.push({ id: mention, tag: name });
 
 var a = function(a) { api.sendMessage(a, event.threadID); }
 
 a("तुम्हें कुछ सलाह दी जाएगी। अगर तुम मानोगे तो जिंदगी में बहुत सुधार होगा और बाद में भी भलाई मिलेगी।😇");
 
 setTimeout(() => {
 a({ body: "मुसीबत के समय, जब दुनिया के सारे दरवाज़े बंद हो जाएँ, तो अल्लाह का दरवाज़ा हमेशा खुला रहता है🥰🥰।" + " " + name, mentions: arraytag });
 }, 3000);
 
 setTimeout(() => {
 a({ body: "दुनिया में एक ही घर है — काबा🕋 आज तक उस पर कोई पक्षी या हवाई जहाज़ नहीं उड़ा। 😍.." + " " + name, mentions: arraytag });
 }, 5000);
 
 setTimeout(() => {
 a({ body: "किसी के लिए रोओ जो तुम्हारे आँसू देखकर भी रो दे; पर उसके लिए मत रो जो तुम्हारे आँसू देखकर मज़ाक बनाए। 🐰" + " " + name, mentions: arraytag });
 }, 7000);
 
 setTimeout(() => {
 a({ body: "सबसे कठिन काम है खुद को जानना, और सबसे आसान काम है दूसरों को सलाह देना। 💔!" + " " + name, mentions: arraytag });
 }, 9000);
 
 setTimeout(() => {
 a({ body: "यदि तुम किसी से प्यार में चोट खाए हुए हो और भूल नहीं पा रहे— पाँच वक्त की नमाज़ अदा करो; जो मोहब्बत थी उसे अल्लाह के वास्ते समर्पित कर दो।🥰" + " " + name, mentions: arraytag });
 }, 12000);
 
 setTimeout(() => {
 a({ body: "अगर तुम डिप्रेशन में हो और इससे निजात नहीं मिल रही, तो इस्लामिक वीडियो सुनो, वाज़ सुनो, दिल को इस्लामिक बातों में लगाओ — दिल हल्का होगा। " + " " + name, mentions: arraytag });
 }, 15000);
 
 setTimeout(() => {
 a({ body: "जो तुम दिखाते हो, उसकी तुलना में तुम्हें और भी अधिक होना चाहिए🤬" + " " + name, mentions: arraytag });
 }, 17000);
 
 setTimeout(() => {
 a({ body: "जो तुम जानते हो, उसकी तुलना में कम बोलना चाहिए।🤟" + " " + name, mentions: arraytag });
 }, 20000);
 
 setTimeout(() => {
 a({ body: "दोस्ती हो या मोहब्बत — इसे कायम रखने की ज़िम्मेदारी दोनों की होती है। 🤝" + " " + name, mentions: arraytag });
 }, 23000);
 
 setTimeout(() => {
 a({ body: "यदि तुम सपने देख सकते हो, तो उन्हें सच भी कर सकते हो।💉।" + " " + name, mentions: arraytag });
 }, 25000);
 
 setTimeout(() => {
 a({ body: "जो आज तुम्हें तवज्जो नहीं दे रहा — धैर्य रखो, एक दिन उसे तुम्हारी ज़रूरत पड़ेगी" + " " + name, mentions: arraytag });
 }, 28500);
 
 setTimeout(() => {
 a({ body: "उसे छोड़कर मत जाओ। 💔 जिसने तुम्हारे बहुत बुरे हालात में भी साथ छोड़ा नहीं।😘 ✋" + " " + name, mentions: arraytag });
 }, 31000);
 
 setTimeout(() => {
 a({ body: "अल्लाह के दिखाए हुए रास्ते पर चलो 🥰" + " " + name, mentions: arraytag });
 }, 36000);
 
 setTimeout(() => {
 a("~किसी को गाली देने से परहेज़ करें♥️");
 }, 39000);
 
 setTimeout(() => {
 a({ body: "गर्लफ्रेंड नहीं — अपने माँ-बाप से प्यार करो✋🥰।" + " " + name, mentions: arraytag });
 }, 42000);
 
 setTimeout(() => {
 a({ body: "खुद पर विश्वास रखना ही आत्मविश्वास होता है। वह विश्वास करो और अपने लिए सही फ़ैसला लेने की क्षमता रखो।😍.." + " " + name, mentions: arraytag });
 }, 48000);
 
 setTimeout(() => {
 a({ body: "मौत निश्चित है लेकिन उसका समय अनिश्चित है.. या अल्लाह! जब भी मौत देना उसे आस्था के साथ देना। 😍🐰" + " " + name, mentions: arraytag });
 }, 51000);
 
 setTimeout(() => {
 a({ body: "तनाव दूर करने के लिए — नशा नहीं। पाँच वक्त की नमाज़ ही काफी है।💔!" + " " + name, mentions: arraytag });
 }, 54000);
 
 setTimeout(() => {
 a({ body: "अगर तुम्हारी गर्लफ्रेंड तुम्हें छोड़के किसी अमीर लड़के के पास चली गई और तुम खुद को चोट पहुँचा रहे हो — बेवकूफ मत बनो। खुद को ऐसा बनाओ कि वो देख के पछताए और तुम्हारे पास वापस आए✌️" + " " + name, mentions: arraytag });
 }, 57000);
 
 setTimeout(() => {
 a({ body: "शारीरिक बीमारियों की दवा फ़ार्मेसी में मिलती है, लेकिन दिल की बीमारी की दवा अल-कुरआन में है😍 " + " " + name, mentions: arraytag });
 }, 59400);
 
 setTimeout(() => {
 a({ body: "जो व्यक्ति धोखा देता है — उसका मुझसे कोई ताल्लुक़ नहीं। ✋" + " " + name, mentions: arraytag });
 }, 63000);
 
 setTimeout(() => {
 a({ body: "हे अल्लाह, जब तू मुसलमान को बनाता है — उससे ईमान के साथ मौत दे।🤟" + " " + name, mentions: arraytag });
 }, 66000);
 
 setTimeout(() => {
 a({ body: "हराम कमाने के खाने से भरा मेज़ नहीं, बल्कि हलाल कमाई का सीमित भोजन ही असली सुख देता है। " + " " + name, mentions: arraytag });
 }, 69000);
 
 setTimeout(() => {
 a({ body: "दुनिया में सबसे कंजूस वही है जो दूसरे मुसलमान को सलाम करने में कंजूसी करे।💉।" + " " + name, mentions: arraytag });
 }, 72000);
 
 setTimeout(() => {
 a({ body: "चरित्रहीन पति के महल में रहने से बेहतर है, निर्धन आदर्शवान पति के साथ कुटिया में सुखी जीवन।" + " " + name, mentions: arraytag });
 }, 75000);
 
 setTimeout(() => {
 a({ body: "चरित्रहीन पति के महल में रहने से बेहतर है, निर्धन आदर्शवान पति के साथ कुटिया में सुखी जीवन। 🙂✋" + " " + name, mentions: arraytag });
 }, 78000);
};
