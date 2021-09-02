const Discord = require("discord.js")
const commando = require("discord.js-commando")

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return
    let deleteCount = 0;
		try {
			deleteCount = parseInt(args, 10);
		} catch(err) {
			return message.reply('Please provide the number of messages to delete. (max 100)')
		}
		if (!deleteCount || deleteCount < 2 || deleteCount > 100)
			return message.reply('Please provide a number between 2 and 100 for the number of messages to delete');

		const fetched = await message.channel.messages.fetch({
			limit: deleteCount,
		})
		message.channel.bulkDelete(fetched)
			.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
            await message.channel.send(`Successfully deleted ${args} messages`)    
}


module.exports.help = {
    name: "purge",
    aliases: ["clear"]
}
