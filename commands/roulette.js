const fs = require('fs')
const Discord = require('discord.js')
const Roulette = require('simply-roulette');

module.exports.run = async (bot, message, args) => {
    if((args[0] >= 0 && args[0] <= 36) || (args[0] == "black" || args[0] == "red" || args[0] == "odd" || args[0] == "even")) {
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
         if(args[1] > UserJSON[message.author.id].bal || isNaN(args[1])) return message.channel.send("You don't have enough balance!")
         const Table = new Roulette()
         Table.addBet('one', `${args[0]}`, `${args[1]}`);
         UserJSON[message.author.id].bal = UserJSON[message.author.id].bal - Math.abs(args[1])
         fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))  
         var i=1
         Table.startGame()
         Table.on('spin', (results) => {
               if(results.spot.number == args[0]) {
                  const embed = new Discord.MessageEmbed()
                  .setColor('#32CD32')
                  .setTitle("**You won!**")
                  .addField(`Bot rolled **${results.spot.number}**`, `Color **${results.spot.colour}**`)
                  .addField('**Prize**', Math.abs(args[1]) * 5)
                  .setTimestamp()
                  message.channel.send(embed)

                  UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.abs(args[1]) * 5
               } else if(results.spot.colour == args[0]) {
                  const embed = new Discord.MessageEmbed()
                  .setColor('#32CD32')
                  .setTitle("**You won!**")
                  .addField(`Bot rolled **${results.spot.number}**`, `Color **${results.spot.colour}**`)
                  .addField('**Prize**', Math.abs(args[1]) * 2)
                  .setTimestamp()
                  message.channel.send(embed)

                  UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.abs(args[1]) * 2
               } else if(args[0] == "odd" && results.spot.number % 2 != 0) {
                  const embed = new Discord.MessageEmbed()
                  .setColor('#32CD32')
                  .setTitle("**You won!**")
                  .addField(`Bot rolled **${results.spot.number}**`, `Color **${results.spot.colour}**`)
                  .addField('**Prize**', Math.abs(args[1]) * 2 )
                  .setTimestamp()
                  message.channel.send(embed)

                  UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.abs(args[1]) * 2
               } else if(args[0] == "even" && results.spot.number % 2 == 0) {
                  const embed = new Discord.MessageEmbed()
                  .setColor('#32CD32')
                  .setTitle("**You won!**")
                  .addField(`Bot rolled **${results.spot.number}**`, `Color **${results.spot.colour}**` )
                  .addField('**Prize**', Math.abs(args[1]) * 2 )
                  .setTimestamp()
                  message.channel.send(embed)

                  UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.abs(args[1]) * 2
               } else {
                  const embed = new Discord.MessageEmbed()
                  .setColor('#FF0000')
                  .setTitle("**You lost!**")
                  .addField(`Bot rolled **${results.spot.number}**`, `Color **${results.spot.colour}**` )
                  .addField('**Prize**', `**-${Math.abs(args[1])}**` )
                  .setTimestamp()
                  message.channel.send(embed)
               }
               i++;
               if(i==2)
               Table.stopGame();
               fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))  
            })
      } else {
         return message.channel.send('Correct usage: `!roulette <bet type> <bet>`')
      }
}


module.exports.help = {
    name: "roulette",
    aliases: []
}
