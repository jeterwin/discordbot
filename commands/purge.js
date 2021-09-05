const Discord = require("discord.js")
const commando = require("discord.js-commando")

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return
		if (!args[0] || args[0] < 2 || args[0] > 50)
			return message.reply('Please provide a number between 2 and 50 for the number of messages to delete');

		const fetched = await message.channel.messages.fetch({
			limit: parseInt(args[0], 10) + 1
		})
		message.channel.bulkDelete(fetched)
		.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
        await message.channel.send(`Successfully deleted ${args} messages`).then(msg => {
			msg.delete({ timeout: 5000 })
		}) 
}


module.exports.help = {
    name: "purge",
    aliases: ["clear"]
}
