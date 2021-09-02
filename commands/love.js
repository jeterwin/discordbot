const commando = require("discord.js-commando")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let person = message.mentions.users.first();
    if(!person) return message.channel.send("You must be so alone...")
    var love = Math.floor(Math.random() * 100) + 1;
    const loveIndex = Math.floor(love / 10)
    const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex)

    const embed = new Discord.MessageEmbed()
    .setColor("#DB7093")
    .addField(`💞 **${message.author.username}** loves **${person.username}** this much:`,
    `💟 ${Math.floor(love)}%\n\n${loveLevel}`)
    .setThumbnail(person.displayAvatarURL())
    
    message.channel.send(embed)
}


module.exports.help = {
    name: "love",
    aliases: []
}
