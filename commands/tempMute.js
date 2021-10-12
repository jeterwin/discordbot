const Discord = require("discord.js")
const commando = require("discord.js-commando")
const ms = require("ms")

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You need permissions to manage roles in order to mute!") 
    let tomute = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!tomute) return message.reply("Couldn't find user")
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them")
    let muterole = message.guild.roles.cache.find(role => role.name === "Muted")
    if(!muterole) {
        try {
            await message.guild.roles.create({
                data: {
                name: "Muted",
                color: "#000000",
                permissions: []                
                }
            })
            muterole = message.guild.roles.cache.find(role => role.name === "Muted")
            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.createOverwrite(muterole, {
                    SEND_MESSAGES: false,
                    MANAGE_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false
                })
            })
        } catch(er) {
            console.log(e.stack)
        }
    }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    console.log(member)
    if (!member) 
      return message.channel.send('Please mention a user or provide a valid user ID');
    if (member === message.member)
      return message.channel.send('You cannot mute yourself')
    if (member === message.guild.me) return message.channel.send(message, 0, 'You cannot mute me')
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send('You cannot mute someone with an equal or higher role')
    if (!args[1])
      return message.channel.send('Please enter a length of time of 14 days or less (1s/m/h/d)')
    let time = ms(args[1])
    if (!time || time > 1209600000)
      return message.channel.send('Please enter a length of time of 14 days or less (1s/m/h/d)')

    let reason = args.slice(2).join(' ');
    if (!reason) reason = '`None Provided`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...'

    if (member.roles.cache.has(muterole))
      return message.channel.send('Provided member is already muted');

    // Mute member
    try {
      await member.roles.add(muterole.id);
    } catch (err) {
      console.log(err)
      return message.channel.send('Please check the role hierarchy', err.message);
    }
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle('Mute Member')
      .setDescription(`${member} has now been muted for **${ms(time, { long: true })}**.`)
      .addField('Moderator', message.member, true)
      .addField('Member', member, true)
      .addField('Time', `\`${ms(time)}\``, true)
      .addField('Reason', reason)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(muteEmbed);

    // Unmute member
    member.timeout = message.client.setTimeout(async () => {
      try {
        await member.roles.remove(muterole.id);
        const unmuteEmbed = new Discord.MessageEmbed()
          .setTitle('Unmute Member')
          .setDescription(`${member} has been unmuted.`)
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(unmuteEmbed);
      } catch (err) {
        console.log(err)
        return message.channel.send('Please check the role hierarchy', err.message);
      }
    }, time);
}

module.exports.help = {
    name: "tempmute",
    aliases: []
}