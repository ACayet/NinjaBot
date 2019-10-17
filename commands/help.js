/**
 * Require modules
 * @requires
 */
const Discord = require('discord.js');
require('dotenv').config()

/**
 * Give informations about available commands
 * @param {String} message 
 * @param {Array[String]} args 
 * @param {Map} commands 
 */
const help = (message, args, commands) => {
    switch (args.length) {
        case 0:
            const allHelp = new Discord.RichEmbed()
                .setColor(process.env.BOTCOLOR)
                .setAuthor(`Regarde tout ce que je sais faire, je suis super intelligent ^_^`)
                
                //console.log(commands);
            allHelp.fields = commands.map(cmd => { return {
              
                name: `!${cmd.name}`, 
                value:  `${cmd.help.desc}\n**⇒** ${process.env.PREFIX}${cmd.name} ${cmd.help.format}`, 
                inline: true
                } 
            })            
            message.channel.send(allHelp);
            break;
        case 1:
            let command = commands.get(args[0]);
            if (!command) return message.channel.send(`La commande "${args[0]}" n'existe pas, je peux pas t'aider avec ça :expressionless:`);
            const singleHelp = new Discord.RichEmbed()
                .setColor(process.env.BOTCOLOR)
                .setAuthor(`Oh, tu veux utiliser ${command.name} ?`)
                .setDescription(`${command.help.desc}\n**⇒** ${process.env.PREFIX}${command.name} ${command.help.format}`)
            
            message.channel.send(singleHelp);
            break;
        default:
            message.channel.send(`Je ne peux aider que sur une seule commande à la fois :innocent:`);
    }
}

module.exports = {
    name: "help",
    help: {
        desc: "Je te liste et t'explique le fonctionnement des commandes. Si tu précises une commande particulière, je t'explique que celle-là, évidemment.",
        format: "[nom de la commande]"
    },
    args: false,
    mentions: false,
    execute: help
};