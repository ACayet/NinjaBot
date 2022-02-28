const errorMessages = require('./../config.json');

const interactionCreate = async (interaction) => {
	// Interaction is not a command ?
	if (!interaction.isCommand()) return;

	// Every messages modules
	/* for (let [k, v] of bot.every) {
		v.execute(message);
	}*/

	// Get the corresponding interaction command
	const command = interaction.client.commands.get(interaction.commandName);

	// Command doesn't exist ?
	if (!command) return;

	// Execute the corresponding command
	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: errorMessages.eventHandlingFailed, ephemeral: true });
	}
};

module.exports = {
	name: 'interactionCreate',
	execute: interactionCreate,
};