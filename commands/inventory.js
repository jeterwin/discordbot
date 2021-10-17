const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    var inventory = JSON.parse(fs.readFileSync("./inventory.json"))
    if(!inventory[message.author.id]) {
        inventory[message.author.id] = {
            potions: 0
        }
    fs.writeFileSync("./inventory.json", JSON.stringify(inventory))
    }
    if(args == "") {
        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.username}'s inventory!`)
        if(inventory[message.author.id].potions == 0) // || inventory[message.author.id].ceUrmeaza)
        embed.setDescription("Your inventory is empty!")
        else
        embed.addField("Luck potions: ", inventory[message.author.id].potions)
        embed.setFooter('In order to use an item: `!inv use <item>`', message.author.displayAvatarURL())
        message.channel.send(embed)
    }
    else if(args[0] == "use" && (args[1] == "potion" || args[1] == "potions")) {
            var status = JSON.parse(fs.readFileSync("./status.json"))
            if(!status[message.author.id]) {
                status[message.author.id] = {
                    luck: 0
                }
            }
        fs.writeFileSync("./status.json", JSON.stringify(status))
        status[message.author.id].luck = status[message.author.id].luck + 15
        inventory[message.author.id].potions = inventory[message.author.id].potions - 1
        fs.writeFileSync("./status.json", JSON.stringify(status))
        fs.writeFileSync("./inventory.json", JSON.stringify(inventory))
        message.channel.send(`${message.author.username}, your stealing chance has increased by 15% for the next 6 hours`)
        setTimeout(() => {
        status[message.author.id].luck = 0
        fs.writeFileSync("./status.json", JSON.stringify(status))
        }, 21600000);
    }
}

module.exports.help = {
    name: "inventory",
    aliases: ["inv"]
}