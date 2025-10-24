module.exports.config = {
    name: "fork",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "SHAHADAT SAHU",
    description: "Send YouTube channel and GitHub fork link with intro text",
    commandCategory: "other",
    usages: "fork",
    cooldowns: 0,
};

module.exports.run = async function({ api, event }) {
    const message = 
        "🌟 Assalamu Alaikum Sammanit Bot User 🌟\n\n" +
        "Agar aap bot banana chahte hain, to aap humare boss faizan ko bolo sikha dega" +
        "mere boss ki id me jake kho vo apko sikha dege kese bot bnate he" +
        "ya fir mere boss Faizan khan ka bot us kro apne gurp meor enjoy kro।\n\n" +
        "➤ YouTube Channel: sorry abhi pending he\n\n" +
        "🔗 GitHub Fork Link mil jaye ga mere boss ke pas se";

    return api.sendMessage(message, event.threadID, event.messageID);
};
