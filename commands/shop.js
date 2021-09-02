const commando = require('discord.js-commando')
const Discord = require('discord.js')
const pagination = require('discord.js-pagination')
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
        var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
        var PricesJSON = JSON.parse(fs.readFileSync("./prices.json"))
        if(!UserJSON[message.author.id])
        {
            UserJSON[message.author.id] = {
                bal: 50,
                background: 1,
                highestBG: 1
            }
            fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
        }
        if(args == "")
        {
            const page1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Available backgrounds")
            .addField("1. Japanese Garden", "Price: Free")
            .addField("2. Purple", "Price: 50")
            .addField("3. Green", "Price: 75")
            .addField("4. Yellow", "Price: 125")
            .addField("5. Pink", "Price: 175")
            .setTimestamp()

            const page2 = new Discord.MessageEmbed()
            .setTitle("Pagina 2")

            const pages = [
                page1,
                page2
            ]
            const emoji = ["◀️", "▶️"]
            const timeout = '100000'
    
            return pagination(message, pages, emoji, timeout)
        }
        if(args[0] == "buy")
        {
            try
            {
                if(UserJSON[message.author.id].highestBG == args[1])  {
                    return message.channel.send("You already have that background!")
                } else if(args[1] - UserJSON[message.autor.id].highestBG > 2) {
                    return message.channel.send("You have to buy the background before that")
                }
                else if(UserJSON[message.author.id].bal >= PricesJSON[`background-${args[1]}`].price)
                {
                    UserJSON[message.author.id].bal = UserJSON[message.author.id].bal - PricesJSON[`background-${args[1]}`].price
                    UserJSON[message.author.id].background = Number(args[1])
                    UserJSON[message.author.id].highestBG = Number(args[1])
                    fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
                    message.channel.send(`Successfully bought background ${args[1]}`)
                }
                else
                return message.channel.send("Nu iti permiti fundalu muistule")             
            } 
            catch(err)
            {
                return message.channel.send("Ba orbete, nu avem que in stoc")
            }
        }
        else
        message.channel.send("Lmao nu mere asa bisnitare")
}


module.exports.help = {
    name: "shop",
    aliases: []
}
