/**
 * Require modules
 * @requires
 */


/**
 * Show response time in ms
 * @function
 * @param {String} message
 */
const ping = message => {
    
    message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");
}

module.exports = {
    name: "ping",
    help: {
        desc: "J'affiche mon temps de reponse",
        format: ""
    },
    args: false,
    mentions: false,
    execute: ping
};