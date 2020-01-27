const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'liste de toutes les commandes ou informations a-propos de la command spécifié.',
    usage: '[nom de la commande]',
    args: false, //with and without arg
	cooldown: 5,
	execute(message, args) {
		const data = [];
        const { commands } = message.client; //access client object throught message

        /* if no arg then display all commands */
        if (!args.length) {
            data.push('Ici la liste de toutes mes commandes:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nVous pouvez envoyer \`${prefix}help [nom de la commande]\` pour avoire des informations sur commande!`);
            
            return message.author.send(data, { split: true })
            /* check if DM are allowed */
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('Je vous ai envoyé un DM avec tout mes commandes!');
            })
            .catch(error => {
                console.error(`Je n'ai pas pu envoyer un DM à ${message.author.tag}.\n`, error);
                message.reply('Il semble que je n\' ai pas pu vous envoyer de DM ! Vos DM son-t-il desactivé ?');
            });
        }
        /* else display the help for the command specified */
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        
        /* check if command exist */
        if (!command) {
            return message.reply('ce n\'est pas un argument valide pour la commade help!');
        }
        
        /* creat the message */
        data.push(`**Nom:** ${command.name}`);
        
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        
        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
        
        message.author.send(data, { split: true });
	},
};