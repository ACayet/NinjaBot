/**
 * Require modules
 * @requires
 */
const Discord = require('discord.js');
const urlStatusCode = require('url-status-code');
const httpStatusCode = require('http-status-codes');
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
        .then(async function (body) {
            if(body.stickers.length > 0) {
                
                let randomPic;
                let code;
                do {
                    
                    randomPic = Math.floor(Math.random() * Math.floor(body.stickers.length));
                    
                    //test status code l'url de l'image random
                    try {
                        code = await new Promise((resolve, reject) => {
                            urlStatusCode(body.stickers[randomPic].risibank_link, (error,statusCode) => {
                                if(error){
                                    reject(error);
                                } else {
                                    resolve(statusCode);
                                } 
                            })
                        })
                    } catch (err) {
                        logger.error(err);
                    }
                }while (code === httpStatusCode.NOT_FOUND)

                if(body.stickers[randomPic].risibank_link) {
                    
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
            logger.error(err)
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