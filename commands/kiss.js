const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let kissed = message.mentions.users.first()
    let links = [
    "https://media2.giphy.com/media/FqBTvSNjNzeZG/giphy.gif?cid=790b76118f470371d473e18283c13cf7be35d8d26b7bfc78&rid=giphy.gif&ct=g", 
    "https://media4.giphy.com/media/bGm9FuBCGg4SY/giphy.gif?cid=790b76114e8b2ffd761597cc313d65e708680f509fbaa37c&rid=giphy.gif&ct=g",
    "https://media3.giphy.com/media/bm2O3nXTcKJeU/giphy.gif?cid=790b7611c86f42530ef9c937dfe3400a756c63860d211760&rid=giphy.gif&ct=g", 
    "https://media1.giphy.com/media/nyGFcsP0kAobm/giphy.gif?cid=790b76117a13f30684582e11574b4704c3366d8c322e9895&rid=giphy.gif&ct=g", 
    "https://media3.giphy.com/media/JFmIDQodMScJW/giphy.gif?cid=790b7611d746839a8c6650bbe55129dcb05a6e8d6fef0fec&rid=giphy.gif&ct=g", 
    "https://media4.giphy.com/media/QweWddrIQxlfi/giphy.gif?cid=790b761198f8ce3150379c867679772a3ec76481ea95a0cb&rid=giphy.gif&ct=g"]
    let randomLink = links[Math.floor(Math.random() * links.length)]
    if(!kissed) return message.channel.send("That must suck man")
    if(args == "") return message.channel.send("Who do you want to kiss")
    let embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.username} is sending lots of kisses towards ${kissed.username}! ❤️`)
    .setImage(randomLink)

    .setColor("#ffc0cb")
    message.channel.send(embed)
}

module.exports.help = {
    name: "kiss",
    aliases: []
}
