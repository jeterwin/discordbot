const commando = require("discord.js-commando")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("Intra intr-un vc gayule")

    await bot.distube.stop(message)
    await message.channel.send("Gata bos am inteles ✔️")
}


module.exports.help = {
    name: "stop",
    aliases: ["leave", "disconnect"]
}
