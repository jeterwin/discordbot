const commando = require("discord.js-commando")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("You must be in a voice channel to pause the song")

    bot.distube.pause(message)
    message.channel.send("Successfully paused song!")
}


module.exports.help = {
    name: "pause",
    aliases: []
}
