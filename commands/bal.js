const commando = require("discord.js-commando")
const Discord = require('discord.js')
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
        var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
        var user = message.mentions.users.first()
        if(!user)
        {
            if(!UserJSON[message.author.id])
            {
                UserJSON[message.author.id] = {
                    bal: 50,
                    background: 1,
                    highestBG: 1
                }
                fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))            
            }
                const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`You currently have ${UserJSON[message.author.id].bal} 💸`)
                message.channel.send(embed)
        }
        else
        {
            if(!UserJSON[user.id])
            {
                UserJSON[user.id] = {
                    bal: 50,
                    background: 1,
                    highestBG: 1
                }
                fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))            
            }
                const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${user.username} currently has ${UserJSON[user.id].bal} 💸`)
                message.channel.send(embed)
        }
}


module.exports.help = {
    name: "bal",
    aliases: []
}
