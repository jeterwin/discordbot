const Discord = require("discord.js")
const commando = require("discord.js-commando")
const { antijoin } = require("../Collection/index")

module.exports.run = async (bot, message, args) => {
    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send("You require admin permissions to activate antiraid mode")

    const query = args[0].toLowerCase()
    if(!query) return message.reply("Correct usage: `!antiraid on | off | list`")

    if(query == 'on') {
        const getCollection = antijoin.get(message.guild.id)
        if(getCollection) return message.reply("Antiraid is already enabled")

        antijoin.set(message.guild.id, [])
        message.reply("Antiraid mode on")
    } else if(query == 'off') {
        const getCollection = antijoin.get(message.guild.id)
        if(!getCollection) return message.reply("Antiraid is already disabled")
        antijoin.delete(message.guild.id)
        message.reply("Turned off antiraid system")
    } else if(query == 'list') {
        const getCollection = antijoin.get(message.guild.id)
        if(!getCollection) return message.reply("Antiraid is disabled")

        message.reply(
            `Kicked Members: ${getCollection.map((value) => {
                return `${value.tag} (${value.id})`
            })}`
        )
    }
}

module.exports.help = {
    name: "antiraid",
    aliases: []
}
