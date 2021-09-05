const Discord = require('discord.js')
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
        var LoggingChannels = JSON.parse(fs.readFileSync("./logs.json"))
        var channel = message.guild.channels.cache.find(channel => channel.name === `${args}`)
        if(!channel) return message.channel.send("Couldn't find a channel with that name! \nCorrect usage: `!log <channel name>`")
        LoggingChannels[message.guild.id] = {
            channel: channel.id
        }
        fs.writeFileSync('./logs.json', JSON.stringify(LoggingChannels))
        message.channel.send('Successfully set loging channel as `' + channel.name + '`')
}


module.exports.help = {
    name: "log",
    aliases: []
}
