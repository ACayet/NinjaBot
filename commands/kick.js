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
const kick = async (interaction) => {
	// check if the message was send to a discord server channel
	if (!interaction.inGuild()) return;

	// check if the discord server is available
	if (!interaction.guild.available) return;

	// check if the message author is member of the discord server
	const author = interaction.member;
	if (!author) return;

	// check if the user who use the command has the rights to do so
	if (!author.permissions.has(Permissions.FLAGS.KICK_MEMBERS, false, true, true)) {
		interaction.reply(errorMessages.missingRights);
		return;
	}

	const kickedUser = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
	if (!kickedUser) return;

	await interaction.reply('Pile c\'est kick, Face c\'est pas kick');
	const random = Math.floor(Math.random() * (1 - 0 + 1) + 0);
	if (random === 0) {
		interaction.followUp('Vous avez tiré PILE');
		kickedUser.kick('padpo au pile ou face').then(() => {
			interaction.followUp(`${kickedUser.user.username} a été kick`);
		}).catch(err => {
			interaction.editReply('Impossible de kick l\'utilisateur. Je ne dois pas avoir les droits suffisants');
			console.error(err);
		});
	}
	else {
		interaction.followUp('Vous avez tiré FACE');
		interaction.followUp(`${kickedUser.user} n'a pas été kick`);
	}
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Je kick la personne choisi avec 50% de chance')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('L\'utilisateur a essayer de kick')
				.setRequired(true)),
	execute: kick,
};