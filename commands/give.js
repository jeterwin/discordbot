const commando = require("discord.js-commando")
const Discord = require('discord.js')
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
    var user = message.mentions.users.first()
    if(!UserJSON[message.author.id])
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
    }

    if(!user) {
        return message.channel.send("Correct usage: `!give <@user> <amount>`")
    } else {
        if(!UserJSON[user.id]) {
            UserJSON[user.id] = {
                bal: 50,
                background: 1,
                highestBG: 1
            }
            fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
        }
        if(args[1] > UserJSON[message.author.id].bal)
        {
            return message.channel.send("You don't have enough balance!")
        }
        else
        {
         UserJSON[message.author.id].bal = UserJSON[message.author.id].bal - Number(args[1])
         UserJSON[user.id].bal = UserJSON[user.id].bal + Number(args[1])
         message.channel.send(`Successfully gave ${user.username} ${args[1]} 💸!`)
         fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
        }
    }
}


module.exports.help = {
    name: "give",
    aliases: []
}
