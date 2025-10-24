const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
 name: "girl dp",
 version: "1.0.2",
 hasPermssion: 0,
 credits: "Islamick Chat (Modified by Shahadat SAHU)",
 description: "Random Facebook Islamic Girl Profile Picture",
 commandCategory: "Random-IMG",
 usages: "girl pp",
 cooldowns: 2,
 dependencies: {
 "request": "",
 "fs-extra": "",
 "axios": ""
 }
};

module.exports.run = async ({ api, event }) => {
 const links = [
 "https://i.imgur.com/WSCOFG8.jpeg",
 "https://i.imgur.com/TBB9lQF.jpeg",
 "https://i.imgur.com/xAKK0v1.jpeg",
 "https://i.imgur.com/hVZc6pD.jpeg",
 "https://i.imgur.com/UC5sawy.jpeg",
 "https://i.imgur.com/4oLnK83.jpeg",
 "https://i.imgur.com/MJXW6QU.jpeg",
 "https://i.imgur.com/xJqkUyS.jpeg",
 "https://i.imgur.com/KtocUvd.jpeg",
 "https://i.imgur.com/uxadtYj.jpeg",
 "https://i.imgur.com/9pA0nl7.jpeg",
 "https://i.imgur.com/FM3mvcF.jpeg",
 "https://i.imgur.com/d2Naj7J.jpeg",
 "https://i.imgur.com/ik2Ukg5.jpeg",
 "https://i.imgur.com/ca6IgSt.jpeg",
 "https://i.imgur.com/CyGbNKj.jpeg",
 "https://i.imgur.com/dwH7Zet.jpeg",
 "https://i.imgur.com/AUXifFn.jpeg",
 "https://i.imgur.com/VJxMevG.jpeg",
 "https://i.imgur.com/eU2TFdy.jpeg",
 "https://i.imgur.com/gx96pt9.jpeg",
"https://i.imgur.com/Yq2dNvD.jpeg",
"https://i.imgur.com/204H9no.jpeg",
"https://i.imgur.com/bmKahkk.jpeg",
"https://i.imgur.com/d9Z4e5N.jpeg",
"https://i.imgur.com/Vtu7pVo.jpeg",
"https://i.imgur.com/p5Jvjjj.jpeg",
"https://i.imgur.com/7e8xUI2.jpeg",
"https://i.imgur.com/ejPSHRi.jpeg",
"https://i.imgur.com/ompIx4W.jpeg",
"https://i.imgur.com/VFoNkte.jpeg",
"https://i.imgur.com/uwszp6r.jpeg",
"https://i.imgur.com/qZWig6p.jpeg",
"https://i.imgur.com/Dw1D2Ji.jpeg",
"https://i.imgur.com/fYJrOY5.jpeg",
"https://i.imgur.com/o5myzQ8.jpeg",
"https://i.imgur.com/DGk60tJ.jpeg",
"https://i.imgur.com/vmawGZc.jpeg",
"https://i.imgur.com/r9Bo2Qn.jpeg",
"https://i.imgur.com/iOBx0Qg.jpeg",
"https://i.imgur.com/xV58bdv.jpeg",
"https://i.imgur.com/fHUlyEB.jpeg",
"https://i.imgur.com/Yd4aQo4.jpeg",
"https://i.imgur.com/6HB72QA.jpeg",
"https://i.imgur.com/i3C2XCz.jpeg",
"https://i.imgur.com/8UIu17f.jpeg",
"https://i.imgur.com/baIlvEg.jpeg",
"https://i.imgur.com/HYLjwxj.jpeg",
"https://i.imgur.com/4PtQ24J.jpeg",
"https://i.imgur.com/yCIGTs8.jpeg",
"https://i.imgur.com/nEQDVij.jpeg",
"https://i.imgur.com/IuQydQC.jpeg",
"https://i.imgur.com/2YbMuHD.jpeg",
"https://i.imgur.com/HrJUijs.jpeg",
"https://i.imgur.com/EWXZJ8j.jpeg",
"https://i.imgur.com/Cxbv5Qv.jpeg",
"https://i.imgur.com/mdZl6YA.jpeg",
"https://i.imgur.com/KgS2dXP.jpeg",
"https://i.imgur.com/fSK8GbF.jpeg",
"https://i.imgur.com/rKHoovj.jpeg",
"https://i.imgur.com/DDN2FqE.jpeg",
"https://i.imgur.com/8SnuMmH.jpeg",
"https://i.imgur.com/9rI7WM9.jpeg",
"https://i.imgur.com/GY3obl2.jpeg",
"https://i.imgur.com/R5aamUt.jpeg",
"https://i.imgur.com/EsTcNLF.jpeg",
"https://i.imgur.com/srUx9TF.jpeg",
"https://i.imgur.com/6VgsDuW.jpeg",
"https://i.imgur.com/8grFh7K.jpeg",
"https://i.imgur.com/L529nyo.jpeg",
"https://i.imgur.com/4wGgw4c.jpeg",
"https://i.imgur.com/ZJ2ogWB.jpeg",
"https://i.imgur.com/8x1xp5m.jpeg",
"https://i.imgur.com/gvlx61F.jpeg",
"https://i.imgur.com/3GQpmdm.jpeg",
"https://i.imgur.com/n7094fM.jpeg",
"https://i.imgur.com/NCRxft1.jpeg",
"https://i.imgur.com/APKeEDx.jpeg",
"https://i.imgur.com/4p5IUJ8.jpeg",
"https://i.imgur.com/8XqAylA.jpeg",
"https://i.imgur.com/jcHHovk.jpeg",
"https://i.imgur.com/cCspFwy.jpeg",
"https://i.imgur.com/MmXGShA.jpeg",
"https://i.imgur.com/k7ASVnP.jpeg",
"https://i.imgur.com/ONZ12Oi.jpeg",
"https://i.imgur.com/06gKphw.jpeg",
"https://i.imgur.com/EDef2sL.jpeg",
"https://i.imgur.com/pxmjXyu.jpeg",
"https://i.imgur.com/adG13Pm.jpeg",
"https://i.imgur.com/Mg1LfrK.jpeg",
"https://i.imgur.com/V6IdXAQ.jpeg",
"https://i.imgur.com/MrKzxdp.jpeg"
 ];

 const imgURL = links[Math.floor(Math.random() * links.length)];
 const imgPath = __dirname + "/cache/girl_pp.jpg";

 const callback = () => {
 api.sendMessage({
 body: "🌸 𝙁𝘼𝘾𝙀𝘽𝙊𝙊𝙆 𝙂𝙄𝙍𝙇'𝙎 𝙋𝙍𝙊𝙁𝙄𝙇𝙀 𝙋𝙄𝘾 🧕",
 attachment: fs.createReadStream(imgPath)
 }, event.threadID, () => fs.unlinkSync(imgPath));
 };

 request(encodeURI(imgURL)).pipe(fs.createWriteStream(imgPath)).on("close", callback);
};
