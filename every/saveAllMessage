/**
 * Require modules
 * @requires
 */
const fs = require('fs');
const appendFile = require('./../utils/appendFile.js');
require('dotenv').config();

/**
 * Save all messages
 * @function
 * @param {String} message
 */
const saveAllMessages = message => {
    const filePath = `${process.env.MAINPATH}/sources/message-saves`;
    const author = message.author;
    const content = message.content.trim();
    const separator = '\r\n[--------------message-separator--------------]\r\n';
    // Save message
    appendFile(filePath, [`${author.username} (${author.id}):\r\n${content}`], separator, message.channel);
}

module.exports = {
    name: "saveAllMessages",
    execute: saveAllMessages
};