const Discord = require('discord.js');
var logger = require('winston');
require('dotenv').config()
const bot = new Discord.Client();

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

//log when our bot is ready to listen
bot.on('ready', function () {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username + ' - (' + bot.user.id + ')');
})

bot.on('message', message => {
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                
                message.reply('Salope !').catch(console.error);
            break;
            // Just add any case commands if you want to..
        }
    }
});
  
bot.login(process.env.DISCORD_TOKEN);