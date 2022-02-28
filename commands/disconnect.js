/**
 * Require modules
 * @requires
 */
const errorMessages = require('./../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

/**
 * kick mentionned player after a cointoss
 * @function
 * @param {String} interaction
 */
const disconnect = async (interaction) => {
	// check if the message was send to a discord server channel
	if (!interaction.inGuild()) return;

	// check if the discord server is available
	if (!interaction.guild.available) return;

	// check if the message author is member of the discord server
	const author = interaction.member;
	if (!author) return;

	// check if the user who use the command has the rights to do so
	if (!author.permissions.has(Permissions.FLAGS.MOVE_MEMBERS, false, true, true)) {
		interaction.reply(errorMessages.missingRights);
		return;
	}

	const disconnectedUser = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
	if (!disconnectedUser) return;

	if (disconnectedUser.voice.channel === null) {
		interaction.reply(`${disconnectedUser.user} n'est pas connecté au vocal`);
		return;
	}

	await interaction.reply('Pile c\'est kick, Face c\'est pas kick');
	const random = Math.floor(Math.random() * (1 - 0 + 1) + 0);
	if (random === 0) {
		interaction.followUp('Vous avez tiré PILE');
		disconnectedUser.voice.disconnect(null).then(() => {
			interaction.followUp(`${disconnectedUser.user} a été déconnecté`);
		}).catch(err => {
			interaction.followUp('Impossible de déconnecter l\'utilisateur. Je ne dois pas avoir les droits suffisants');
			console.error(err);
		});
	}
	else {
		interaction.followUp('Vous avez tiré FACE');
		interaction.followUp(`${disconnectedUser.user} n'a pas été déconnecté`);
	}
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('Je déconnecte la personne choisi avec 50% de chance')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('L\'utilisateur a essayer de deconnecter')
				.setRequired(true)),
	execute: disconnect,
};