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
        if(args == "")
        return message.channel.send("Cu ce pariezi coaie")
        else if(args > UserJSON[message.author.id].bal)
        return message.channel.send("Restu platesti cu casa?")
        else
        {
            UserJSON[message.author.id].bal = UserJSON[message.author.id].bal - args
            fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
            var chance = Math.floor(Math.random() * 2) + 1
            if(chance == 1)
            {
                const embed = new Discord.MessageEmbed()
                .setColor("#00ff00")
                embed.setDescription(`Ai castigat ${args * 2} 💸, acuma mai pariaza o data sa ii pierzi pe toti`)
                message.channel.send(embed);
                UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + args * 2;
                fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))  
            }
            if(chance == 2)
            {
                const embed = new Discord.MessageEmbed()
                .setColor("#ff0000")
                if(args > 1)
                embed.setDescription(`Ai pierdut ${args} 💸 bemiai coaiele lmao`)
                else
                embed.setDescription(`Ai pierdut ${args} 💸 bemiai coaiele lmao`)
                message.channel.send(embed);
            }
        }
    }
}


module.exports.help = {
    name: "coinflip",
    aliases: []
}
