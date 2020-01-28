module.exports = {
	name: 'reload',
    description: 'recharge les commandes',
    args: true,
    team: true,
    usage: '[nom de la commande]',
	execute(message, args) {
        /* get commandeName then commandeObject */
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        /* check if the command asked exist */
        if (!command)
            return message.channel.send(`Il n'y a pas de commande \`${commandName}\`, ${message.author}!`);

        /* remove require commands from the cache */
        delete require.cache[require.resolve(`./${commandName}.js`)];

        /* reload commands */
        try {
            const newCommand = require(`./${commandName}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } catch (error) { 
            console.log(error);
            message.channel.send(`Il y a eu une erreur lors du rechargement de la commande \`${commandName}\`:\n\`${error.message}\``);
        }

        /* send message */
        message.channel.send(`Commande \`${commandName}\` à était rechargé!`);
	},
};