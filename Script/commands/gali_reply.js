const fs = require("fs");
module.exports.config = {
	name: "gali",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️", 
	description: "no prefix",
	commandCategory: "no prefix",
	usages: "abal",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Shahadat Bokasoda")==0 || event.body.indexOf("Sahadat mc")==0 || event.body.indexOf("chod")==0 || event.body.indexOf("Sahadat nodir pola")==0 || event.body.indexOf("bc")==0 || event.body.indexOf("Shahadat re chudi")==0 || event.body.indexOf("shahadat re chod")==0 || event.body.indexOf("Shahadat Abal")==0 || event.body.indexOf("Shahadat Boakachoda")==0 || event.body.indexOf("Shahadat madarchod")==0 || event.body.indexOf("Sahadat re chudi")==0 || event.body.indexOf("Sahu Bokachoda")==0) {
		var msg = {
				body: "abe ullu gali na de mere boss ko pta lga gya na🤣\nto fir faltu me pel diye javo ge🥱😈",
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
