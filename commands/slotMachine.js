const osu = require('node-osu');
const commando = require('discord.js-commando')
const Discord = require('discord.js')
const fs = require("fs")
const { SlotMachine, SlotSymbol } = require('slot-machine');

module.exports.run = async (bot, message, args) => {
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
    if(args[0] == "" || isNaN(args[0]))
    {
        return message.channel.send("Please bet a number")
    }
    else if(args[0] > UserJSON[message.author.id].bal)
    {
        return message.channel.send("You don't have enough to play the machine")
    }
    else
    {
        UserJSON[message.author.id].bal = UserJSON[message.author.id].bal - Number(args[0]);
        fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))

        const cherry = new SlotSymbol('cherry', {
            display: '🍒',
            points: Math.ceil(Number(args[0])/1.5),
            weight: 12.5
        })
         
        const money = new SlotSymbol('money', {
            display: '💰',
            points: Math.ceil(Number(args[0])/1.5),
            weight: 12.5
        })
         
        const wild = new SlotSymbol('wild', {
            display: '❔',
            points: Math.ceil(Number(args[0])*2),
            weight: 12.5,
            wildcard: true
        })
        const clover = new SlotSymbol('clover', {
            display: '🍀',
            points: Math.ceil(Number(args[0])/1.5),
            weight: 12.5,
        })
        const lemon = new SlotSymbol('lemon', {
            display: '🍋',
            points: Math.ceil(Number(args[0])/1.5),
            weight: 12.5,
        })
        const grapes = new SlotSymbol('grapes', {
            display: '🍇',
            points: Math.ceil(Number(args[0])/1.5),
            weight: 12.5
        })
        const watermelon = new SlotSymbol('watermelon', {
            display: '🍉',
            points: Math.ceil(Number(args[0])/1.5),
            weight: 12.5
        })
        const bell = new SlotSymbol('bell', {
            display: '🔔',
            points: Math.ceil(Number(args[0])/1.5),
            weight: 12.5
        })
        const machine = new SlotMachine(3, [cherry, money, wild, clover, lemon, grapes, watermelon]);
        const results = machine.play();
 
        message.channel.send(results.visualize());
        var embed = new Discord.MessageEmbed()
        .setColor("#ffff00")
        .setDescription(`You have won ${Math.ceil(results.totalPoints)} 💸!`)
        message.channel.send(embed)
        UserJSON[message.author.id].bal = UserJSON[message.author.id].bal + Math.ceil(results.totalPoints);
        fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))
    }
}

module.exports.help = {
    name: "slotmachine",
    aliases: []
}