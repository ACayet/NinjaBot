/**
 * Import modules and config
 * @requires
 */
const fs = require('fs');
const Discord = require('discord.js');
var logger = require('winston');
require('dotenv').config()
const errorMessages = require('./config.json')

/**
 * Setup collections
 */
const bot = new Discord.Client();
const filesDir = ['commands'];

filesDir.forEach(function (dir) {
  const filesNames = fs.readdirSync(`./${dir}`).filter(file => file.endsWith('.js'));
  bot[dir] = new Discord.Collection();
  for (const fileName of filesNames) {
    const file = require(`./${dir}/${fileName}`);
    bot[dir].set(fileName.split('.js')[0], file);
  }
});

/**
 * Setup logger levels
 */
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

/**
 * Ready events
 * @event
 */
bot.on('ready', function () {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username + ' - (' + bot.user.id + ')');
    bot.user.setPresence({
        status: 'online',
        game: {
          name: 'ouloulou',
          type: 'PLAYING'
        }
    }).catch(console.error);
    logger.info(errorMessages.missingArguments);
})

/**
 * Message event
 * @event
 */
bot.on('message', message => {
    // Exit if bot message
    if (message.author.bot) return;

    // Every messages modules
    //for (let [k, v] of bot.every) {
    //    v.execute(message);
    //}

    // Exit if no prefix
    if (!message.content.startsWith(process.env.PREFIX)) return;

    // Get args and commandName
    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Get the corresponding command
    let command = bot.commands.get(commandName);

    // Wrong command name ?
    if (!command) return message.channel.send(errorMessages.wrongCommand);
    // Missing arguments ?
    if (command.args && !args.length) return message.channel.send(errorMessages.missingArguments);
    // Missing mentions ?
    if (command.mentions && !message.mentions.users.size) return message.channel.send(errorMessages.missingMentions);

    // Execute the corresponding module
    try {
        if (command.name === "help") command.execute(message, args, client.commands);
        else command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.channel.send(errorMessages.catchedError);
    }

});
  
bot.login(process.env.DISCORD_TOKEN);
