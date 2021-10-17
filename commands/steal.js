const fs = require("fs")
const talkedRecently = new Set();

module.exports.run = async (bot, message, args) => {
    var status = JSON.parse(fs.readFileSync("./status.json"))
    if(!status[message.author.id]) {
        status[message.author.id] = {
            luck: 0
       }
   }
    if(talkedRecently.has(message.author.id))
      return message.channel.send(`${message.author.username} chill, you can only steal once per hour!`)
    else {
        var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
        var user = message.mentions.users.first()
        if(!user || user == message.author) {
            if(!UserJSON[message.author.id])
            {
                UserJSON[message.author.id] = {
                    bal: 50,
                    background: 1,
                    highestBG: 1
                }
                fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
            }
            return message.channel.send('Correct usage: `!steal <@user>`')
        }
        if(!UserJSON[user.id]) {
            UserJSON[user.id] = {
                bal: 50,
                background: 1,
                highestBG: 1
            }
            fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
        }
        let chance = Math.ceil(Math.random() * 100) + 1
        if(chance >= 1 && chance <= (10 + status[message.author.id].luck)) {
            message.channel.send(`${message.author.username}, you stole 10% of ${user.username}'s 💸'`)
            UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.floor(0.1 * UserJSON[user.id].bal)
            UserJSON[user.id].bal = UserJSON[user.id].bal - Math.floor(UserJSON[user.id].bal * 0.1)
            fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
        }
        else {
            message.channel.send(`Lmao you tripped over while trying to rob ${user.username}, losing 25% of your 💸!`)
            UserJSON[message.author.id].bal = UserJSON[message.author.id].bal - Math.floor(0.25 * UserJSON[message.author.id].bal)
            fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
        }
        /*  Cooldown  */
        talkedRecently.add(message.author.id);
        setTimeout(() => {
        talkedRecently.delete(message.author.id);
        }, 60000);
    }
}

module.exports.help = {
    name: "steal",
    aliases: []
}
