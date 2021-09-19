const Discord = require("discord.js")
const malScraper = require('mal-scraper')
const pagination = require('discord.js-pagination')
module.exports.run = async (bot, message, args) => {

    malScraper.getInfoFromName(`${args}`)
    .then((data) => 
    {
        console.log(data)
            if(data.rating == 'Rx - Hentai' || data.rating == 'R+ - Mild Nudity')
                {
                    if(message.channel.nsfw)
                    {
                        const page1 = new Discord.MessageEmbed()
                        .setTitle(data.title)
                        .setURL(data.url)
                        .setDescription(data.synopsis)
                        .addField("Score: ", `${data.score} ⭐`)
                        .addField("Genres: ", `${data.genres} 📙`)
                        .addField("Number of episodes: ", `${data.episodes} 📅`)
                        .addField("Type: ", `${data.type} 📺`)
                        .setColor("#FFE194")
                        .setImage(data.picture)
                
                        const page2 = new Discord.MessageEmbed()
                        .setTitle("Characters")
                        data.characters.forEach(character => {
                            page2.addField(`${character.name}`, `${character.role}`)
                            page2.setThumbnail(`${data.characters[0].picture}`)
                            page2.setImage(`${data.characters[1].picture}`)
                            page2.setColor("#FFB319")
                        })
                        const pages = [
                            page1,
                            page2
                        ]
                        const emoji = ["◀️", "▶️"]
                        const timeout = '100000'
                        return pagination(message, pages, emoji, timeout)
                    }                     
                    else
                    return message.channel.send("You just searched hentai and this is not a NSFW channel!")
                    } else {             
                        const page1 = new Discord.MessageEmbed()
                        .setTitle(data.title)
                        .setURL(data.url)
                        .setDescription(data.synopsis)
                        .addField("Score: ", `${data.score} ⭐`)
                        .addField("Genres: ", `${data.genres} 📙`)
                        .addField("Number of episodes: ", `${data.episodes} 📅`)
                        .addField("Type: ", `${data.type} 📺`)
                        .setColor("#FFE194")
                        .setImage(data.picture)
                
                        const page2 = new Discord.MessageEmbed()
                        .setTitle("Characters")
                        data.characters.forEach(character => {
                            page2.addField(`${character.name}`, `${character.role}`)
                            page2.setThumbnail(`${data.characters[0].picture}`)
                            page2.setImage(`${data.characters[1].picture}`)
                            page2.setColor("#FFB319")
                        })
                        const pages = [
                            page1,
                            page2
                        ]
                        const emoji = ["◀️", "▶️"]
                        const timeout = '100000'
                        return pagination(message, pages, emoji, timeout)
                    }
        
            
                })
            }
        
module.exports.help = {
    name: "anime",
    aliases: []
}
