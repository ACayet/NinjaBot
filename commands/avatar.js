/**
 * Show profile image
 * @function
 * @param {String} message
 */
const avatar = message => {
    message.mentions.users.map(user => {
        // Build embed
        const embed = {
            color: 0xEF6650,
            author: {
                name: `Image de profil de ${user.username}`,
                
                url: user.displayAvatarURL,
            },
            image: {
                url: user.displayAvatarURL,
            }
        };
        // Send embed
        message.channel.send({ embed: embed });
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