const Discord = require("discord.js")
const commando = require("discord.js-commando")

module.exports.run = async (bot, message, args) => {
    let kickedUser = message.guild.member(message.mentions.users.first())
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return;
    if(!message.member.hasPermission("KICK_MEMBERS")) return;
    if(!kickedUser)
    {
        try {
            await message.reply("No user found");
            } catch(err) {
                console.log(err)
            }
        return;
    }
    let reason = args.slice(1).join(" ")
    try {
        await message.guild.member(kickedUser).kick({ reason: reason })  
        await message.channel.send(`Successfully kicked ${kickedUser}`)      
        } catch(err) {
            console.log(err)
    }
}

module.exports.help = {
    name: "kick",
    aliases: []
}