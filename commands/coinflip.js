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
        if(args == "" || isNaN(args[1]) || args[0] == "")
        return message.channel.send("Correct usage: `!coinflip <heads | tails> <bet amount>`")
        else if(args[1] > UserJSON[message.author.id].bal)
        return message.channel.send("You don't have enough balance!")
        else {
            UserJSON[message.author.id].bal = UserJSON[message.author.id].bal - Math.abs(Math.ceil(args[1]))
            fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
            var answers = ["heads", "tails"]
            var chance = answers[Math.floor(Math.random() * answers.length)]

            if(chance == "heads" && args[0] == "heads") {
                const embed = new Discord.MessageEmbed()
                .setColor("#00ff00")
                .setDescription(`The coin landed on heads and you just won ${Math.abs(Math.ceil(args[1] * 2))} 💸!`)
                message.channel.send(embed);
                UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.abs(Math.ceil(args[1] * 2))
                fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))  
            } else if(chance == "tails" && args[0] == "tails") {
                const embed = new Discord.MessageEmbed()
                .setColor("#00ff00")
                .setDescription(`The coin landed on tails and you just won ${Math.abs(Math.ceil(args[1] * 2))} 💸!`)
                message.channel.send(embed);
                UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.abs(Math.ceil(args[1] * 2))
                fs.writeFileSync("./bani.json", JSON.stringify(UserJSON)) 
            }
            else
            {
                const embed = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`The coin landed on ${chance}, you lost ${Math.abs(Math.ceil(args[1]))} 💸, try again!`)
                message.channel.send(embed);
            }
        }
    }
}


module.exports.help = {
    name: "coinflip",
    aliases: []
}
