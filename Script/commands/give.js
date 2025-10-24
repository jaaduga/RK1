const fs = require("fs"),
	path = require("path"),
	axios = require("axios");

module.exports.config = {
	name: "give",
	version: "1.0",
	hasPermssion: 2,
	credits: "Shaon Ahmed",
	description: "Upload local command files to a pastebin service.",
	commandCategory: "utility",
	usages: "[filename]",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
	if (args.length === 0) 
		return api.sendMessage("📁 Kripya file ka naam dein।\nuse: pastebin <filename>", event.threadID, event.messageID);

	const fileName = args[0];
	const commandsPath = path.join(__dirname, "..", "commands");
	const filePath1 = path.join(commandsPath, fileName);
	const filePath2 = path.join(commandsPath, fileName + ".js");

	let fileToRead;
	if (fs.existsSync(filePath1)) {
		fileToRead = filePath1;
	} else if (fs.existsSync(filePath2)) {
		fileToRead = filePath2;
	} else {
		return api.sendMessage("❌ `commands` folder me file nahi mili।", event.threadID, event.messageID);
	}

	fs.readFile(fileToRead, "utf8", async (err, data) => {
		if (err) {
			console.error("❗ Read error:", err);
			return api.sendMessage("❗ File padhne me problem hui।", event.threadID, event.messageID);
		}
		try {
			api.sendMessage("📤 File PasteBin-এ, par upload ho rahi hai, kripya wait karein...", event.threadID, async (error, info) => {
				if (error) return console.error(error);

				const pastebinAPI = "https://pastebin-api.vercel.app";
				const response = await axios.post(`${pastebinAPI}/paste`, { text: data });

				setTimeout(() => {
					api.unsendMessage(info.messageID);
				}, 1000);

				if (response.data && response.data.id) {
					const link = `${pastebinAPI}/raw/${response.data.id}`;
					return api.sendMessage(`📄 File: ${path.basename(fileToRead)}\n✅ File successfully upload ho gayi:\n🔗 ${link}`, event.threadID);
				} else {
					console.error("⚠️ Unexpected API response:", response.data);
					return api.sendMessage("⚠️ Upload fail hua। PasteBin server se sahi ID nahi mili।", event.threadID);
				}
			});
		} catch (uploadError) {
			console.error("❌ Upload error:", uploadError);
			return api.sendMessage("❌ File upload karne me problem hui:\n" + uploadError.message, event.threadID);
		}
	});
};
