const commando = require('discord.js-commando')
const Discord = require('discord.js')
const Canvas = require('canvas');
const fs = require("fs");
const canvacord = require("canvacord");

module.exports.run = async (bot, message, args) => {
    var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
    var xp = JSON.parse(fs.readFileSync('./xp.json'))
    var collection = new Discord.Collection()
    var members = message.guild.memberCount
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
        .setRequiredXP(xp[message.author.id].level * 100)
        .setStatus(message.member.presence.status)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator)
        .setBackground('IMAGE', `C:/Users/Erwin/Desktop/DiscordBot/backgrounds/${UserJSON[message.author.id].background}.png`)
        .setLevel(xp[message.author.id].level)
        
        await Promise.all(
            message.guild.members.cache.map(async(member) => {
                const id = member.id
                if(!xp[id])
                return
                const bal = xp[id].level
                const xpUser = xp[id].xp
                return bal !== 0 ? collection.set(id, {
                    id,
                    bal,
                    xpUser
                })
                : null
            })
        )
        var data = collection.sort((a,b) => b.bal - a.bal).first(members)
        data = collection.sort((a,b) => b.xpUser - a.xpUser).first(members)
            data.map((v, i) => {
                if(bot.users.cache.get(v.id).tag == message.author.tag)
                rank.setRank(i+1)
            })
        

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
