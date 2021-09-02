const Discord = require("discord.js")
const malScraper = require('mal-scraper')
const search = malScraper.search

module.exports.run = async (bot, message, args) => {
  const type = 'manga'
  search.search(type, {
    term: `${args}`,
    maxResults: 1,
    genreType: 1, // 0 for include genre list, 1 for exclude genre list
  })
  .then((manga) => {
    let page1 = new Discord.MessageEmbed()
    .setColor("#90EE90")
    .setTitle(manga[0].title)
    .setURL(manga[0].url)
    .setDescription(manga[0].shortDescription)
    .setImage(manga[0].thumbnail)
    .addField("Score: ", `${manga[0].score} ⭐`)
    if(manga[0].vols == '-')
    page1.addField("Volumes: ", `Currently Publishing 📙`)
    else
    page1.addField("Volumes: ", `${manga[0].vols} 📙`)
    if(manga[0].nbChapters == '-')
    page1.addField("Chapters: ", `Currently Publishing 📙`)
    else
    page1.addField("Chapters: ", `${manga[0].nbChapters} 📙`)
    .addField("Type: ", `${manga[0].type} 📺`)

    return message.channel.send(page1)
  }).catch((err) => {
    return message.channel.send("Could not find that manga!")
  })
}

module.exports.help = {
    name: "manga",
    aliases: []
}
