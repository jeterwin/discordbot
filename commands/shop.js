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
            .setTitle("Available backgrounds")
            .setColor("RANDOM")
            .addField("1. Japanese Garden 🖼️", "Price: Free")
            .addField("2. Sidelines 🖼️", "Price: 50")
            .addField("3. Talent Ransom 🖼️", "Price: 75")
            .addField("4. Equilateral 🖼️", "Price: 125")
            .addField("5. Hidden Forest 🖼️", "Price: 200")
            .setTimestamp()

            const page2 = new Discord.MessageEmbed()
            .setTitle("Available backgrounds")
            .setColor("RANDOM")
            .addField("6. Intertwine 🖼️", "Price: 300")
            .addField("7. Color Splatter 🖼️", "Price: 650")
            .addField("8. Grainy Floor 🖼️", "Price: 1000")
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
                if(args[1] <= UserJSON[message.author.id].highestBG) {
                    return message.channel.send("You already have that background!")
                } else if(args[1] - UserJSON[message.author.id].highestBG > 1) {
                    return message.channel.send("You have to buy the backgrounds before that one!")
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
                return message.channel.send("You do not have enough balance for that background!")             
            } 
            catch(err)
            {
                return message.channel.send("That background does not exist yet")
            }
        }
        else
        message.channel.send("Something went wrong!")
}


module.exports.help = {
    name: "shop",
    aliases: []
}
