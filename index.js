const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const bot = new Commando.Client()
const TOKEN = "NDkwMjE1OTg4MTM1MDY3NjY4.W5vzNw.7GG1Jv73qwUY7QJO3GxJGv-u6Eo"

bot.registry.registerGroup('fun', 'Fun')
bot.registry.registerGroup('admin', 'Admin')
bot.registry.registerCommandsIn(__dirname + '/commands')

bot.on('ready', () => {
    console.log("mhm")
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: 'with depression',
            type: 'STREAMING',
            url: 'https://www.twitch.tv/monstercat'
        }
    })
})

bot.on("message", (message) => {
if(message.content.includes("!ping")) {

          message.channel.send("Pinging...").then(m =>{
              var ping = m.createdTimestamp - message.createdTimestamp;

              var embed = new Discord.MessageEmbed()
              .setAuthor(`🏓 Your ping is ${ping}ms`)
              .setColor("Your Color")

              m.edit(embed)
          })
      }
    })

bot.login(TOKEN)