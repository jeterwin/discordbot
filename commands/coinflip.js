const commando = require("discord.js-commando")
const Discord = require('discord.js')
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
    if(!UserJSON[message.author.id])
    {
        UserJSON[message.author.id] = {
            bal: 50,
            background: 1,
            highestBG: 1
        }
        fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))            
    }
    else
    {
        if(args == "" || isNaN(args))
        return message.channel.send("Correct usage: `!coinflip <bet amount>`")
        else if(args > UserJSON[message.author.id].bal)
        return message.channel.send("You don't have enough balance!")
        else {
            UserJSON[message.author.id].bal = UserJSON[message.author.id].bal - Math.abs(Math.ceil(args))
            fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
            var chance = Math.floor(Math.random() * 2) + 1
            if(chance == 1) {
                const embed = new Discord.MessageEmbed()
                .setColor("#00ff00")
                embed.setDescription(`You won ${Math.abs(Math.ceil(args * 2))} 💸!`)
                message.channel.send(embed);
                UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.abs(Math.ceil(args * 2))
                fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))  
            } else {
                const embed = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`You lost ${Math.abs(Math.ceil(args))} 💸, try again!`)
                message.channel.send(embed);
            }
        }
    }
}


module.exports.help = {
    name: "coinflip",
    aliases: []
}
