const Discord = require('discord.js')
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    if(args[0] == "off") {
        var LoggingChannels = JSON.parse(fs.readFileSync("./serverLogs.json"))
        delete LoggingChannels[message.guild.id]
        fs.writeFileSync('./serverLogs.json', JSON.stringify(LoggingChannels))
        return message.channel.send(`Successfully unset server logging channel!`)
    } else {
        var LoggingChannels = JSON.parse(fs.readFileSync("./serverLogs.json"))
        var channel = message.guild.channels.cache.find(channel => channel.name === `${args}`)
        if(!channel) return message.channel.send("Couldn't find a channel with that name! \nCorrect usage: `!serverlog <channel name> or off`")
        LoggingChannels[message.guild.id] = {
            channel: channel.id
        }
        fs.writeFileSync('./serverLogs.json', JSON.stringify(LoggingChannels))
        message.channel.send('Successfully set server logging channel as `' + channel.name + '`')        
    }

}


module.exports.help = {
    name: "serverlog",
    aliases: []
}
