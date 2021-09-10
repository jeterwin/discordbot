const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const distube = require("distube")
const bot = new Commando.Client({fetchAllMembers: true})
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection();
const { antijoin } = require("./Collection/index")
const fs = require("fs")

module.exports = { antijoin }

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

/* When bot is on */

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



/* On bot joins server */
bot.on("guildCreate", guild => {
    let embed = new Discord.MessageEmbed()
    .setColor("#00FF00")
    .setDescription("**Thanks for inviting me here!** 😊")
    .addField("My name is `hinata` and `!` is my default prefix", "If you wish to change it, do `!prefix <prefix>`")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: false, size: 4096}))
    .setFooter("Do !help to find more about me!")
    .setTimestamp()
    guild.systemChannel.send(embed)
})


/* On user leave | kick */
bot.on('guildMemberRemove', async member => {
    var LoggingChannels = JSON.parse(fs.readFileSync("./serverLogs.json"))
    if(!LoggingChannels[member.guild.id]) return;
    const LogChannel = LoggingChannels[member.guild.id].channel
    if(!bot.channels.cache.get(`${LogChannel}`)) return;

	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	})

	const kickLog = fetchedLogs.entries.first();

	if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

	const { executor, target } = kickLog;

    const KickedLog = new Discord.MessageEmbed()
    .setColor('#dd5f53')
    if (target.id === member.id) {
        KickedLog.setDescription(`${member.user.tag} left the guild, kicked by ${executor.tag}`)
        KickedLog.setTitle("User kicked from guild")
	} else {
        KickedLog.setDescription(`${member.user.tag} left the guild`)
        KickedLog.setTitle("User left the guild")
	}
    KickedLog.setTimestamp()

    bot.channels.cache.get(`${LogChannel}`).send(KickedLog)
})


/* Message log */
bot.on("messageDelete", message => {
    var LoggingChannels = JSON.parse(fs.readFileSync("./messageLogs.json"))
    if(!LoggingChannels[message.guild.id]) return;
    const LogChannel = LoggingChannels[message.guild.id].channel
    if(!bot.channels.cache.get(`${LogChannel}`)) return;
    const DeletedLog = new Discord.MessageEmbed()
    .setTitle("Deleted Message")
    .addField('Deleted by', `${message.author} - (${message.author.id})`)
    .addField('In', message.channel)
    .addField('Content', message.content)
    .setColor('#dd5f53')
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()

    bot.channels.cache.get(`${LogChannel}`).send(DeletedLog)
})

bot.on("messageDeleteBulk", messages => {
    const msg = messages.first();
    var LoggingChannels = JSON.parse(fs.readFileSync("./messageLogs.json"))
    if(!LoggingChannels[msg.guild.id]) return;
    const LogChannel = LoggingChannels[msg.guild.id].channel
    if(!bot.channels.cache.get(`${LogChannel}`)) return;
    const length = messages.array().length;
    const DeletedLogs = new Discord.MessageEmbed()
    .setTitle(`Deleted Messages`)
    .addField('Deleted by', `${msg.author} - (${msg.author.id})`)
    .addField('In', msg.channel)
    .setDescription(messages.map(message => `[${message.author.tag}]: ${message.content}`))
    .setFooter(`${length} latest shown`, msg.displayAvatarURL({size: 4096}))
    .setColor('#dd5f53')
    .setTimestamp();

    bot.channels.cache.get(`${LogChannel}`).send(DeletedLogs);
}) 


/* Message Edited */
bot.on("messageUpdate", async(oldMessage, newMessage) => {
    var LoggingChannels = JSON.parse(fs.readFileSync("./messageLogs.json"))
    if(!LoggingChannels[oldMessage.guild.id]) return;
    const LogChannel = LoggingChannels[oldMessage.guild.id].channel
    if(!bot.channels.cache.get(`${LogChannel}`)) return;
    const EditedLog = new Discord.MessageEmbed()
    .setTitle("Edited Message")
    .addField('Edited by', `${oldMessage.author} - (${oldMessage.author.id})`)
    .addField('In', oldMessage.channel)
    .addField('Old Message', oldMessage.content)
    .addField('New Message', newMessage.content)
    .setColor('#33B42C')
    .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()

    await bot.channels.cache.get(`${LogChannel}`).send(EditedLog)
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
    
    if(message.content.includes(`${prefix}ping`)) {

        message.channel.send("Pinging...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;

            var embed = new Discord.MessageEmbed()
            .setAuthor(`🏓 Your ping is ${ping}ms`)
            .setColor("Your Color")

            m.edit(embed)
        })
    }    
    if(message.content.includes(`${prefix}setverificationlevel`)) {
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send("You need administrator permissions to change the verification level")
        if(isNaN(messageArray[1])) return message.channel.send("You must enter a number between 0 and 4 (low - high)")
        message.guild.setVerificationLevel(Number(messageArray[1]))
        .then(updated => {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Updated mode successfully ✅`)
            .setDescription(`Updated guild verification level to ${message.guild.verificationLevel}`)
            .setTimestamp()
            .setColor('#00ff00')
            message.channel.send(embed)
        })
        .catch(console.error);
    }
    if(message.content.includes(`${prefix}setcontentfilter`)) {
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send("You need administrator permissions to change the content filter level")
        if(isNaN(messageArray[1])) return message.channel.send("You must enter a number between 0 and 3 (low - high)")
        message.guild.setExplicitContentFilter(Number(messageArray[1]))
        .then(updated => {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Updated mode successfully ✅`)
            .setDescription(`Updated guild content filter level to ${message.guild.explicitContentFilter}`)
            .setTimestamp()
            .setColor('#00ff00')
            message.channel.send(embed)
        })
        .catch(console.error);
    }
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


/* Antiraid module */
bot.on('guildMemberAdd', async(member) => {
    const getCollection = antijoin.get(member.guild.id)
    if(!getCollection) return;
    if(!getCollection.includes(member.user)) {
    getCollection.push(member.user)        
    }
    member.kick({reason: "Antiraid was enabled"})
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

bot.login(`NDkwMjE1OTg4MTM1MDY3NjY4.W5vzNw.7GG1Jv73qwUY7QJO3GxJGv-u6Eo`)
