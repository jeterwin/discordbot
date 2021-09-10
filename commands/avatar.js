const Discord = require("discord.js")
const commando = require("discord.js-commando")

module.exports.run = async (bot, message, args) => {
        let user = message.mentions.users.first();
        if(!user)
        {
            const embed = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .setDescription("Nice profile picture!")
            .setURL(message.author.displayAvatarURL({dynamic:true, size: 2048}))
            .setImage(message.author.displayAvatarURL({dynamic:true, size: 2048}))
            .setTimestamp()
            message.channel.send(embed);
        }
        else
        {
                const embed = new Discord.MessageEmbed()
                .setTitle(user.username)
                .setDescription("Nice profile picture!")
                .setURL(user.displayAvatarURL({dynamic:true, size: 2048}))
                .setImage(user.displayAvatarURL({dynamic:true, size: 2048}))
                .setTimestamp()
                message.channel.send(embed);
        }
}

module.exports.help = {
    name: "avatar",
    aliases: []
}
