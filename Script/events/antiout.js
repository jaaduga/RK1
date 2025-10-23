module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "Koi Ase Pichware Mai Lath Marta Hai?";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`maff krna boss, ${name} main phir se kisee ko nahin jod saka.
ho sakata hai usane bot ko blok kar diya ho ya usakee praivesee setings ne use jodane se rok diya ho 
\n──────꯭─⃝‌‌𝗙𝗮𝗶𝘇𝗮𝗻 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭─────`, event.threadID)
   } else api.sendMessage(`sunana, ${name},ye grup ek giroh hai!
yahaan se jaane ke lie aapako edamin kee anumati chaahie!
aap bina anumati ke chale gae - main aapako phir se maaphiya stail mein jod doonga।
\n──────꯭─⃝‌‌𝗙𝗮𝗶𝘇𝗮𝗻 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭─────`, event.threadID);
  })
 }
}
