const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.MessageEmbed()
    .setColor("#ffff00")
    .setTitle("This is my invite link")
    .setURL("https://discord.com/api/oauth2/authorize?client_id=490215988135067668&permissions=8&scope=bot")
    message.channel.send(embed)
}

module.exports.help = {
    name: "invite",
    aliases: ["inv"]
}
