const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
 name: "rasian",
 version: "1.0.2",
 hasPermission: 0,
 credits: "Shaon Ahmed",
 description: "Send a random shoti (TikTok short video)",
 commandCategory: "media",
 usages: "",
 cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
 try {
const apis = await axios.get('https://raw.githubusercontent.com/shaonproject/Shaon/main/api.json')
 const Shaon = apis.data.alldl

 const res = await axios.get(`${Shaon}/api/shoti`);
 let data = res.data;

 // যদি অ্যারে হয়, তাহলে প্রথম অথবা র‍্যান্ডম আইটেম নাও
 if (Array.isArray(data)) {
 if (data.length === 0) {
 return api.sendMessage("❌ koi video nhi mila।", event.threadID, event.messageID);
 }
 data = data[Math.floor(Math.random() * data.length)];
 }

 const videoUrl = data.shotiurl || data.url;
 if (!videoUrl) {
 return api.sendMessage("❌ API did not return a video URL.", event.threadID, event.messageID);
 }

 const caption =
 `🎬 𝗧𝗶𝘁𝗹𝗲: ${data.title || "N/A"}\n` +
 `👤 𝗨𝘀𝗲𝗿: @${data.username || "N/A"}\n` +
 `📛 𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: ${data.nickname || "N/A"}\n` +
 `🌍 𝗥𝗲𝗴𝗶𝗼𝗻: ${data.region || "N/A"}\n` +
 `⏱️ 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${data.duration || "N/A"} sec\n` +
 `👑 𝗢𝗽𝗲𝗿𝗮𝘁𝗼𝗿: ${data.operator || "N/A"}`;

 const fileName = `shoti_${Date.now()}.mp4`;
 const filePath = path.join(__dirname, "cache", fileName);

 const writer = fs.createWriteStream(filePath);
 const videoStream = await axios.get(videoUrl, { responseType: "stream" });
 videoStream.data.pipe(writer);

 writer.on("finish", () => {
 api.sendMessage(
 {
 body: caption,
 attachment: fs.createReadStream(filePath),
 },
 event.threadID,
 () => {
 fs.unlinkSync(filePath);
 },
 event.messageID
 );
 });

 writer.on("error", (err) => {
 console.error("❌ File write error:", err);
 api.sendMessage("⚠️ video fail bhej ne me smsiya huve!", event.threadID, event.messageID);
 });
 } catch (err) {
 console.error("❌ Shoti API error:", err.message);
 api.sendMessage("❌ sorry fir se trykeo।", event.threadID, event.messageID);
 }
};
