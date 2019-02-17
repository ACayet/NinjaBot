/**
 * Require modules
 * @requires
 */
const Discord = require('discord.js');
require('dotenv').config()

/**
 * Show profile image
 * @function
 * @param {String} message
 */
const avatar = message => {
    message.mentions.users.map(user => {
        // Build embed
        const embed = new Discord.RichEmbed()
            .setColor(process.env.BOTCOLOR)
            .setAuthor(`Image de profil de ${user.username}`,'',user.displayAvatarURL)
            .setImage(user.displayAvatarURL)
        message.channel.send(embed);
    });
}

module.exports = {
    name: "avatar",
    help: {
        desc: "Je vais chercher les images de profil des gens que tu mentionnes.",
        format: "[@mention]"
    },
    args: true,
    mentions: true,
    execute: avatar
};