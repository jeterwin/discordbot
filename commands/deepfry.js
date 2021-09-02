const discord = require("discord.js")
const commando = require("discord.js-commando")
const fetch = require('node-fetch')

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.members.first() || message.member || message.guild.users.cache.get(u => u.id === args[0])
        const avatar = user.user.displayAvatarURL({dynamic:false, size: 2048})
        fetch(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${avatar}`)
        .then((res) => res.json())
        .then((data) => {
            let embed = new discord.MessageEmbed()
            .setTitle("Deepfried!")
            .setImage(data.message)
            .setTimestamp()
            message.channel.send(embed)
        })
}

module.exports.help = {
    name: "deepfry",
    aliases: []
}
