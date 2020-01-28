const { serverName, teamName } = require('../config.json');
const fs = require("fs");

module.exports = {
	name: 'getplanning',
    description: 'renvoie votre planning de la smeaine courrante et suivante',
    args: false,
    usage: '',
	execute(message, args) {

        /* get the team role object */
        team = message.client.guilds.find(val => val.name === `${serverName}`).roles.find(val => val.name === `${teamName}`);

        // init player object
        let player = {};

        /* check if command caller is in the team */
        if(team.members.get(message.author.id))
        {
             /* check if author planning profile is not created yet */
            if(!fs.existsSync("data/"+ message.author.id + ".json"))
            {
                /* if not stop */
                return message.reply(`tu n'as pas encore de planning associé a ton profile ${message.author.tag}, commence par utiliser la commande !setplanning stp`)
            }

            /* print planning */
            const data = [];

            // Get content from file
            let contents = fs.readFileSync("data/"+ message.author.id + ".json");
            // Define to JSON type
            player = JSON.parse(contents);

            /* print the message with planning sumury */
            data.push(`Voici ton planning ${player.name} : \n`);
            data.push(`Semaine courante (M.a.j : ${player.curWeekUpdated})`);
            data.push(`lundi: ${player.curWeek[0]}, mardi: ${player.curWeek[1]}, mercredi: ${player.curWeek[2]}, jeudi: ${player.curWeek[3]}, vendredi: ${player.curWeek[4]}, samedi: ${player.curWeek[5]}, dimanche: ${player.curWeek[6]},\n`);
            data.push(`Semaine suivante : (M.a.j ${player.nextWeekUpdated})`);
            data.push(`lundi: ${player.nextWeek[0]}, mardi: ${player.nextWeek[1]}, mercredi: ${player.nextWeek[2]}, jeudi: ${player.nextWeek[3]}, vendredi: ${player.nextWeek[4]}, samedi: ${player.nextWeek[5]}, dimanche: ${player.nextWeek[6]},\n`);

            message.author.send(data, { split: true });
        }
        else
        {
            /* if not in the team then stop */
            return message.reply(`tu ne fais pas partie de la team \"${teamName}\" ${message.author.tag}, tu n\'as donc pas de planning :s`);
        }

    },
};