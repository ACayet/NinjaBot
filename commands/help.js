/**
 * Require modules
 * @requires
 */
const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * Give informations about available commands
 * @param {String} interaction
 */
const help = (interaction) => {
	const helpEmbed = new MessageEmbed()
		.setColor(process.env.BOTCOLOR)
		.setAuthor({ name:'Voici la liste de toutes les commandes disponibles : ' });

	let arg;
	interaction.client.commands.forEach(cmd => {
		console.log(cmd.data.options[0]);
		if (cmd.data.options[0] === undefined) {
			arg = '';
		}
		else if (cmd.data.options[0].type === 3) {
			arg = 'String';
		}
		else if (cmd.data.options[0].type === 6) {
			arg = '@user';
		}
		else {
			arg = '';
		}
		helpEmbed.addField(`/${cmd.data.name}` + ` ${arg}`, `${cmd.data.description}`, false);
	});
	interaction.reply({ embeds: [helpEmbed] });

	/*
		const command = commands.get(args[0]);
		if (!command) return message.channel.send(`La commande "${args[0]}" n'existe pas, je peux pas t'aider avec ça :expressionless:`);
		const singleHelp = new Discord.RichEmbed()
			.setAuthor(`Oh, tu veux utiliser ${command.name} ?`)
			.setDescription(`${command.help.desc}\n**⇒** ${process.env.PREFIX}${command.name} ${command.help.format}`);
		message.channel.send(singleHelp);
		break;
	*/
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Je reponds avec ce que je peux faire'),
	execute: help,
};