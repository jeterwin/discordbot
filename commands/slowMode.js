const Discord = require("discord.js")
const commando = require("discord.js-commando")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.channel.send("You don't have the permission to manage channels")
    if(args[0] == "" || isNaN(args[0])) {
    return message.channel.send("Invalid slowmode time")            
    } else {
        message.channel.setRateLimitPerUser(args[0]);
        message.channel.send(`Slowmode set to ${args[0]}`)
    }
}

module.exports.help = {
    name: "slowmode",
    aliases: []
}
