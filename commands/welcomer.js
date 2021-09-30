const Discord = require("discord.js")
const commando = require("discord.js-commando")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
        if(args == "") return message.channel.send("Correct usage: `!welcomer <#channel>`")
        if(args[0] == "off") {
            var welcomes = JSON.parse(fs.readFileSync('./welcome.json'))
            delete welcomes[message.guild.id]
            fs.writeFileSync('./welcome.json', JSON.stringify(welcomes))
            return message.channel.send(`Successfully unset welcoming channel!`)
        } else {
            let messageArray = message.content.split(" ")
            let args1 = messageArray.slice(1)
            var welcomes = JSON.parse(fs.readFileSync('./welcome.json'))
            var channel = message.guild.channels.cache.find(channel => channel.name === `${args}`) || message.guild.channels.cache.get(args1[0].slice(2,20))
            if(!channel) return message.channel.send("Couldn't find a channel with that name! \nCorrect usage: `!welcomer <channel name> or off`")
            welcomes[message.guild.id] = {
                channel: channel.id
        }
        fs.writeFileSync("./welcome.json", JSON.stringify(welcomes))
        message.channel.send('Successfully set welcoming channel as `' + channel.name + '`')               
    }
}

module.exports.help = {
    name: "welcomer",
    aliases: ["welcome"]
}
