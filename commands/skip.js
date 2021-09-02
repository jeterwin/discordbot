const commando = require("discord.js-commando")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("Intra intr-un vc gayule")

    await bot.distube.skip(message)
    await message.channel.send("Gata merem la urmatoarea")
}


module.exports.help = {
    name: "skip",
    aliases: ["s"]
}
