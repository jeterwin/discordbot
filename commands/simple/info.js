const commando = require("discord.js-commando")
const Discord = require('discord.js')

class InfoCommand extends commando.Command
{
    constructor(client) {
        super(client, {
            name: 'info',
            group: 'admin',
            memberName: 'info',
            description: "dac"
        });
    }

    async run(message, args)
    {
        const { guild, channel } = message
        if(!message.mentions.users.first())
        {
            message.channel.send("Lu kare vrei sa ii furi portofelu bos?")
            return;
        }
        const user = message.mentions.users.first() || message.member.user
        const member = guild.members.cache.get(user.id)

        const embed = new Discord.MessageEmbed()
        .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
        .addField("User Tag", user.tag, true)
        .addField("Is bot", user.bot, true)
        .addField("Nickname", member.nickname || "None", true)
        .addField("Joined Server", new Date(member.joinedTimestamp).toLocaleDateString(), true)
        .addField("Joined Discord", new Date(user.createdTimestamp).toLocaleDateString(), true)
        .addField("Role Count", member.roles.cache.size - 1, true)
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL())

        message.channel.send(embed);
        return;
    }
}

module.exports = InfoCommand;