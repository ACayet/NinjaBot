/**
 * Require modules
 * @requires
 */
const Discord = require('discord.js');
require('dotenv').config()
var logger = require('winston');
const rp = require('request-promise');

/**
 * Show a random risitas
 * @param {String} message 
 * @param {Array[String]} args 
 */
const risitas = (message, args) => {
    
    let options;

    options = {
        method: 'POST',
        uri: process.env.RISIBANKAPI,
        body: {
            search: args[0]
        },
        json: true
    };
    rp(options)
        .then(function (body) {
            if(body.stickers.length > 0) {
                let randomPic = Math.floor(Math.random() * Math.floor(body.stickers.length));
                
                if(body.stickers[randomPic].risibank_link) {
                    logger.info(body.stickers[randomPic].risibank_link)
                    //TODO : check if url exist and isnt 404 not found
                    message.channel.send("Un risitas aleatoire pour "+ args[0], {
                        file: body.stickers[randomPic].risibank_link
                    });
                } else {
                    message.channel.send("Aucune photo trouvé pour ta recherche");
                }
            } else {
                message.channel.send("Aucune photo trouvé pour ta recherche");
                
            }
        })
        .catch(function (err) {
            logger.error(err);
            //console.log(err);
            message.channel.send("Probleme avec l'api, veuillez ressayer");
        });

}


module.exports = {
    name: "risitas",
    help: {
        desc: "J'affiche des risitas aleatoire depuis risibank",
        format: "[mot-clé]"
    },
    args: true,
    mentions: false,
    execute: risitas
};