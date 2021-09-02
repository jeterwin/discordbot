const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let fucked = message.mentions.users.first()
    let links = [
    "https://media3.giphy.com/media/w7RGPBLGO8rjq/giphy.gif?cid=790b7611012b6b48e0195bfa7d7502877ce2de488e6138b1&rid=giphy.gif&ct=g", 
    "https://media2.giphy.com/media/o03ctbYEV55kI/giphy.gif?cid=790b7611c0e83afa7b9a56896b9c797d59a106d9d75f6824&rid=giphy.gif&ct=g",
    "https://media0.giphy.com/media/QXP41W5A32T4UXGbTI/giphy.gif?cid=ecf05e47moh7k1efuo8dbcs0xouw8z6sx9agvjzpjrkj4mnl&rid=giphy.gif&ct=g", 
    "https://media4.giphy.com/media/K4P0rDpjBf7zO/giphy.gif?cid=790b76117a3663dae9949a8d37dc5c04655b7f8447fd1240&rid=giphy.gif&ct=g", 
    "https://media3.giphy.com/media/MXjVBz2ZkX3RqmVDP3/giphy.gif?cid=790b7611c3104936fb4599f536ec14210fde50612a049b3b&rid=giphy.gif&ct=g", 
    "https://media0.giphy.com/media/3oEdv67AXWYsTqrnbi/giphy.gif?cid=ecf05e470jiegif0zn9bbvr6lq8bhzthzp5yo8jgutyjgyqz&rid=giphy.gif&ct=g"]

    let randomLink = links[Math.floor(Math.random() * links.length)]
    if(!fucked) return message.channel.send("That must suck man")
    if(args == "") return message.channel.send("Who do you want to do dirty stuff with?")
    let embed = new Discord.MessageEmbed()
    .setTitle(`Oh no, that's so very lewd ${message.author.username}! 😳`)
    .setImage(randomLink)

    .setColor("#ffc0cb")
    message.channel.send(embed)
}

module.exports.help = {
    name: "fuck",
    aliases: []
}
