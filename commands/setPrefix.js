const Discord = require("discord.js")
const commando = require("discord.js-commando")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You need permissions to manage guild in order to change the prefix!") 
        if(!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("Bot needs permissions to manage guild in order to change the prefix!") 
        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))
        prefixes[message.guild.id] = {
            prefixes: args[0]
        }
        fs.writeFileSync("./prefixes.json", JSON.stringify(prefixes))  
        const embed = new Discord.MessageEmbed()
        .setColor("#ffff00")
        .setTitle("Prefix Set!")
        .setDescription(`Set to ${args[0]}`)
        message.channel.send(embed)
}

module.exports.help = {
    name: "prefix",
    aliases: []
}
