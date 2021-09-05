const Discord = require("discord.js")
const commando = require("discord.js-commando")

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return
		if (!args[0] || args[0] < 2 || args[0] > 50)
			return message.reply('Please provide a number between 2 and 50 for the number of messages to delete');

		const fetched = await message.channel.messages.fetch({
			limit: args[0],
		})
		message.channel.bulkDelete(fetched)  
}


module.exports.help = {
    name: "purge",
    aliases: ["clear"]
}
