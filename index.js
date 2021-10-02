const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const distube = require("distube")
const Canvacord = require("canvacord");
const bot = new Commando.Client({fetchAllMembers: true})
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection();
bot.invites = {}
const { antijoin } = require("./Collection/index")
const fs = require("fs")
var xp = JSON.parse(fs.readFileSync("./xp.json"))
let cooldown = new Set()
let cdseconds = 60;

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
            name: '!help for more',
            type: 'STREAMING',
            url: 'https://www.twitch.tv/monstercat'
        }
    })
    bot.guilds.cache.each(guild => {
        if (!guild.me.permissions.has('MANAGE_GUILD')) return//on bot start, fetch all guilds and fetch all invites to store
        guild.fetchInvites().then(guildInvites => {
            guildInvites.each(guildInvite => {
                bot.invites[guildInvite.code] = guildInvite.uses
            })
        })
    })
})

bot.on('inviteCreate', (invite) => { //if someone creates an invite while bot is running, update store
    bot.invites[invite.code] = invite.uses
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

/* XP */
bot.on('message', message => {
    let xpAdd = Math.floor(Math.random() * 7) + 8
    if(!xp[message.author.id]) {
        xp[message.author.id] = {
            xp: 0,
            level: 1,
            on: 1
        }
    }

    let curXP = xp[message.author.id].xp
    let curLvl = xp[message.author.id].level
    let nxtLvl = xp[message.author.id].level * 100
    if(!cooldown.has(message.author.id) && !message.author.bot && xp[message.author.id].on == 1)
    xp[message.author.id].xp = xp[message.author.id].xp + xpAdd
    if(nxtLvl <= xp[message.author.id].xp) {
        xp[message.author.id].level = xp[message.author.id].level + 1
        xp[message.author.id].xp = 0;
        const embed = new Discord.MessageEmbed()
        .setTitle("Congratulations!")
        .setDescription(`${message.author.username} just got up to level ${curLvl}!`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 4096}))
        .setColor("#cc6699")
        message.channel.send(embed)
    }
    fs.writeFileSync("./xp.json", JSON.stringify(xp))

    // Add xp cooldown 1 min
    if(!cooldown.has(message.author.id))
    cooldown.add(message.author.id)

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdseconds * 1000);
})

bot.on("message", async message => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))
    if(message.channel.type == "dm") return;
    if(!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
        prefixes: "!"
    }
    fs.writeFileSync('./prefixes.json', JSON.stringify(prefixes))
    let prefix = prefixes[message.guild.id].prefixes
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1)
    let command;
    
    if(message.content.includes(`${prefix}xp off`)) {
        if(!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1,
                on: 0
            }
        }
        xp[message.author.id].on = 0
        fs.writeFileSync("./xp.json", JSON.stringify(xp))
        message.channel.send(`Successfully disabled xp system for ${message.author.username}`)
    }
    if(message.content.includes(`${prefix}xp on`)) {
        if(!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1,
                on: 1
            }
        }
        xp[message.author.id].on = 1
        fs.writeFileSync("./xp.json", JSON.stringify(xp))
        message.channel.send(`Successfully enabled xp system for ${message.author.username}`)
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

/* Welcomer */
bot.on('guildMemberAdd', async(member) => {
        var members = member.guild.memberCount
        var welcomes = JSON.parse(fs.readFileSync('./welcome.json'))
        if(!welcomes[member.guild.id]) return;
        const welcomeChannel = welcomes[member.guild.id].channel
        if(!bot.channels.cache.get(`${welcomeChannel}`)) return;

        const channel = member.guild.channels.cache.get(`${welcomeChannel}`)
        member.guild.fetchInvites().then(guildInvites => { //get all guild invites
            guildInvites.each(invite => {
                if(invite.uses != bot.invites[invite.code]) { //if it doesn't match what we stored:
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`Welcome <@${member.user.id}> invited by <@${invite.inviter.id}>. <@${invite.inviter.id}>'s invite has been used ${invite.uses} times!`)
                    .setColor("#FFA500")
                    channel.send(embed)
                    bot.invites[invite.code] = invite.uses
                }
            })
        })
        
        const welcome = new Canvacord.Welcomer()
        .setUsername(`${member.user.username}`)
        .setDiscriminator(`${member.user.discriminator}`)
        .setMemberCount(members)
        .setGuildName(`${member.guild.name}`)
        .setAvatar(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=2048`)
        .setColor("border", "#F4BB47")
        .setColor("username-box", "#d26500")
        .setColor("discriminator-box", "#d26500")
        .setColor("message-box", "#d26500")
        .setColor("title", "#F4BB47")
        .setColor("title-border", "#A8511F")
        .setColor("background", "#A8511F")
        .setColor("avatar", "#FFFFFF")
        welcome.build()
        .then(buffer => {
            const welcomemsg = new Discord.MessageAttachment(buffer, "WelcomeCard.png")
            bot.channels.cache.get(`${welcomeChannel}`).send(welcomemsg);
        })
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
            message.channel.send(embed)   
    })
bot.distube
    .on('addSong', (message, queue, song) =>
    {
        var embed = new Discord.MessageEmbed()
        .setTitle("Now Playing 🎵")  
        .setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
        .setColor("#ffcc66")           
        message.channel.send(embed)  
    })
bot.distube	
    .on('error', (message, e) => {
        console.error(e)
})

bot.login(`NDkwMjE1OTg4MTM1MDY3NjY4.W5vzNw.7GG1Jv73qwUY7QJO3GxJGv-u6Eo`)
