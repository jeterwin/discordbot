const Discord = require("discord.js")
const pagination = require('discord.js-pagination')
const fs = require("fs")
module.exports.run = async (bot, message, args) => {
    var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
    var PricesJSON = JSON.parse(fs.readFileSync("./prices.json"))
    let i = 1
    
    if(args[0] == "set" && (args[1] == undefined || isNaN(args[1])))
    {
        return message.channel.send("Care fundal ba")
    }
    else if(args[0] == "set" && !isNaN(args[1]))
    {
        if(Number(args[1]) <= UserJSON[message.author.id].highestBG)
        {
            UserJSON[message.author.id].background = Number(args[1])
            fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
            return message.channel.send(`Successfully set background ${args[1]}`)
        }
        else
        return message.channel.send("You don't own that background!")
    }

    const page1 = new Discord.MessageEmbed()
    .setTitle("These are the backgrounds you currently own!")
    .setThumbnail(message.author.displayAvatarURL({dynamic: false, size: 2048}))
    .setColor("")
    const emoji = ["◀️", "▶️"]
    const timeout = '100000'

    while(i <= 5)
    {
        if(i <= UserJSON[message.author.id].highestBG)
        page1.addField(`Background ${i}`, `${PricesJSON[`background-${i}`].alt}`)
        i++;
    }
    if(UserJSON[message.author.id].highestBG > 5 && UserJSON[message.author.id].highestBG <= 10) {
        const page2 = new Discord.MessageEmbed()
        .setTitle("These are the backgrounds you currently own!")
        .setThumbnail(message.author.displayAvatarURL({dynamic: false, size: 2048}))
        .setColor("")

        while(i <= UserJSON[message.author.id].highestBG) {
            page2.addField(`Background ${i}`, `${PricesJSON[`background-${i}`].alt}`)
            i++;
        }

        const pages = [
            page1,
            page2
        ]
        return pagination(message, pages, emoji, timeout)
    }
    else if(UserJSON[message.author.id].highestBG > 10 && UserJSON[message.author.id].highestBG <= 15) {
        const page2 = new Discord.MessageEmbed()
        .setTitle("These are the backgrounds you currently own!")
        .setThumbnail(message.author.displayAvatarURL({dynamic: false, size: 2048}))
        .setColor("")

        while(i <= 10) {
            page2.addField(`Background ${i}`, `${PricesJSON[`background-${i}`].alt}`)
            i++;
        }

        const page3 = new Discord.MessageEmbed()
        .setTitle("These are the backgrounds you currently own!")
        .setThumbnail(message.author.displayAvatarURL({dynamic: false, size: 2048}))
        .setColor("")

        while(i <= UserJSON[message.author.id].highestBG) {
            page3.addField(`Background ${i}`, `${PricesJSON[`background-${i}`].alt}`)
            i++;
        }

        const pages = [
            page1,
            page2,
            page3
        ]
        return pagination(message, pages, emoji, timeout)
    }
    return message.channel.send(page1)
}

module.exports.help = {
    name: "backgrounds",
    aliases: ["bg", "bgs", "background"]
}
