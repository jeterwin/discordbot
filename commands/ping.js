const Discord = require('discord.js')
const command = require('discord.js-commando')

module.exports.run = async (bot, message, args) => {
    message.channel.send("Pinging...").then(m =>{
        var ping = m.createdTimestamp - message.createdTimestamp;

        var embed = new Discord.MessageEmbed()
        .setAuthor(`🏓 Your ping is ${ping}ms`)
        .setColor("Your Color")

        m.edit(embed)
    })
}


module.exports.help = {
    name: "ping",
    aliases: []
}
