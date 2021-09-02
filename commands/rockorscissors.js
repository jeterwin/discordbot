const commando = require("discord.js-commando")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let answers = ["paper", "rock", "scissors"]
    let botChoice = answers[Math.floor(Math.random() * answers.length)]
    let filter = m => m.author.id === message.author.id
    await message.channel.send(`Pick paper, rock or scissors!`).then(() => {
    message.channel.awaitMessages(filter, {
      max: 1,
      time: 20000,
      errors: ['time']
    })
            .then(message => {
            message = message.first()
            if(message.content.toLowerCase() == botChoice)
            return message.channel.send("It's a tie!")
            if(message.content.toLowerCase() == "paper") {
                if(botChoice == "rock")
                return message.channel.send(`You win, the bot picked ${botChoice}`)
                else
                (botChoice == "scissors")
                return message.channel.send(`You lose, the bot picked ${botChoice}`)

            } else if(message.content.toLowerCase() == "rock") {
                if(botChoice == "scissors")
                return message.channel.send(`You win, the bot picked ${botChoice}`)
                else
                (botChoice == "paper")
                return message.channel.send(`You lose, the bot picked ${botChoice}`)

            } else if(message.content.toLowerCase() == "scissors") {
                if(botChoice == "paper")
                return message.channel.send(`You win, the bot picked ${botChoice}`)
                else
                return message.channel.send(`You lose, the bot picked ${botChoice}`)
            }
        })    
        .catch(collected => {
            message.channel.send('Make up your mind faster next time!');
        })
    })
}


module.exports.help = {
    name: "rockpaper",
    aliases: []
}
