/**
 * Require modules
 * @requires
 */
const { SlashCommandBuilder } = require('@discordjs/builders');


/**
 * Show response time in ms
 * @function
 * @param {String} message
 */
const ping = async (interaction) => {
	interaction.reply(`${interaction.client.ws.ping} ms`);
};

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Je reponds avec mon temps de reponse'),
	execute: ping,
};