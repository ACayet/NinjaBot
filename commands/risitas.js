/**
 * Require modules
 * @requires
 */
const urlStatusCode = require('url-status-code');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();
const logger = require('winston');
const fetch = require('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

/**
 * Show a random risitas
 * @param {String} interaction
 */
const risitas = async (interaction) => {
	// Less efficient way to do with V1 of risibank API
	/*
	let result = [];
	await fetch(process.env.RISIBANKAPI + 'medias/search?query=' + interaction.options.getString('recherche') + '&page=1', { method: 'get' })
		.then(res => res.json())
		.then(json => result.push(json))
		.catch(err => logger.error(err));
	console.log(result);
	*/

	// Efficient way to do with DEPRECATED in JANUARY 2023 V0 of the risibank API
	fetch(process.env.RISIBANKAPIDEPRC + 'search?search=' + interaction.options.getString('recherche'), { method: 'get' })
		.then(res => res.json())
		.then(async body => {
			if (body.stickers.length > 0) {
				let randomPic;
				let code;
				do {
					randomPic = Math.floor(Math.random() * Math.floor(body.stickers.length));
					// test status code l'url de l'image random
					try {
						code = await new Promise((resolve, reject) => {
							urlStatusCode(body.stickers[randomPic].risibank_link, (error, statusCode) => {
								if (error) {
									reject(error);
								}
								else {
									resolve(statusCode);
								}
							});
						});
					}
					catch (err) {
						logger.error(err);
					}
				} while (code === StatusCodes.NOT_FOUND);

				if (body.stickers[randomPic].risibank_link) {
					const embed = new MessageEmbed()
						.setColor(process.env.BOTCOLOR)
						.setAuthor({ name: 'Un risitas aleatoire pour "' + interaction.options.getString('recherche') + '"', iconURL: '', url: body.stickers[randomPic].risibank_link })
						.setImage(body.stickers[randomPic].risibank_link);
					interaction.reply({ embeds: [embed] });

				}
				else {
					interaction.reply('Aucune photo trouvé pour ta recherche');
				}
			}
			else {
				interaction.reply('Aucune photo trouvé pour ta recherche');
			}
		})
		.catch(err => {
			console.log(err);
			interaction.reply('Probleme avec l\'api, veuillez ressayer');
		});
};


module.exports = {
	data: new SlashCommandBuilder()
		.setName('risitas')
		.setDescription('J\'affiche des risitas aleatoire depuis risibank')
		.addStringOption(option =>
			option.setName('recherche')
				.setDescription('le theme du sticker aleatoire a rechercher')
				.setRequired(true)),
	execute: risitas,
};