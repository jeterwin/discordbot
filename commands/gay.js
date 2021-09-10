const Discord = require("discord.js")
const DIG = require("discord-image-generation");

module.exports.run = async (bot, message, args) => {
        let user = message.mentions.users.first();
        if(!user) {
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Gay().getImage(`${avatar}`)
            let attach = new Discord.MessageAttachment(img, "gay.png")
            message.channel.send(attach)
        } else {
            let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })
            let img = await new DIG.Gay().getImage(`${avatar}`);
            let attach = new Discord.MessageAttachment(img, "gay.png")
            message.channel.send(attach)
        }
}

module.exports.help = {
    name: "gay",
    aliases: []
}
