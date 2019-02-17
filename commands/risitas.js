/**
 * Require modules
 * @requires
 */
const Discord = require('discord.js');
require('dotenv').config()

/**
 * Show a random risitas
 * @param {String} message 
 * @param {Array[String]} args 
 */
const risitas = (message, args) => {

}


module.exports = {
    name: "risitas",
    help: {
        desc: "J'affiche des risitas aleatoire depuis risibank",
        format: ""
    },
    args: false,
    mentions: false,
    execute: risitas
};