const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let hugged = message.mentions.users.first()
    let links = [
    "https://media1.giphy.com/media/143v0Z4767T15e/giphy.gif?cid=790b761125f8151045e63d838461c6039fa19067d18ebce4&rid=giphy.gif&ct=g", 
    "https://media3.giphy.com/media/od5H3PmEG5EVq/giphy.gif?cid=790b76111f3e3a798826811516b93b7e5960593a70455069&rid=giphy.gif&ct=g",
    "https://media0.giphy.com/media/PHZ7v9tfQu0o0/giphy.gif?cid=790b761160aa9ed11853891942b0cec6a6732785432478b8&rid=giphy.gif&ct=g", 
    "https://media1.giphy.com/media/svXXBgduBsJ1u/giphy.gif?cid=790b76114c45168b086eba828c27f7aeeb725d17e36a0824&rid=giphy.gif&ct=g", 
    "https://media4.giphy.com/media/IRUb7GTCaPU8E/giphy.gif?cid=790b76116c37eba0aade8069ab71542503f7ab4b5968c92b&rid=giphy.gif&ct=g", 
    "https://media2.giphy.com/media/lrr9rHuoJOE0w/giphy.gif?cid=790b76119c4b04a38e44f4a43a4c6a0e482de75a3b8e7aaa&rid=giphy.gif&ct=g"]
    let randomLink = links[Math.floor(Math.random() * links.length)]
    if(!hugged) return message.channel.send("That must suck man")
    if(args == "") return message.channel.send("Who do you want to hug")
    let embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.username} is not letting ${hugged.username} go! 😊`)
    .setImage(randomLink)

    .setColor("#ffc0cb")
    message.channel.send(embed)
}

module.exports.help = {
    name: "hug",
    aliases: []
}
