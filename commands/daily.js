const discord = require("discord.js")
const commando = require("discord.js-commando")
const fs = require("fs")
const talkedRecently = new Set();

module.exports.run = async (bot, message, args) => {
    var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
    var cratesJSON = JSON.parse(fs.readFileSync("./crates.json"))
    var inventory = JSON.parse(fs.readFileSync("./inventory.json"))
    var chanceCommon = Math.floor(Math.random() * 100) + 1
    var chanceRare = Math.floor(Math.random() * 100) + 1
    var chanceLegendary = Math.floor(Math.random() * 100) + 1
    var chancePotion = Math.floor(Math.random() * 100) + 1
    if(!UserJSON[message.author.id])
    {
        UserJSON[message.author.id] = {
            bal: 50,
            background: 1,
            highestBG: 1
        }
        fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
    }
    if(!cratesJSON[message.author.id]) {
        cratesJSON[message.author.id] = {
            common: 0,
            rare: 0,
            legendary: 0
        }
    fs.writeFileSync("./crates.json", JSON.stringify(cratesJSON))
    }

    if (talkedRecently.has(message.author.id)) {
        message.channel.send(`${message.author.username}, you can use daily once every 24 hours!`);
    } else {
        let embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Daily 💸 !")
        .setDescription(`${message.author.username}, you just gained 200 💸 by using daily!`)
        .setTimestamp()

        if(chanceCommon >= 50 && chanceCommon <= 100) {
            cratesJSON[message.author.id].common = cratesJSON[message.author.id].common + 1
            embed.addField(`🎁 And also earned a common crate!`, "You can open it by typing `!crate open common`")
            embed.setColor("#878787")
            fs.writeFileSync("./crates.json", JSON.stringify(cratesJSON))
        }
        if(chanceRare >= 25 && chanceRare <= 49) {
            cratesJSON[message.author.id].rare = cratesJSON[message.author.id].rare + 1
            embed.addField(`🎁 And also earned a rare crate!`, "You can open it by typing `!crate open rare`")
            embed.setColor("#BF40BF")
            fs.writeFileSync("./crates.json", JSON.stringify(cratesJSON))
        }
        if(chanceLegendary >= 1 && chanceLegendary <= 10) {
            cratesJSON[message.author.id].legendary = cratesJSON[message.author.id].legendary + 1
            embed.addField(`🎁 And also earned a legendary crate!`, "You can open it by typing `!crate open legendary`")
            embed.setColor("#DAA520")
            fs.writeFileSync("./crates.json", JSON.stringify(cratesJSON))
        }
        if(chancePotion >= 1 && chancePotion <= 75) {
            if(!inventory[message.author.id]) {
                inventory[message.author.id] = {
                    potions: 0
                }
            fs.writeFileSync("./inventory.json", JSON.stringify(inventory))
            }
            inventory[message.author.id].potions = inventory[message.author.id].potions + 1
            embed.addField(`🧪 And also earned a luck increasing potion!`, "You can use it by typing `!inv use potion`")
            fs.writeFileSync("./inventory.json", JSON.stringify(inventory))
        }

        message.channel.send(embed)
        UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + 200
        fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
        /*  Cooldown  */
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 86400000);
    }
}
module.exports.help = {
    name: "daily",
    aliases: []
}
