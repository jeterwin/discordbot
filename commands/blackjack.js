const Discord = require("discord.js")
const malScraper = require('mal-scraper')
const blackjack = require("discord-blackjack")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    if(args == "") return message.channel.send("You have to bet something...")
    var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
    let game = await blackjack(message, bot)
    if(!UserJSON[message.author.id])
    {
        UserJSON[message.author.id] = {
            bal: 50,
            background: 1,
            highestBG: 1
        }
        fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
    }
    UserJSON[message.author.id].bal = UserJSON[message.author.id].bal - args
    fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
    switch (game.result) {
      case 'Win': {
        message.channel.send(`You just won ${Math.ceil(args * 1.5)} 💸`)
        UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.ceil(args * 1.5)
        fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
        break;
      }
      case 'Tie': {
        message.channel.send(`You got your ${args} 💸 back!`)
        UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + args
        fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
        break;          
      }
      case 'ERROR':
        console.log("tf")
        break;
    }
}

module.exports.help = {
    name: "blackjack",
    aliases: ["bj"]
}
