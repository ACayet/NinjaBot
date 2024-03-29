const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

// Production deploy guild commands

rest.put(Routes.applicationCommands(process.env.BOTID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

// Testing deploy guild commands
/*
rest.put(Routes.applicationGuildCommands(process.env.BOTID, process.env.TESTGUILD), { body: [] })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
*/
