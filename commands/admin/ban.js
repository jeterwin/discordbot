const commando = require("discord.js-commando")

class BanCommand extends commando.Command
{
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'admin',
            memberName: 'ban',
            description: "dab",
            clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS']
        })
    }

    async run(message, args)
    {
        let bannedUser = message.guild.member(message.mentions.users.first())
        if(!bannedUser)
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
            await message.guild.member(bannedUser).ban({reason: reason})  
            await message.channel.send(`Successfully banned ${bannedUser}`)      
            } catch(err) {
                console.log(err)
        }
    }
}

module.exports = BanCommand;