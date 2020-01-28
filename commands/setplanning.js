const { serverName, teamName } = require('../config.json');
const fs = require("fs");

module.exports = {
	name: 'setplanning',
    description: 'definie son planning de présence',
    args: true,
    usage: '[semaine], [lundi], [mardi], [mercredi], [jeudi], [vendredi], [sammedi], [dimanche] - Arg0[semaine]: C= semaine courante et N= semaine suivante. - Arg1-7[jours]: A = Absent, P = Present, N = ne sais pas',
	execute(message, args) {

        /* get the team role object */
        team = message.client.guilds.find(val => val.name === `${serverName}`).roles.find(val => val.name === `${teamName}`);

        // init player object
        let player = {};

        /* check if command caller is in the team */
        if(team.members.get(message.author.id))
        {
            /* check good arguments number */
            if(args.length != 8)
            {
                return message.reply(`mauvais nombre d'arguments, 8 arguments attendue, ${args.length} fournie. exemple : !setplanning C P A P A N A P`);
            }
            /* check first argument */
            if(args[0].toLowerCase() != 'c' && args[0].toLowerCase() != 'n')
            {
                return message.reply(`votre permmier argument n'est pas bon. seule les valeurs \"C\" et \"N\" sont admisent`);
            }
            /* check the days argument. second to 8th arg */
            for (let index = 1; index < 8; index++) {
                if(args[index].toLowerCase() != 'p' && args[index].toLowerCase() != 'a' && args[index].toLowerCase() != 'n')
                {
                    return message.reply(`votre ${index}em argument n'est pas bon. seule les valeurs \"A\", \"P\" et \"N\" sont admisent`);
                }
            }

            /* check if author planning profile is not created yet */
            if(!fs.existsSync("data/"+ message.author.id + ".json"))
            {
                //init Json file if not existing
                player.name = message.author.tag;
                player.curWeekUpdated = false;
                player.curWeek = ['N','N','N','N','N','N','N'];
                player.nextWeekUpdated = false;
                player.nextWeek = ['N','N','N','N','N','N','N'];

                let data = JSON.stringify(player);

                fs.writeFileSync("data/"+ message.author.id + ".json", data);
            }
            
            /* update the author planning profile */
            // Get content from file
            let contents = fs.readFileSync("data/"+ message.author.id + ".json");
            // Define to JSON type
            player = JSON.parse(contents);
            player.name = message.author.tag;

            if(args[0].toLowerCase() == 'c')
            {
                player.curWeekUpdated = true;
                player.curWeek = [args[1].toLowerCase(),args[2].toLowerCase(),args[3].toLowerCase(),args[4].toLowerCase(),args[5].toLowerCase(),args[6].toLowerCase(),args[7].toLowerCase()];
            }
            else
            {
                player.nextWeekUpdated = true;
                player.nextWeek = [args[1].toLowerCase(),args[2].toLowerCase(),args[3].toLowerCase(),args[4].toLowerCase(),args[5].toLowerCase(),args[6].toLowerCase(),args[7].toLowerCase()];
            }
    
            let data = JSON.stringify(player);

            fs.writeFileSync("data/"+ message.author.id + ".json", data);

            return message.reply(`Ton planning à bien était mis à jours ${message.author.tag} merci !`);
        }
        else
        {
            /* if not in the team then stop */
            return message.reply(`tu ne fais pas partie de la team \"${teamName}\" ${message.author.tag}, tu ne peux donc pas regler ton planning :s`);
        }
	},
};
