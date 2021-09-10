const Discord = require("discord.js")
const DIG = require("discord-image-generation");

module.exports.run = async (bot, message, args) => {
        let user = message.mentions.users.first();
        if(!user) {
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Triggered().getImage(`${avatar}`)
            let attach = new Discord.MessageAttachment(img, "triggered.gif")
            message.channel.send(attach)
        } else {
            let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })
            let img = await new DIG.Triggered().getImage(`${avatar}`);
            let attach = new Discord.MessageAttachment(img, "triggered.gif")
            message.channel.send(attach)
        }
}

module.exports.help = {
    name: "trigger",
    aliases: ["triggered"]
}
