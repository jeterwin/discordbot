const Discord = require('discord.js')
const fs = require("fs")
const talkedRecently = new Set();

module.exports.run = async (bot, message, args) => {
    var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
    var money = Math.floor(Math.random() * 75) + 50;
    if(!UserJSON[message.author.id])
    {
        UserJSON[message.author.id] = {
            bal: 50,
            background: 1,
            highestBG: 1
        }
        fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
    }
    if(talkedRecently.has(message.author.id))
      return message.channel.send(`${message.author.username}, you can use work hourly!`)
    else {
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${message.author.username}, you just gained ${Number(money)} 💸!`)
    message.channel.send(embed)
    UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Number(money)
    fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
            /*  Cooldown  */
            talkedRecently.add(message.author.id);
            setTimeout(() => {
              talkedRecently.delete(message.author.id);
            }, 60000);
    }
}

module.exports.help = {
    name: "work",
    aliases: []
}