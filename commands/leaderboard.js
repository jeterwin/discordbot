const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (bot, message, args) => {
    var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
    var collection = new Discord.Collection()
    if(args == "")
    {
        await Promise.all(
            message.guild.members.cache.map(async(member) => {
                const id = member.id
                if(!UserJSON[id])
                return
                const bal = UserJSON[id].bal
                return bal !== 0 ? collection.set(id, {
                    id,
                    bal,
                })
                : null
            })
        )
        const data = collection.sort((a,b) => b.bal - a.bal).first(10)
        let embed = new Discord.MessageEmbed()
        .setTitle(`Leaderboard in ${message.guild.name}`)
        .setColor("#90EE90")
        .setThumbnail(`https://cdn.discordapp.com/avatars/${data[0].id}/${bot.users.cache.get(data[0].id).avatar}.webp?size=4096`)
        .setDescription(
            data.map((v, i) => {
                if(i==0)
                return `${i+1}.🥇 ${bot.users.cache.get(v.id).tag} => **${v.bal}** coins 💸`                    
                else if(i==1)
                return `${i+1}.🥈 ${bot.users.cache.get(v.id).tag} => **${v.bal}** coins 💸`
                else if(i==2)
                return `${i+1}.🥉 ${bot.users.cache.get(v.id).tag} => **${v.bal}** coins 💸`
                else
                return `${i+1}.${bot.users.cache.get(v.id).tag} => **${v.bal}** coins 💸`
            })
        )
        .setFooter("Do !leaderboard global in order to see the richest players over all servers!")
        message.channel.send(embed)        
    }
    else if(args == "global"){
        var Sorted = Object.entries(UserJSON).sort((a,b) => b[1].bal - a[1].bal)
        if(Sorted.length > 10)
        Sorted = Sorted.slice(0, 10)
    
        var string = ""
        Sorted.forEach(user => {
            let userUsername = bot.users.cache.get(user[0])
            string += `${userUsername.username}#${userUsername.discriminator} => ${user[1].bal} coins 💸\n`
        })
        var embed = new Discord.MessageEmbed()
        .setTitle("**Global Leaderboard**")
        .setThumbnail(`https://cdn.discordapp.com/avatars/${Sorted[0][0]}/${bot.users.cache.get(Sorted[0][0]).avatar}.webp?size=4096`)
        .setDescription(string)
        .setColor("#90EE90")
        .setFooter("Do !leaderboard in order to see the richest players on this server!")
        message.channel.send(embed)
    }
}


module.exports.help = {
    name: "leaderboard",
    aliases: ["leaderboards"]
}
