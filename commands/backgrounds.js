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
        return message.channel.send("Nu iti permiti tu asa ceva")
    }

    let embed = new Discord.MessageEmbed()
    .setTitle("These are the backgrounds you currently own!")
    .setThumbnail(message.author.displayAvatarURL({dynamic: false, size: 4096}))
    .setColor("")
    while(i <= UserJSON[message.author.id].highestBG)
    {
        embed.addField(`Background ${i}`, `${PricesJSON[`background-${i}`].alt}`)
        i++;
    }
    message.channel.send(embed)
}

module.exports.help = {
    name: "backgrounds",
    aliases: ["bg", "bgs"]
}
