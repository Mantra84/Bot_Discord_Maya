/* Require */
const fs = require("fs");
const Discord = require('discord.js');
const { prefix, token, serverName, teamName } = require('./config.json');   

/* loading Client */
const client = new Discord.Client();

/* loading commands */
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

var team = {};

/* When ready */
client.on('ready', () => {
    
    /* get the team role object */
    team = client.guilds.find(val => val.name === `${serverName}`).roles.find(val => val.name === `${teamName}`);

    console.log(`Logged in as ${client.user.tag}!`);
});

/* Login  */
client.login(token);

/* On message command */
client.on('message', message => {
    /* Ignor Other Bot and Himself & ignore message without prefix*/
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    /* get arguments */
    const args = message.content.slice(prefix.length).split(/ +/);

    /* get command */
    const commandName = args.shift().toLowerCase();

    /* ignor if command doesn t exist */
    if (!client.commands.has(commandName)) return;

    /* get the command associated with the key commandName */
    const command = client.commands.get(commandName);

    /* check if the author have the right to use team reserved command */
    if(command.team && !team.members.has(message.author.id)) return message.reply(`tu ne fais pas partie de la team \"${teamName}\" ${message.author.tag}, tu ne peux donc pas utiliser la commande ${commandName}`);

    /* check if argument are needed */
    if (command.args && !args.length) {
        let reply = `Vous n'avez pas fournie d'arguments, ${message.author}!`;
        
        /* give the command usage */
        if (command.usage) {
		    reply += `\nUn bon usage serait: \`${prefix}${command.name} ${command.usage}\``;
	    }
		return message.channel.send(reply);
    }

    /* try to execute command */
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Il y a eu une erreur lors de l execution de votre commande ');
    }

  });
