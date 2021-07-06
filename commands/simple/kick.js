const commando = require("discord.js-commando")

class KickCommand extends commando.Command
{
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'admin',
            memberName: 'kick',
            description: "da",
            clientPermissions: ['KICK_MEMBERS'],
			userPermissions: ['KICK_MEMBERS']
        });
    }

    async run(message, args)
    {
        let kickedUser = message.guild.member(message.mentions.users.first())
        if(!kickedUser)
        {
            try {
                await message.reply("No user found");
                } catch(err) {
                    console.log(err)
                }
            return;
        }
            try {
                await message.channel.send("Boss stai si crapa lemne in continuare")
                } catch(err) {
                    console.log(err)
                }

        let words = args.split(' ');
        let reason = words.slice(1).join(" ")
        try {
            await message.guild.member(kickedUser).kick({ reason: reason })  
            await message.channel.send(`Successfully kicked ${bannedUser}`)      
            } catch(err) {
                console.log(err)
        }
    }
}

module.exports = KickCommand;