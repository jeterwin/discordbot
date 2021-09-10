const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .addFields(
            { name: '✨ Fun: ', value: '● 8ball \n ● avatar `<@user>` \n ● blackjack \n ● coinflip \n ● deepfry `<@user>` \n ● diceroll \n ● highorlow \n ● meme \n ● gay `<@user>` \n ● gif \n ● jail `<@user>` \n ● osu `user` \n ● rockpaper \n ● roulette \n ● slotmachine \n ● triggered `<@user>`\n ● vote', inline: true },
            { name: '💸 Economy: ', value: '● bal `<@user>` \n ● backgrounds \n ● background set `<bg number>` \n ● crash \n ● daily \n ● give \n ● leaderboard \n ● profile \n ● shop \n ● shop buy <item> \n ● work', inline: true },
            { name: '⚙️ Moderation: ', value: '● antiraid `on | off | list` \n ● ban `<@user>` \n ● unban `<@user>` \n ● info `<@user>` \n ● inv \n ● kick `<@user>` \n ● messagelog \n  ● serverlog \n ● setverificationlevel \n ● setcontentfilter \n ● purge \n ● clear \n ● slowmode \n ● prefix \n ● tempmute', inline: true },
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