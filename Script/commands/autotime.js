const schedule = require('node-schedule');
const moment = require('moment-timezone');
const chalk = require('chalk');

module.exports.config = {
    name: 'autosent',
    version: '10.1.0',
    hasPermssion: 0,
    credits: 'Aman Khan',
    description: 'Set Karne Ke Bad Automatically Msg Send Karega',
    commandCategory: 'group messenger',
    usages: '[]',
    cooldowns: 3
};

// Message set: feminine, caring, hour-appropriate, same visual layout
const messages = [
    { time: '12:00 AM', message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 12:00 𝐀𝐌\n𝐒𝐨 𝐉𝐚𝐨 𝐍𝐚, 𝐌𝐞𝐫𝐢 𝐃𝐮𝐚 𝐓𝐮𝐦𝐡𝐚𝐫𝐞 𝐒𝐚𝐭𝐡 𝐇𝐚𝐢 🌙\n──── •💜• ────' },
    { time: '1:00 AM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 1:00 𝐀𝐌\n𝐇𝐚𝐥𝐤𝐚 𝐁𝐥𝐚𝐧𝐤𝐞𝐭 𝐎𝐝𝐡 𝐋𝐨, 𝐏𝐞𝐚𝐜𝐞 𝐌𝐞 𝐒𝐨 𝐉𝐚𝐨 😴\n──── •💜• ────' },
    { time: '2:00 AM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 2:00 𝐀𝐌\n𝐃𝐢𝐥 𝐇𝐚𝐥𝐤𝐚 𝐊𝐚𝐫𝐨, 𝐍𝐢𝐧𝐝 𝐂𝐡𝐮𝐦 𝐋𝐞 𝐓𝐮𝐦𝐡𝐞 ✨\n──── •💜• ────' },
    { time: '3:00 AM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 3:00 𝐀𝐌\n𝐀𝐚𝐧𝐚 𝐀𝐚𝐧𝐚 𝐍𝐞𝐞𝐧𝐝, 𝐌𝐞𝐫𝐞 𝐋𝐚𝐝𝐥𝐞/𝐋𝐚𝐝𝐥𝐢 𝐊𝐨 𝐀𝐫𝐚𝐦 𝐂𝐡𝐚𝐡𝐢𝐞 🌌\n──── •💜• ────' },
    { time: '4:00 AM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 4:00 𝐀𝐌\n𝐋𝐚𝐬𝐭 𝐒𝐭𝐫𝐞𝐭𝐜𝐡 𝐎𝐟 𝐍𝐢𝐠𝐡𝐭—𝐑𝐞𝐬𝐭 𝐖𝐞𝐥𝐥 💜\n──── •💜• ────' },
    { time: '5:00 AM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 5:00 𝐀𝐌\n𝐒𝐮𝐛𝐚𝐡 𝐊𝐢 𝐇𝐚𝐰𝐚, 𝐍𝐞𝐰 𝐇𝐨𝐩𝐞—𝐌𝐞𝐫𝐞 𝐋𝐢𝐞 𝐒𝐦𝐢𝐥𝐞 🌅\n──── •💜• ────' },
    { time: '6:00 AM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 6:00 𝐀𝐌\n𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮 𝐀𝐥𝐚𝐢𝐤𝐮𝐦/𝐆𝐨𝐨𝐝 𝐌𝐨𝐫𝐧𝐢𝐧𝐠, 𝐑𝐢𝐬𝐞 𝐒𝐨𝐟𝐭𝐥𝐲 🌤️\n──── •💜• ────' },
    { time: '7:00 AM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 7:00 𝐀𝐌\n𝐔𝐭𝐡𝐨 𝐍𝐚, 𝐓𝐡𝐨𝐝𝐢 𝐖𝐚𝐥𝐤, 𝐓𝐡𝐨𝐝𝐢 𝐒𝐦𝐢𝐥𝐞 😊\n──── •💜• ────' },
    { time: '8:00 AM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 8:00 𝐀𝐌\n𝐋𝐢𝐠𝐡𝐭 𝐁𝐫𝐞𝐚𝐤𝐟𝐚𝐬𝐭 𝐀𝐮𝐫 𝐆𝐨𝐨𝐝 𝐌𝐨𝐨𝐝 ☕🍞\n──── •💜• ────' },
    { time: '9:00 AM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 9:00 𝐀𝐌\n𝐁𝐫𝐞𝐚𝐤𝐟𝐚𝐬𝐭 𝐊𝐚𝐫𝐥𝐨 𝐀𝐛𝐡𝐢, 𝐌𝐞𝐫𝐢 𝐓𝐞𝐚𝐦 𝐊𝐢 𝐒𝐭𝐚𝐫 ✨\n──── •💜• ────' },
    { time: '10:00 AM', message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 10:00 𝐀𝐌\n𝐅𝐨𝐜𝐮𝐬 𝐎𝐧—𝐘𝐨𝐮 𝐆𝐨𝐭 𝐓𝐡𝐢𝐬, 𝐒𝐦𝐚𝐫𝐭𝐢𝐞 💪\n──── •💜• ────' },
    { time: '11:00 AM', message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 11:00 𝐀𝐌\n𝐒𝐡𝐨𝐫𝐭 𝐁𝐫𝐞𝐚𝐤 𝐋𝐨, 𝐏𝐚𝐧𝐢 𝐏𝐢 𝐋𝐨 💧\n──── •💜• ────' },
    { time: '12:00 PM', message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 12:00 𝐏𝐌\n𝐆𝐨𝐨𝐝 𝐀𝐟𝐭𝐞𝐫𝐧𝐨𝐨𝐧, 𝐒𝐨𝐟𝐭 𝐒𝐦𝐢𝐥𝐞 𝐓𝐨 𝐁𝐚𝐧𝐭𝐚 𝐇𝐚𝐢 🌞\n──── •💜• ────' },
    { time: '1:00 PM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 1:00 𝐏𝐌\n𝐋𝐮𝐧𝐜𝐡 𝐓𝐢𝐦𝐞—𝐊𝐮𝐜𝐡 𝐇𝐞𝐚𝐥𝐭𝐡𝐲 𝐊𝐡𝐚𝐨 🥗\n──── •💜• ────' },
    { time: '2:00 PM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 2:00 𝐏𝐌\n𝐋𝐢𝐠𝐡𝐭 𝐒𝐭𝐫𝐞𝐭𝐜𝐡, 𝐋𝐢𝐠𝐡𝐭 𝐒𝐦𝐢𝐥𝐞—𝐊𝐚𝐦 𝐂𝐡𝐚𝐥𝐭𝐚 𝐑𝐚𝐡𝐞 😊\n──── •💜• ────' },
    { time: '3:00 PM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 3:00 𝐏𝐌\n𝐓𝐡𝐨𝐝𝐢 𝐂𝐡𝐚𝐢/𝐂𝐨𝐟𝐟𝐞𝐞, 𝐓𝐡𝐨𝐝𝐚 𝐂𝐡𝐢𝐥𝐥 ☕\n──── •💜• ────' },
    { time: '4:00 PM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 4:00 𝐏𝐌\n𝐋𝐚𝐬𝐭 𝐏𝐮𝐬𝐡—𝐌𝐞𝐫𝐞 𝐂𝐡𝐚𝐦𝐩, 𝐘𝐨𝐮 𝐂𝐚𝐧 𝐃𝐨 𝐈𝐭 💫\n──── •💜• ────' },
    { time: '5:00 PM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 5:00 𝐏𝐌\n𝐇𝐚𝐫 𝐇𝐚𝐥 𝐌𝐞 𝐊𝐡𝐮𝐬𝐡 𝐑𝐞𝐡𝐧𝐚, 𝐌𝐞𝐫𝐚 𝐏𝐫𝐨𝐦𝐢𝐬𝐞 💜\n──── •💜• ────' },
    { time: '6:00 PM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 6:00 𝐏𝐌\n𝐄𝐯𝐞𝐧𝐢𝐧𝐠 𝐁𝐫𝐞𝐞𝐳𝐞, 𝐌𝐢𝐥𝐝 𝐖𝐚𝐥𝐤—𝐌𝐨𝐨𝐝 𝐋𝐢𝐠𝐡𝐭 🌇\n──── •💜• ────' },
    { time: '7:00 PM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 7:00 𝐏𝐌\n𝐇𝐚𝐫 𝐃𝐢𝐧 𝐓𝐮𝐦 𝐒𝐭𝐫𝐨𝐧𝐠, 𝐀𝐚𝐣 𝐁𝐡𝐢 𝐏𝐫𝐨𝐮𝐝 𝐎𝐟 𝐘𝐨𝐮 🫶\n──── •💜• ────' },
    { time: '8:00 PM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 8:00 𝐏𝐌\n𝐃𝐢𝐧𝐧𝐞𝐫 𝐓𝐢𝐦𝐞—𝐌𝐞𝐫𝐞 𝐋𝐢𝐞 𝐄𝐤 𝐒𝐦𝐢𝐥𝐞 𝐄𝐱𝐭𝐫𝐚 😋\n──── •💜• ────' },
    { time: '9:00 PM',  message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 9:00 𝐏𝐌\n𝐒𝐥𝐨𝐰 𝐃𝐨𝐰𝐧, 𝐇𝐞𝐚𝐫𝐭 𝐊𝐨 𝐏𝐞𝐚𝐜𝐞—𝐈𝐭𝐬 𝐎𝐤 💖\n──── •💜• ────' },
    { time: '10:00 PM', message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 10:00 𝐏𝐌\n𝐅𝐨𝐧𝐞 𝐃𝐮𝐫 𝐑𝐚𝐤𝐡𝐨, 𝐌𝐢𝐧𝐝 𝐑𝐞𝐬𝐭—𝐒𝐰𝐞𝐞𝐭 𝐃𝐫𝐞𝐚𝐦𝐬 🌙\n──── •💜• ────' },
    { time: '11:00 PM', message: '──── •💜• ────\n𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 11:00 𝐏𝐌\n𝐆𝐨𝐨𝐝 𝐍𝐢𝐠𝐡𝐭, 𝐌𝐞𝐫𝐢 𝐅𝐚𝐯, 𝐒𝐚𝐟𝐞 𝐑𝐞𝐬𝐭 🤍\n──── •💜• ────' }
];

module.exports.onLoad = ({ api }) => {
    console.log(chalk.bold.hex("#00c300")("============ SUCCESFULLY LOADED THE AUTOSENT COMMAND ============"));

    messages.forEach(({ time, message }) => {
        // Parse "H:MM AM/PM"
        const [h, mm, ap] = time.split(/[: ]/);
        let hour24 = parseInt(h, 10);
        const minute = parseInt(mm, 10);

        if (ap === 'PM' && h !== '12') hour24 += 12;
        if (ap === 'AM' && h === '12') hour24 = 0;

        // Schedule to run every day at that time in Asia/Kolkata
        const rule = new schedule.RecurrenceRule();
        rule.tz = 'Asia/Kolkata';
        rule.hour = hour24;
        rule.minute = minute;
        rule.second = 0;

        schedule.scheduleJob(rule, () => {
            if (!global.data || !Array.isArray(global.data.allThreadID)) return;
            global.data.allThreadID.forEach(threadID => {
                api.sendMessage(message, threadID, (error) => {
                    if (error) {
                        console.error(`Failed to send message to ${threadID}:`, error);
                    }
                });
            });
        });
    });
};

module.exports.run = () => {
    // Logic handled in onLoad
};
