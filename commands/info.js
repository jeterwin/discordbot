const Discord = require("discord.js")
const commando = require("discord.js-commando")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    const { guild, channel } = message
    if(!message.mentions.users.first())
    {
        message.channel.send("Lu kare vrei sa ii furi portofelu bos?")
        return;
    }
    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id)

    const embed = new Discord.MessageEmbed()
    .setTitle(`Latest information about ${user.username}`)
    .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
    .addField("User Tag", user.tag, true)
    .addField("Is bot", user.bot, true)
    .addField("Nickname", member.nickname || "None", true)
    .addField("Joined Server", new Date(member.joinedTimestamp).toLocaleDateString(), true)
    .addField("Joined Discord", new Date(user.createdTimestamp).toLocaleDateString(), true)
    .addField("Role Count", member.roles.cache.size - 1, true)
    .setThumbnail(user.displayAvatarURL())
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(message.author.username, message.author.displayAvatarURL())

    message.channel.send(embed);
    return;
}

module.exports.help = {
    name: "info",
    aliases: []
}