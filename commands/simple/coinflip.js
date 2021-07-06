const commando = require("discord.js-commando")

class CoinFlipCommand extends commando.Command
{
    constructor(client) {
        super(client, {
            name: 'flip',
            group: 'fun',
            memberName: 'flip',
            description: "da"
        });
    }

    async run(message, args)
    {
        var chance = Math.floor(Math.random() * 2)
        if(chance == 0)
        {
            message.reply("1")
        }
        else
        message.reply("2")
    }
}

module.exports = CoinFlipCommand;