const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let pat = message.mentions.users.first()
    let links = [
    "https://media.giphy.com/media/osYdfUptPqV0s/giphy.gif", 
    "https://media2.giphy.com/media/5tmRHwTlHAA9WkVxTU/giphy.gif?cid=790b76114294fc2f67bf2040a3a7cea6409f84df06257daa&rid=giphy.gif&ct=g",
    "https://media2.giphy.com/media/HxDOijFIr4g3S/giphy.gif?cid=790b761143fff2a89222d9a4165fecd01b10cdabad8e5f54&rid=giphy.gif&ct=g", 
    "https://media1.giphy.com/media/SSPW60F2Uul8OyRvQ0/giphy.gif?cid=790b76110c7851227368a5a6957429fa79474ea3d48826f5&rid=giphy.gif&ct=g", 
    "https://media2.giphy.com/media/L2z7dnOduqEow/giphy.gif?cid=790b7611f2b295ce93bca42ca8baae012248c84ae9e68b63&rid=giphy.gif&ct=g", 
    "https://media4.giphy.com/media/3oz8xDLT82QiURnPS8/giphy.gif?cid=790b76115534d9e10dc09ff488ff04252a7459f259671a81&rid=giphy.gif&ct=g"]

    let randomLink = links[Math.floor(Math.random() * links.length)]
    if(!pat) return message.channel.send("That must suck man")
    if(args == "") return message.channel.send("Who do you want to pat")
    let embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.username} loves to pat ${pat.username}'s head! 🥺`)
    .setImage(randomLink)

    .setColor("#ffc0cb")
    message.channel.send(embed)
}

module.exports.help = {
    name: "pat",
    aliases: []
}
