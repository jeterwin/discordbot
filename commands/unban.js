const Discord = require("discord.js")
const commando = require("discord.js-commando")
module.exports.run = async (bot, message, args) => {
    let toUnban = await bot.users.fetch(args[0])
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need permissions!") 
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Bot need permissions!") 
    if(!toUnban)
    {
        try {
        await message.reply("No user found");
        } catch(err) {
            console.log(err)
            message.channel.send("The user is not banned!")
        }
        return;
    }
    const reason = args[1] || "There was no reason!";
    try {
        message.guild.members.unban(toUnban, reason)
        message.channel.send(`${toUnban} has been unbanned from the server!`)     
        } catch(err) {
            console.log(err)
    }
}

module.exports.help = {
    name: "unban",
    aliases: []
}
