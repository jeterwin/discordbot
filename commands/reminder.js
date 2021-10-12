const commando = require("discord.js-commando")
const Discord = require('discord.js')
const ms = require("ms")

module.exports.run = async (bot, message, args) => {
    let time = ms(args[0])
    if (!time || time > 1209600000)
    return message.channel.send('Please enter a length of time of 14 days or less (1s/m/h/d)')
    if(args == "")
    return message.channel.send("Correct usage:")
    message.channel.send(`${message.author}, successfully set a reminder!`)

    setTimeout(() => {
        message.channel.send(`**Reminder** ${message.author}: ${args.slice(1).join(" ")}`)
    }, time);
}


module.exports.help = {
    name: "remind",
    aliases: ["reminder"]
}
