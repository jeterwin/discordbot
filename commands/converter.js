module.exports.run = async (bot, message, args) => {
    if(args == "")
    return message.channel.send("Correct usage: `!convert 5 kg | lb | 5 6 ft | 170 cm` \n")
    let messageArray = message.content.split(" ")
    if(messageArray[2].toLowerCase() == "kg")
    return message.channel.send(`${messageArray[1]} kg to lb is equal to ${(args[0] / 0.45359237).toFixed(2)} lb`)
    if(messageArray[2].toLowerCase() == "lb")
    return message.channel.send(`${messageArray[1]} lb to kg is equal to ${(args[0] * 0.45359237).toFixed(2)} kg`)
    if(!isNaN(args[0]) && !isNaN(args[1]) && messageArray[3].toLowerCase() == "ft")
    return message.channel.send(`${messageArray[1]}'${messageArray[2]} ft to cm is equal to ${(((args[0] * 12) + Number(args[1])) *  2.54 * 0.01).toFixed(2) * 100} cm`)
    if(!isNaN(args[0]) && messageArray[2].toLowerCase() == "ft")
    return message.channel.send(`${messageArray[1]} ft to cm is equal to ${((args[0] * 12) *  2.54 * 0.01).toFixed(2) * 100} cm`)
    if(!isNaN(args[0]) && messageArray[2].toLowerCase() == "cm")
    return message.channel.send(`${messageArray[1]} cm to ft is equal to ${((args[0] / 12) /  2.54 / 1).toFixed(2)} ft`)
}


module.exports.help = {
    name: "convert",
    aliases: ["converter", "conv"]
}
