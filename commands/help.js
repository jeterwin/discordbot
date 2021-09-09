const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .addFields(
            { name: '✨ Fun: ', value: '● 8ball \n ● avatar \n ● blackjack \n ● coinflip \n ● deepfry \n ● diceroll \n ● highorlow \n ● meme \n ● gif \n ● osu \n ● rockpaper \n ● roulette \n ● slotmachine \n ● vote \n', inline: true },
            { name: '💸 Economy: ', value: '● bal \n ● backgrounds \n ● background set <bg number> \n ● crash \n ● daily \n ● give \n ● leaderboard \n ● profile \n ● shop \n ● shop buy <item> \n ● work', inline: true },
            { name: '⚙️ Moderation: ', value: '● antiraid \n ● ban \n ● unban \n ● info \n ● inv \n ● kick \n ● messagelog \n  ● serverlog \n ● setverificationlevel \n ● setcontentfilter \n ● purge \n ● clear \n ● slowmode \n ● prefix \n ● tempmute', inline: true },
            { name: '🎵 Music: ', value: '● play \n ● skip \n ● stop \n ● loop \n ● pause \n ● resume \n ● queue', inline: true },
            { name: '💟 Love: ', value: '● love \n ● hug \n ● kiss \n ● pat \n ● fuck <lewd>', inline: true },
            { name: '💢 Anime: ', value: '● anime \n ● manga \n ● user <incoming>', inline: true}
        )
        .setTimestamp()
        .setFooter("Requested", message.author.displayAvatarURL())
        message.channel.send(embed)
}

module.exports.help = {
    name: "help",
    aliases: []
}