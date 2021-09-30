const Discord = require('discord.js')
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You need permissions to manage the server in order to set a logging channel!")  
    if(args[0] == "off") {
        var LoggingChannels = JSON.parse(fs.readFileSync("./messageLogs.json"))
        delete LoggingChannels[message.guild.id]
        fs.writeFileSync('./messageLogs.json', JSON.stringify(LoggingChannels))
        return message.channel.send(`Successfully unset message logging channel!`)
    } else {
        var LoggingChannels = JSON.parse(fs.readFileSync("./messageLogs.json"))
        var channel = message.guild.channels.cache.find(channel => channel.name === `${args}`)
        if(!channel) return message.channel.send("Couldn't find a channel with that name! \nCorrect usage: `!messagelog <channel name> or off`")
        LoggingChannels[message.guild.id] = {
            channel: channel.id
        }
        fs.writeFileSync('./messageLogs.json', JSON.stringify(LoggingChannels))
        message.channel.send('Successfully set message logging channel as `' + channel.name + '`')        
    }
}


module.exports.help = {
    name: "messagelog",
    aliases: []
}
