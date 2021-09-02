const commando = require('discord.js-commando')
const Discord = require('discord.js')
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
    var money = Math.floor(Math.random() * 50) + 10;
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
    .setDescription(`You just gained ${Number(money)} 💸!`)
    message.channel.send(embed)
    UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Number(money)
    fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
}


module.exports.help = {
    name: "work",
    aliases: []
}
