const { serverName, teamName } = require('../config.json');
const fs = require("fs");

module.exports = {
	name: 'teamplanning',
    description: 'imprime le planning de la team',
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
            /* print the team planning */
            const data = [];
            data.push(`\`\`\`Voici le planning de la team : \"${teamName}\" (P=présent, A=absennt, N=ne sais pas)`);
            data.push(`                lun mar mer jeu ven sam dim`); //15 space

            /* get all player files */
            const planningFiles = fs.readdirSync('./data').filter(file => file.endsWith('.json'));
            for(const file of planningFiles) {
                // Get content from file
                let contents = fs.readFileSync(`data/${file}`);
                // Define to JSON type
                player = JSON.parse(contents);

                /* calculate space needed to aligne */
                let space = '';
                for (let index = player.name.length; index <= 15; index++) {
                    space = space + ' ';
                }

                /* if player havn't update his planning he will not be displayed */
                if(player.curWeekUpdated)
                {
                    data.push(`${player.name}${space}|${player.curWeek[0]}| |${player.curWeek[1]}| |${player.curWeek[2]}| |${player.curWeek[3]}| |${player.curWeek[4]}| |${player.curWeek[5]}| |${player.curWeek[6]}|`);
                }

            }
            /* finaly send the message */
            data.push(`\`\`\``);
            message.reply(data, { split: false });
        }
        else
        {
            /* if not in team then stop */
            return message.reply(`tu ne fais pas partie de la team \"${teamName}\" ${message.author.tag}, tu ne peux donc pas afficher le planning :s`);
        }

    },
};