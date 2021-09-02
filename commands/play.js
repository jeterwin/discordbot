const commando = require("discord.js-commando")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("Intra intr-un vc gayule")

    const music = args.join(" ")
    if(!music) return message.channel.send("Ce dedicatie vrei ma muie")

    await bot.distube.play(message, music)
}


module.exports.help = {
    name: "play",
    aliases: ["p"]
}
