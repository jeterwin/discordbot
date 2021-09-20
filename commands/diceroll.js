const Discord = require("discord.js")
const commando = require("discord.js-commando")
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
        if(args[0] == "" || isNaN(args[0]) || isNaN(args[1]))
        {
            return message.channel.send("Correct usage: `roll <number> <amount>`")
        }
        else if(args[1] > 12 && args[1] < 1)
        {
            return message.channel.send("You have to bet on a number between 1 and 12")
        }
        else if(args[1] > UserJSON[message.author.id].bal)
        {
            return message.channel.send("You don't have enough 💸!")
        }
        else
        {
            UserJSON[message.author.id].bal = UserJSON[message.author.id].bal - Math.abs(Math.ceil(args[1]))
            fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
            var number = Math.floor(Math.random() * 12) + 1
            message.channel.send('Rolling the dice...🎲🎲').then(msg => {
            if(number == Number(args[0]))
            {
                let embed = new Discord.MessageEmbed()
                .setDescription(`It rolled on number ${number}! Congratulations, you just won ${Math.abs(Math.ceil(args[1] * 5))} 💸!`)
                .setColor("RANDOM")
                setTimeout(function()
                    { 
                        msg.edit(embed);
                        message.channel.send(`You just won ${Math.abs(Math.ceil(args[1] * 5))} 💸!`)
                        UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.abs(Math.ceil(args[1] * 5))
                        fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
                }, 4000)
            }
            else
            {
                let embed = new Discord.MessageEmbed()
                .setDescription(`It rolled on number ${number}! Unlucky, try again next time!`)
                .setColor("RANDOM")
                setTimeout(function()
                    { 
                        msg.edit(embed); 
                }, 4000);
            }
        })
    }
}

module.exports.help = {
    name: "roll",
    aliases: []
}