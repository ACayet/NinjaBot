/**
 * Import modules and config
 * @requires
 */
const fs = require('fs');
const Discord = require('discord.js');
const logger = require('winston');
require('dotenv').config();

/**
 * Setup logger levels
 */
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true,
});
logger.level = 'debug';

// Creating Bot instance
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES] });

/**
 * Setup collections (command list, event listeners, daemon etc...)
 */
// Directories to crawl
const filesDir = ['commands', 'events', 'every'];

filesDir.forEach(function(dir) {
	const filesNames = fs.readdirSync(`./${dir}`).filter(file => file.endsWith('.js'));
	if (dir == 'events') {
		for (const file of filesNames) {
			const event = require(`./events/${file}`);
			if (event.once) {
				bot.once(event.name, (...args) => event.execute(...args));
			}
			else {
				bot.on(event.name, (...args) => event.execute(...args));
			}
		}
	}
	else {
		bot[dir] = new Discord.Collection();
		for (const fileName of filesNames) {
			const file = require(`./${dir}/${fileName}`);
			bot[dir].set(file.data.name, file);
		}
	}
});

bot.login(process.env.DISCORD_TOKEN);
