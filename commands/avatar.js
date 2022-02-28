/**
 * Require modules
 * @requires
 */
require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

/**
 * Show profile image
 * @function
 * @param {String} interaction
 */
const avatar = interaction => {
	const user = interaction.options.getUser('user');
	// Build embed
	const embed = new MessageEmbed()
		.setColor(process.env.BOTCOLOR)
		.setAuthor({ name: `Image de profil de ${user.username}`, iconURL: '', url: user.displayAvatarURL() })
		.setImage(user.displayAvatarURL() + '?size=2048');
	interaction.reply({ embeds: [embed] });
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Je vais chercher les images de profil des gens que tu mentionnes.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('L\'utilisateur avec l\'avatar a afficher')
				.setRequired(true)),
	execute: avatar,
};