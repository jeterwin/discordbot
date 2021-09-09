const commando = require("discord.js-commando")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("You must be in a voice channel to resume the song")

    bot.distube.resume(message)
    message.channel.send("Successfully resumed song!")
}


module.exports.help = {
    name: "resume",
    aliases: []
}
