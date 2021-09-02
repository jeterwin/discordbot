
const commando = require("discord.js-commando")
const Discord = require('discord.js')
var giphy = require('giphy-api')('wRW1EW3EiN6zwxGzGJGIzCITday6yAy3');

module.exports.run = async (bot, message, args) => {
    if(args == "")
    {
        giphy.random().then(function(res) {
            let embed = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setImage(res.data.images.original.url)
            .setFooter("Powered by Giphy", "https://ucc16f7d6e504028c3c55dd6d8f0.previews.dropboxusercontent.com/p/thumb/ABSkW4zq8BiyIt_eNnqrW-OibbebLwHu0odfyUAmn6RJKXy8cycFDNLGjs5IIdDu2xc37VA_goOmaDi9qjFwlc6nrxd9bjxXn-LHrqxKInSJ1v5Kz2ywYtJ70k9rfgkJu_37nCG2bNtByDuY3pXFt457NT0m821EaWedXQr_MbUZgzp6vWjm2ZlAETwxWDMPQwsFvnVrGpPX6JFHLQrvsdWabC4WoULcoqMuFyuFqqntnjFdCbJbM43bFkj3xsmI0itkRyk1xFVm8o1J_PJ-387Y2aId9kO6RAPGJH7Ax0W5mFcC-tiCtDzpeayAfVW7Bt-tu0NUVaTO_hvqMyWQS4ZMNDL7eSuTxLYnu3oesMi6CQ/p.png?fv_content=true&size_mode=5")
            .setTimestamp()

            return message.channel.send(embed)
        })
    }
    else
    {
        giphy.search(`${args}`).then(function (res) {
            let embed = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setImage(res.data[0].images.original.url)
            .setFooter("Powered by Giphy", "https://ucc16f7d6e504028c3c55dd6d8f0.previews.dropboxusercontent.com/p/thumb/ABSkW4zq8BiyIt_eNnqrW-OibbebLwHu0odfyUAmn6RJKXy8cycFDNLGjs5IIdDu2xc37VA_goOmaDi9qjFwlc6nrxd9bjxXn-LHrqxKInSJ1v5Kz2ywYtJ70k9rfgkJu_37nCG2bNtByDuY3pXFt457NT0m821EaWedXQr_MbUZgzp6vWjm2ZlAETwxWDMPQwsFvnVrGpPX6JFHLQrvsdWabC4WoULcoqMuFyuFqqntnjFdCbJbM43bFkj3xsmI0itkRyk1xFVm8o1J_PJ-387Y2aId9kO6RAPGJH7Ax0W5mFcC-tiCtDzpeayAfVW7Bt-tu0NUVaTO_hvqMyWQS4ZMNDL7eSuTxLYnu3oesMi6CQ/p.png?fv_content=true&size_mode=5")
            .setTimestamp()

            return message.channel.send(embed)
        })        
    }
}


module.exports.help = {
    name: "gif",
    aliases: []
}
