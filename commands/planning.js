/*

// get server object (HORNET SERV)
serv = client.guilds.find("name", "HORNET");

//get Role object (HORNET ROLE)
hornetRole = serv.roles.find("name", "Hornet Team");


// Planning management
function UpdatePlanningJson(MemberValue, curWeekValue, nextWeekValue) 
{
        console.log(MemberValue.user.username);
        console.log(MemberValue.user.id);

        // init player object
        let player = {};

        if(fs.existsSync(MemberValue.user.id + ".json"))
        {
            // Get content from file
            let contents = fs.readFileSync(MemberValue.user.id + ".json");
            // Define to JSON type
            player = JSON.parse(contents);
            player.name = MemberValue.user.username;
            player.curWeekUpdated = true;
            player.curWeek = [1,1,1,1,1,1,1];
    
            let data = JSON.stringify(player);

            fs.writeFileSync(MemberValue.user.id + ".json", data);

            console.log("file already created");
        }
        else
        {
            //init Json file if not existing
            player.name = MemberValue.user.username;
            player.curWeekUpdated = false;
            player.curWeek = [0,0,0,0,0,0,0];
            player.nextWeekUpdated = false;
            player.nextWeek = [0,0,0,0,0,0,0];

            let data = JSON.stringify(player);

            fs.writeFileSync(MemberValue.user.id + ".json", data);
            console.log("file Not created yet, created now");
        }
};

*/