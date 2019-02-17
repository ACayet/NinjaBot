/**
 * Require modules
 * @requires
 */
const Discord = require('discord.js');
const errorMessages = require('./../config.json')

/**
 * kick mentionned player after a cointoss
 * @function
 * @param {String} message
 * @param {Array[String]} args 
 */
const kick = (message, args) => {
    //check if the message was send to a discord server channel
    if (!message.guild) return;

    //check if the discord server is available
    if (!message.guild.available) return;
    
    //check if the message author is member of the discord server
    const author = message.guild.member(message.author);
    if(!author) return;
 
    //check if the user who use the command has the rights to do so
    if (!author.hasPermission(Discord.Permissions.FLAGS.KICK_MEMBERS,false,true,true)) {
        message.channel.send(errorMessages.missingRights);
        return;
    }

    let sideCoin;
    console.log(args.length)
    switch (args.length) {
        case 1:
            message.mentions.users.map(user => {
                let kickedUser = message.guild.member(user);
                if(!kickedUser) return;

                sideCoin = "pile"
                let random = Math.floor(Math.random() * (1 - 0 + 1) + 0);

                if (random === 0){
                    message.channel.send("Vous avez tiré PILE")
                    kickedUser.kick('padpo au pile ou face').then(() =>{
                        message.channel.send(`${user.username} a été kick`)
                    }).catch(err => {
                        message.channel.send("Impossible de kick l'utilisateur. Je ne dois pas avoir les droits suffisants")
                        console.error(err);
                    });
                     
                } else {
                    message.channel.send("Vous avez tiré FACE")
                    message.channel.send(`${user.username} n\'a pas été kick`)
                }
            });
            break;
        case 2:
            message.mentions.users.map(user => {
                let kickedUser = message.guild.member(user);
                if(!kickedUser) return;

                sideCoin = args[0].toLowerCase();
                let random = Math.floor(Math.random() * (1 - 0 + 1) + 0);

                if (random === 0){
                    message.channel.send("Vous avez tiré PILE")
                    if(sideCoin == "pile"){
                        kickedUser.kick('padpo au pile ou face').then(() =>{
                            message.channel.send(`${user.username} a été kick`)
                        }).catch(err => {
                            message.channel.send("Impossible de kick l'utilisateur. Je ne dois pas avoir les droits suffisants")
                            console.error(err);
                        });
                    } else {
                        message.channel.send(`${user.username} n\'a pas été kick`)
                    }
                } else {
                    message.channel.send("Vous avez tiré FACE")
                    if(sideCoin == "face"){
                        kickedUser.kick('padpo au pile ou face').then(() =>{
                            message.channel.send(`${user.username} a été kick`)
                        }).catch(err => {
                            message.channel.send("Impossible de kick l'utilisateur. Je ne dois pas avoir les droits suffisants")
                            console.error(err);
                        });
                    } else {
                        message.channel.send(`${user.username} n\'a pas été kick`)
                    }
                }
            });
            break;
        default : 
            message.channel.send("Trop de pile ou de face")
            
    }
}

module.exports = {
    name: "kick",
    help: {
        desc: "Je kick la personne choisi avec 50% de chance",
        format: "[pile, face] [@mentions] (default : pile)"
    },
    args: false,
    mentions: true,
    execute: kick
};