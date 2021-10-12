module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need permissions to in order to unban members!")
    let toUnban = await bot.users.fetch(args[0])
    if(!toUnban)
    {
        try {
        await message.reply("No user found");
        } catch(err) {
            console.log(err)
            message.channel.send("The user is not banned!")
        }
        return;
    }
    const reason = args[1] || "There was no reason!";
    try {
        message.guild.members.unban(toUnban, reason)
        message.channel.send(`${toUnban} has been unbanned from the server!`)     
        } catch(err) {
            console.log(err)
    }
}

module.exports.help = {
    name: "unban",
    aliases: []
}
