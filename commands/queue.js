const commando = require("discord.js-commando")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("Intra intr-un vc gayule")

    const queue = bot.distube.getQueue(message)
    if (!queue) {
        message.channel.send('Nothing playing right now!')
    } else {
        var embed = new Discord.MessageEmbed()
        .setDescription(`Current queue:\n${queue.songs.map((song, id) =>`**${id ? id : 'Now Playing: '}** ${song.name} - \`${song.formattedDuration}\``,).slice(0, 10).join('\n')}`)
        .setColor("#FFD700")
        message.channel.send(embed)
    }
}


module.exports.help = {
    name: "queue",
    aliases: ["q"]
}
