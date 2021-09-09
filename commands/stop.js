const commando = require("discord.js-commando")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("You must be in a voice channel to disconnect the bot")

    await bot.distube.stop(message)
    await message.channel.send("Successfully disconnected ✔️")
}


module.exports.help = {
    name: "stop",
    aliases: ["leave", "disconnect"]
}
