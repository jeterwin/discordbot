const Discord = require("discord.js")
const commando = require("discord.js-commando")
const fs = require("fs")


module.exports.run = async (bot, message, args) => {
    if(args == "") return message.channel.send("Correct usage: `!vote <option1> <option2>`")
    else if(args[1] == undefined) return message.channel.send("Correct usage: `!vote <option1> <option2>`")
    let pollEmbed = new Discord.MessageEmbed()
    .setTitle("Poll")
    .setDescription("*The poll will be ongoing for 24h* \n ")
    .setColor("#94CD62")
    .addField('1️⃣ : ' + `${args[0]}`, `\n*Press 1️⃣ to vote for ${args[0]}*`)
    .addField('2️⃣ : ' + `${args[1]}`, `\n*Press 2️⃣* to vote for ${args[1]}`)    
    .setFooter(`Poll created by ${message.author.username}`)

    let pollMessage = await message.channel.send(pollEmbed)
    pollMessage.react(`1️⃣`);
    pollMessage.react(`2️⃣`);

    const filter_age = (reaction, user) => {
        return reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' && !user.bot;
    }
    let k=0
    let k1=0
    const collector_age = pollMessage.createReactionCollector(filter_age, {
        time: 86400000
    })
    collector_age.on('collect', async (reaction, user) => {
        if (reaction.emoji.name === '1️⃣' && !user.bot) {
            k++
        } else {
            collector_age.on('collect', async (reaction, user) => {
                if (reaction.emoji.name === '2️⃣' && !user.bot) {
                    k1++
                }
            })
        }
    })
    collector_age.on('end', collected => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Poll results!")
        .setDescription(`${k} people voted for ${args[0]} and ${k1} people voted for ${args[1]}`)
        .setColor("#94CD62")
        message.channel.send(embed)
    })
}


module.exports.help = {
    name: "vote",
    aliases: []
}