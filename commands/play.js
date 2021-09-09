const commando = require("discord.js-commando")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("You must be in a voice channel to play songs")

    const music = args.join(" ")
    if(!music) return message.channel.send("You can play a song by url, title or even a whole playlist!")

    await bot.distube.play(message, music)
}


module.exports.help = {
    name: "play",
    aliases: ["p"]
}
