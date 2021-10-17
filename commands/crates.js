const fs = require("fs")
const discord = require("discord.js")
module.exports.run = async (bot, message, args) => {
    var cratesJSON = JSON.parse(fs.readFileSync("./crates.json"))
    var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
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
    if(args == "") {
        let embed = new discord.MessageEmbed()
        .setTitle(`${message.author.username}, you currently have:`)
        .setDescription(`${cratesJSON[message.author.id].legendary} Legendary crates 🥇\n\n ${cratesJSON[message.author.id].rare} Rare crates 🥈\n\n ${cratesJSON[message.author.id].common} Common crates 🥉`)
        .setColor("#DAA520")
        return message.channel.send(embed)
    }
    if(args[0] == "open" && args[1] != undefined) {
        switch(args[1].toLowerCase()) {
            case "common":
                {
                    if(cratesJSON[message.author.id].common != 0) {
                    message.channel.send(`${message.author}, you just earned 200 💸 by opening a common crate!`)
                    cratesJSON[message.author.id].common = cratesJSON[message.author.id].common - 1
                    UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + 200
                    fs.writeFileSync("./crates.json", JSON.stringify(cratesJSON))
                    fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
                    }
                    else
                    return message.channel.send("You don't have any common crates to open!")
                    break;
                }
            case "rare":
                {
                    if(cratesJSON[message.author.id].rare != 0) {
                    message.channel.send(`${message.author}, you just earned 5000 💸 by opening a rare crate!`)
                    cratesJSON[message.author.id].rare = cratesJSON[message.author.id].rare - 1
                    UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + 5000
                    fs.writeFileSync("./crates.json", JSON.stringify(cratesJSON))
                    fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))                      
                    }
                    else
                    return message.channel.send("You don't have any rare crates to open!")
                    break;
                }
            case "legendary":
                {
                    if(cratesJSON[message.author.id].legendary != 0) {
                    message.channel.send(`${message.author}, you just earned 20000 💸 by opening a legendary crate!`)
                    cratesJSON[message.author.id].legendary = cratesJSON[message.author.id].legendary - 1
                    UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + 20000
                    fs.writeFileSync("./crates.json", JSON.stringify(cratesJSON))
                    fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))              
                    }
                    else
                    return message.channel.send("You don't have any legendary crates to open!")
                    break;
                }
        }
    } else return message.channel.send("Correct usage: `!crates open common | rare | legendary`")
}

module.exports.help = {
    name: "crate",
    aliases: ["crates"]
}
