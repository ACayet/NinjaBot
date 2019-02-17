/**
 * Insult mentionned player
 * @function
 * @param {String} message 
 */
const kick = message => {
    

    if (message.content.substring(0, 1) === process.env.PREFIX) {
   
        switch(cmd) {
            // !kick (coinside) [user]
            case 'kick':
                var sideCoin = args[0];
                args = args.splice(1);
                var username = message.mentions.users.first();
                kick(sideCoin,username,message);
            // Just add any case commands if you want to..
        }
    }
}
module.exports = {
    name: "kick",
    help: {
        desc: "J'insulte les personnes que tu mentionnes. Aussi simple que ça.",
        format: "[@mentions]"
    },
    args: true,
    mentions: true,
    execute: kick
};