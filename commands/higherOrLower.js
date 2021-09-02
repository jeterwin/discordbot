const commando = require("discord.js-commando")
const Discord = require('discord.js')
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    if(args == "") return message.channel.send("How much are you betting?")
    let myNumber = Math.floor(Math.random() * 13) + 1
    let botNumber = Math.floor(Math.random() * 12) + 1
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

    do {
        myNumber = Math.floor(Math.random() * 13) + 1;
    } while(myNumber === botNumber);
    
    let filter = m => m.author.id === message.author.id
    await message.channel.send(`Is the number you've got higher or lower than the bot's? \`HIGHER\` / \`LOWER\``).then(() => {
    message.channel.send(`Your number is ${myNumber}. The bot's number is somewhere between 1 and 13!`)
    message.channel.awaitMessages(filter, {
      max: 1,
      time: 20000,
      errors: ['time']
    })
    .then(message => {
      message = message.first()
      UserJSON[message.author.id].bal = UserJSON[message.author.id].bal - args
      if (message.content.toLowerCase() == 'higher' && myNumber > botNumber) 
      {
        UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.ceil(args * 1.5)
        var embed = new Discord.MessageEmbed()
        .addField(`You were correct!`, `My number was ${botNumber}`)
        .addField(`You just won`, `${Math.ceil(args * 1.5)} 💸`)
        message.channel.send(embed)
      } 
      else if (message.content.toLowerCase() == 'lower' && myNumber < botNumber) 
      {
        UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.ceil(args * 1.5)
        var embed = new Discord.MessageEmbed()
        .addField(`You were correct!`, `My number was ${botNumber}`)
        .addField(`You just won`, `${Math.ceil(args * 1.5)} 💸`)
        message.channel.send(embed)
      }
      else 
      {
        var embed = new Discord.MessageEmbed()
        .addField(`Nope! My number was ${botNumber}`, `Good luck next time!`)
        message.channel.send(embed)
      }
      fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))  
    })
    .catch(collected => {
        message.channel.send('Make up your mind faster next time!');
    })
})
}


module.exports.help = {
    name: "highorlow",
    aliases: []
}
