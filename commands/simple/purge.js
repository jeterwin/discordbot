const commando = require("discord.js-commando")
const discord = require('discord.js')

class AvatarCommand extends commando.Command
{
    constructor(client) {
        super(client, {
            name: 'purge',
            group: 'simple',
            memberName: 'purge',
            description: "dad",
            aliases: ["clear"]
        });
    }

    async run(message, args)
    {
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
		});
		message.channel.bulkDelete(fetched)
			.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
            await message.channel.send(`Successfully deleted ${args} messages`)       
    }
}

module.exports = AvatarCommand;