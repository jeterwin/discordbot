
const commando = require("discord.js-commando")
const Discord = require('discord.js')
var giphy = require('giphy-api')('wRW1EW3EiN6zwxGzGJGIzCITday6yAy3');

module.exports.run = async (bot, message, args) => {
    if(args == "") {
        giphy.random().then(function(res) {
            let embed = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setImage(res.data.images.original.url)
            .setFooter("Powered by GIPHY", "https://uc5fe6b93c418ad8a4e29dbe7098.previews.dropboxusercontent.com/p/thumb/ABTGAOaT_YDn92HrFUtWWajEVXv1lHigYws6JJOsuh88kBSrzWVZ8U0uImh2YsRTY3cRYdWo1Hl2jWWYbZySk6XGgTWScqOsSo7YlZTe6MAdBNZ7MahmKFyndsUXK97j2ssTtPriNpp7GgXsBVWv0yJTs_nHlsogUpYgsr5F8xOsSkf9ihESTgZQ6oXBfUB4ZEWn-NABa67xkbZ4hLb2i8oVnMylHgGH2v7RnZQMcP8UZpbHnqavWE046qKMemncw83nTmZlr7kCtPsIx4ISwyFHZZ7el1-cSYaWe_6g_0-W3zCcfYOAatupWohMQhAAfdSrgnoTzD6r1nBEr49bqcxnNZQIcWo6ahQQPy-Cd4JaRA/p.png?fv_content=true&size_mode=5")
            .setTimestamp()

            return message.channel.send(embed)
        })
    } else {
        giphy.search(`${args}`).then(function (res) {
            let embed = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setImage(res.data[0].images.original.url)
            .setFooter("Powered by Giphy", "https://uc5fe6b93c418ad8a4e29dbe7098.previews.dropboxusercontent.com/p/thumb/ABTGAOaT_YDn92HrFUtWWajEVXv1lHigYws6JJOsuh88kBSrzWVZ8U0uImh2YsRTY3cRYdWo1Hl2jWWYbZySk6XGgTWScqOsSo7YlZTe6MAdBNZ7MahmKFyndsUXK97j2ssTtPriNpp7GgXsBVWv0yJTs_nHlsogUpYgsr5F8xOsSkf9ihESTgZQ6oXBfUB4ZEWn-NABa67xkbZ4hLb2i8oVnMylHgGH2v7RnZQMcP8UZpbHnqavWE046qKMemncw83nTmZlr7kCtPsIx4ISwyFHZZ7el1-cSYaWe_6g_0-W3zCcfYOAatupWohMQhAAfdSrgnoTzD6r1nBEr49bqcxnNZQIcWo6ahQQPy-Cd4JaRA/p.png?fv_content=true&size_mode=5")
            .setTimestamp()

            return message.channel.send(embed)
        })        
    }
}


module.exports.help = {
    name: "gif",
    aliases: []
}
