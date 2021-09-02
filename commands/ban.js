const Discord = require("discord.js")
const commando = require("discord.js-commando")

module.exports.run = async (bot, message, args) => {
    let bannedUser = message.guild.member(message.mentions.users.first())
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return;
    if(!message.member.hasPermission("BAN_MEMBERS")) return;
    if(!bannedUser)
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
        await message.guild.member(bannedUser).ban({reason: reason})  
        await message.channel.send(`Successfully banned ${bannedUser}`)      
        } catch(err) {
            console.log(err)
    }
}

module.exports.help = {
    name: "ban",
    aliases: []
}
