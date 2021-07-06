const commando = require("discord.js-commando")
const discord = require('discord.js')

class ballCommand extends commando.Command
{
    constructor(client) {
        super(client, {
            name: '8ball',
            group: 'fun',
            memberName: '8ball',
            description: "dat"
        })
    }

    async run(message, args)
    {
            if(args == " ")
            message.channel.send("tf u gon ask")
            else
            {
                const answers = [
                "It is Certain.", 
                "It is decidedly so.", 
                "Without a doubt.",
                "Yes definitely.",
                "You may rely on it.",
                
                "As I see it, yes.",
                "Most likely.",
                "Outlook good.",
                "Yes.",
                "Signs point to yes.",
                
                "Reply hazy, try again.",
                "Ask again later.",
                "Better not tell you now.",
                "Cannot predict now.",
                "Concentrate and ask again.",
                
                "Don't count on it.",
                "My reply is no.",
                "My sources say no.",
                "Outlook not so good.",
                "Very doubtful."
            ]
            const answer = Math.floor(Math.random() * answers.length)
            message.channel.send(answers[answer])
            }
    }
}

module.exports = ballCommand;