const commando = require("discord.js-commando")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("Intra intr-un vc gayule")

    const queue = bot.distube.getQueue(message)
    if (!queue) {
        var embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Nothing playing right now!')
        .setTimestamp()
        message.channel.send(embed)
    } else {
        const mode = bot.distube.setRepeatMode(message)
        var embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Set repeat mode to \`${mode ? mode === 2 ? 'All Queue' : 'This Song' : 'Off'}\``)
        .setTimestamp()
		message.channel.send(embed)
    }
}


module.exports.help = {
    name: "loop",
    aliases: []
}
