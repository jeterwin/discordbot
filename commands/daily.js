const discord = require("discord.js")
const commando = require("discord.js-commando")
const fs = require("fs")
const talkedRecently = new Set(); 

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
    if (talkedRecently.has(message.author.id)) {
        message.channel.send(`${message.author.username}, you can use daily once every 24 hours!`);
    } else {
        let embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Daily 💸 !")
        .setDescription(`${message.author.username}, you just gained 200 💸 by using daily!`)
        .setTimestamp()

        message.channel.send(embed)
        UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + 200
        fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
        /*  Cooldown  */
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 86400000);
    }
}
module.exports.help = {
    name: "daily",
    aliases: []
}
