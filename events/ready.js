const logger = require('winston');

const ready = (bot) => {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.user.username + ' - (' + bot.user.id + ')');
	bot.user.setPresence({
		status: 'online',
		activities: [{
			name: '/help',
			type: 'PLAYING',
		}],
	});
};

module.exports = {
	name: 'ready',
	once: true,
	execute: ready,
};