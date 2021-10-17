const commando = require("discord.js-commando")
const Discord = require('discord.js')
const { MessageCollector } = require("discord.js")
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
    if(args == "" || isNaN(args)) return message.channel.send("Correct usage: `!crash <bet>`")
    if(args > UserJSON[message.author.id].bal) return message.channel.send("You don't have enough balance!")
    let multiplier = 1
    let crashValue = (Math.random() * (5 - 1) + 1).toFixed(1)

    let embed = new Discord.MessageEmbed()
    .setTitle("Do `stop` in order to crash!")
    .addField("Multiplier:", `${multiplier.toFixed(2)}x`)
    .setColor("#000000")
    .setTimestamp()
    message.channel.send(embed).then(msg => {
      UserJSON[message.author.id].bal = UserJSON[message.author.id].bal - Math.ceil(args)
      fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
      var ok = 1
      let filter = m => m.author.id === message.author.id && m.content.toLowerCase().startsWith(`stop`) && ok == 1
      const collector = new MessageCollector(message.channel, filter, {
        time: 120000,
      })
      collector.on("collect", (msg1) => {
        let embed3 = new Discord.MessageEmbed()
        .setTitle("Stopped by user!")
        .setColor("#00ff00")
        .addField("Stopped at:", `${multiplier.toFixed(2)}x`, true)
        .addField("Prize:", Math.ceil(args * multiplier), true)
        .setFooter(`${message.author.username}`)
        .setTimestamp()
        msg.edit(embed3)
        ok = 0
        UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.ceil(args * multiplier)
        fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
        collector.stop()
      })
        function myLoop() {
            setTimeout(function() {
              if (multiplier.toFixed(1) < crashValue && ok == 1) {
                multiplier = multiplier + 0.1;
                let embed1 = new Discord.MessageEmbed()
                .setTitle("Do `stop` in order to crash!")
                .setColor("#000000")
                .addField("Multiplier:", `${multiplier.toFixed(2)}x`, true)
                .addField("Prize: ", Math.ceil(args * multiplier), true)
                .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp()
                msg.edit(embed1)
                myLoop()
              } else if(multiplier.toFixed(1) == crashValue) {
                ok=0
                let embed2 = new Discord.MessageEmbed()
                .setTitle("Crashed!")
                .setColor("#FF0000")
                .addField("Crashed at:", `${multiplier.toFixed(2)}x`)
                .addField("Prize: ", Math.ceil(args * multiplier))
                .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp()
                msg.edit(embed2)
              }
            }, 1500)
          }
          myLoop();
    })
}


module.exports.help = {
    name: "crash",
    aliases: []
}
