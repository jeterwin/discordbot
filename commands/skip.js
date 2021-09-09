const commando = require("discord.js-commando")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("You must be in a voice channel to skip")

    await bot.distube.skip(message)
    await message.channel.send("Skipped playing song!")
}


module.exports.help = {
    name: "skip",
    aliases: ["s"]
}
