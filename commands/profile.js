const commando = require('discord.js-commando')
const Discord = require('discord.js')
const Canvas = require('canvas');
const fs = require("fs");
const canvacord = require("canvacord");

module.exports.run = async (bot, message, args) => {
    var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
    var xp = JSON.parse(fs.readFileSync('./xp.json'))
    if(!UserJSON[message.author.id])
    {
        UserJSON[message.author.id] = {
            bal: 50,
            background: 1,
            highestBG: 1
        }
    }
        fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))   
    
        const rank = new canvacord.Rank()
        .setAvatar(message.author.displayAvatarURL({dynamic: false, format: 'png', size: 4096}))
        .setCurrentXP(xp[message.author.id].xp)
        .setRequiredXP(xp[message.author.id].level * 300)
        .setStatus(message.member.presence.status)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(message.author.username)
        .setDiscriminator("0007")
        .setBackground('IMAGE', `C:/Users/Erwin/Desktop/DiscordBot/backgrounds/${UserJSON[message.author.id].background}.png`)
        rank.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
        })
}


module.exports.help = {
    name: "profile",
    aliases: []
}
