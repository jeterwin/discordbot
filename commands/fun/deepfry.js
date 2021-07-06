const commando = require("discord.js-commando")
const discord = require('discord.js')
const fetch = require('node-fetch')

class deepfryCommand extends commando.Command
{
    constructor(client) {
        super(client, {
            name: 'deepfry',
            group: 'fun',
            memberName: 'deepfry',
            description: "deepfry"
        });
    }

    async run(message, args)
    {
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
}

module.exports = deepfryCommand;