const Discord = require("discord.js")
const pagination = require('discord.js-pagination')

module.exports.run = async (bot, message, args) => {
        const page1 = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setFooter("Requested", message.author.displayAvatarURL())
        .setTimestamp()
        .addFields(
            { name: '✨ Fun: ', value: '● 8ball \n ● avatar `<@user>` \n ● blackjack `<bet amount>` \n ● coinflip `<bet amount>` \n ● convert \n ● deepfry `<@user>` \n ● diceroll `<number> <bet amount>` \n ● highorlow \n ● meme \n ● gay `<@user>` \n ● gif \n ● jail `<@user>` \n ● osu `user` \n ● reminder `<1s/m/d> <message>` \n ● rockpaper \n ● roulette \n ● slotmachine \n ● triggered `<@user>`\n ● vote', inline: true }
        )

        const page2 = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setFooter("Requested", message.author.displayAvatarURL())
        .setTimestamp()
        .addFields(
            { name: '💸 Economy: ', value: '● bal `<@user>` \n ● backgrounds \n ● background set `<bg number>` \n ● crash `<bet amount>` \n ● daily \n ● give `<@user> <amount>` \n ● leaderboard \n ● profile \n ● shop \n ● shop buy <item> \n ● work', inline: true },
        )

        const page3 = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setFooter("Requested", message.author.displayAvatarURL())
        .setTimestamp()
        .addFields(
            { name: '⚙️ Moderation: ', value: '● antiraid `<on | off | list>` \n ● ban `<@user>` \n ● unban `<@user>` \n ● info `<@user>` \n ● inv \n ● kick `<@user>` \n ● messagelog \n`<#channel>` \n  ● serverlog \n`<#channel>` \n ● setverificationlevel \n `<0-4>` \n ● setcontentfilter `<0-3>` \n ● purge \n ● clear \n ● slowmode `<time>` \n ● prefix \n ● tempmute \n`<@user> <time>`', inline: true },
        )
        const page4 = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setFooter("Requested", message.author.displayAvatarURL())
        .setTimestamp()
        .addFields(
            { name: '🎵 Music: ', value: '● play \n ● skip \n ● stop \n ● loop \n ● pause \n ● resume \n ● queue', inline: true },
        )
        const page5 = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setFooter("Requested", message.author.displayAvatarURL())
        .setTimestamp()
        .addFields(
            { name: '💟 Love: ', value: '● love `<@user>` \n ● hug `<@user>` \n ● kiss `<@user>` \n ● pat `<@user>` \n ● fuck `<@user>`', inline: true },
        )

        const page6 = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setFooter("Requested", message.author.displayAvatarURL())
        .setTimestamp()
        .addFields(
            { name: '💢 Anime: ', value: '● anime `<name>` \n ● manga `<name>`', inline: true},
        )

        const page7 = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setFooter("Requested", message.author.displayAvatarURL())
        .setTimestamp()
        .addFields(
            { name: '📈 XP System: ', value: '● xp `off` \n ● xp `on`', inline: true}
        )
        
        const pages = [
            page1,
            page2,
            page3,
            page4,
            page5,
            page6,
            page7
        ]
        const emoji = ["◀️", "▶️"]
        const timeout = '100000'

        return pagination(message, pages, emoji, timeout)
}

module.exports.help = {
    name: "help",
    aliases: []
}