const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .addFields(
            { name: '✨ Fun: ', value: '● 8ball \n ● avatar `<@user>` \n ● blackjack `<bet amount>` \n ● coinflip `<bet amount>` \n ● deepfry `<@user>` \n ● diceroll `<number> <bet amount>` \n ● highorlow \n ● meme \n ● gay `<@user>` \n ● gif \n ● jail `<@user>` \n ● osu `user` \n ● rockpaper \n ● roulette \n ● slotmachine \n ● triggered `<@user>`\n ● vote', inline: true },
            { name: '💸 Economy: ', value: '● bal `<@user>` \n ● backgrounds \n ● background set `<bg number>` \n ● crash `<bet amount>` \n ● daily \n ● give `<@user> <amount>` \n ● leaderboard \n ● profile \n ● shop \n ● shop buy <item> \n ● work', inline: true },
            { name: '⚙️ Moderation: ', value: '● antiraid `<on | off | list>` \n ● ban `<@user>` \n ● unban `<@user>` \n ● info `<@user>` \n ● inv \n ● kick `<@user>` \n ● messagelog \n`<#channel>` \n  ● serverlog \n`<#channel>` \n ● setverificationlevel \n `<0-4>` \n ● setcontentfilter `<0-3>` \n ● purge \n ● clear \n ● slowmode `<time>` \n ● prefix \n ● tempmute \n`<@user> <time>`', inline: true },
            { name: '🎵 Music: ', value: '● play \n ● skip \n ● stop \n ● loop \n ● pause \n ● resume \n ● queue', inline: true },
            { name: '💟 Love: ', value: '● love `<@user>` \n ● hug `<@user>` \n ● kiss `<@user>` \n ● pat `<@user>` \n ● fuck `<@user>`', inline: true },
            { name: '💢 Anime: ', value: '● anime `<name>` \n ● manga `<name>`', inline: true}
        )
        .setTimestamp()
        .setFooter("Requested", message.author.displayAvatarURL())
        message.channel.send(embed)
}

module.exports.help = {
    name: "help",
    aliases: []
}