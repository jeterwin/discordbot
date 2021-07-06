const osu = require('node-osu');
const commando = require('discord.js-commando')
const Discord = require('discord.js')

class OsuCommand extends commando.Command
{
    constructor(client) {
        super(client, {
            name: 'osu',
            group: 'simple',
            memberName: 'osu',
            description: "dax"
        });
    }

    async run(message, args)
    {
        const osuApi = new osu.Api('9c6f60126f9b61ecb07fcfbf3d59976203a719fc', {
            notFoundAsError: true, 
            completeScores: true, 
            parseNumeric: true
        })
        const embed = new Discord.MessageEmbed()
        osuApi.getUser({ u: args }).then(user => {
            embed.setAuthor(`User info for ${args}`, `http://s.ppy.sh/a/${user.id}`)
            embed.setThumbnail(`http://s.ppy.sh/a/${user.id}`)
            embed.addField("Level: ", user.level.toFixed(0))
            embed.addField("Accuracy", user.accuracy.toFixed(0) + "%")
            embed.addField("SS: ", user.counts.SS, true)
            embed.addField("S: ", user.counts.S, true)
            embed.addField("A: ", user.counts.A, true)
            embed.addField("User pp: ", user.pp.raw.toFixed(0))
            embed.addField("Country: ", user.country, true)
            embed.addField("Rank in country: ", user.pp.countryRank, true)
            embed.addField("Global rank: ", user.pp.rank, true)
            embed.addField("Starting playing on: ", user.raw_joinDate)
            embed.setColor('RANDOM')

            message.channel.send(embed)
        })

        await osuApi.getUserBest( { u: args }).then(scores => {
            const embedBest = new Discord.MessageEmbed()
            .addField(`Your best score: `, scores[0].score, true)
            .addField("On map: ", scores[0].beatmap.title, true)
            .addField(`With an accuracy of: `, scores[0].accuracy.toFixed(2) * 100 + "%", true)
            .setColor("RANDOM")

            message.channel.send(embedBest)
        })

        try {
          await osuApi.getUserRecent( { u: args } ).then(scores => {
            const embedRecent = new Discord.MessageEmbed()
            .addField(`Your most recent score: `, scores[0].score, true)
            .addField("On map: ", scores[0].beatmap.title, true)
            .addField(`With an accuracy of: `, scores[0].accuracy.toFixed(2) * 100 + "%", true)
            .setColor("RANDOM")

            message.channel.send(embedRecent)
            
        })} catch(err)   {
            console.log(err)
            const embedRecent = new Discord.MessageEmbed()
            .setDescription("This user hasn't played a game in more than 24 hours!")

            message.channel.send(embedRecent)
        }
    }
}

module.exports = OsuCommand;