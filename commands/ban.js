const Discord = require("discord.js")
const commando = require("discord.js-commando")
module.exports.run = async (bot, message, args) => {
    let bannedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0])
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need permissions to ban members!")
    if(!bannedUser)
    {
        try {
        await message.reply("No user found");
        } catch(err) {
            console.log(err)
        }
        return;
    }

    const reason = args[1] || "There was no reason!";
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
