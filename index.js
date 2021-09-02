const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const distube = require("distube")
const bot = new Commando.Client()
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection();
const fs = require("fs")
const TOKEN = "NDkwMjE1OTg4MTM1MDY3NjY4.W5vzNw.7GG1Jv73qwUY7QJO3GxJGv-u6Eo"

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log("Couldn't find commands")
        return
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded ✔️  ${i+1}`)
        bot.commands.set(props.help.name, props)
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name)
        })
    })
})

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

bot.on("message", async message => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))
    if(message.channel.type == "dm") return
    if(!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
        prefixes: "!"
    }
    let prefix = prefixes[message.guild.id].prefixes
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1)
    let command;
    if(prefix == cmd[0] && cmd.slice(prefix.length) == "prefix" && messageArray[1] == undefined)
    {
        var embed = new Discord.MessageEmbed()
        .setDescription(`The current server's prefix is: ${prefixes[message.guild.id].prefixes}`)
        .setColor("#ADD8E6")
        return message.channel.send(embed)
    }
    if(!message.content.startsWith(prefix)) return;
    if(bot.commands.has(cmd.slice(prefix.length))) {
        command = bot.commands.get(cmd.slice(prefix.length))
    } else {
        command = bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    }
    if(!command) return
    command.run(bot, message, args)
})

bot.distube = new distube(bot, { searchSongs: false, emitNewSongOnly: true })
bot.distube
    .on('playSong', (message, queue, song) =>
    {
            var embed = new Discord.MessageEmbed()  
            .setTitle("Now Playing 🎵")  
            .setDescription(`\`${song.name}\` - \`${song.formattedDuration}\`\n**Requested by: ${song.user}**`)
            .setColor("#ffcc66")           
            //message.channel.send(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
            message.channel.send(embed)   
    })
bot.distube
    .on('addSong', (message, queue, song) =>
    {
        var embed = new Discord.MessageEmbed()
        .setTitle("Now Playing 🎵")  
        .setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
        .setColor("#ffcc66")           
        //message.channel.send(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
        message.channel.send(embed)  
    })
bot.distube	
    .on('error', (message, e) => {
        console.error(e)
        //message.channel.send(`An error encountered: ${e}`)
})

bot.login(TOKEN)