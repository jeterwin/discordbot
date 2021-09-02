const commando = require('discord.js-commando')
const { Discord, MessageAttachment } = require('discord.js')
const Canvas = require('canvas');
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
    var UserJSON = JSON.parse(fs.readFileSync("./bani.json"))
    if(!UserJSON[message.author.id])
    {
        UserJSON[message.author.id] = {
            bal: 50,
            background: 1,
            highestBG: 1
        }
    }
    fs.writeFileSync("./bani.json", JSON.stringify(UserJSON))         
    if(args == "")
    {
        const background = await Canvas.loadImage(`./backgrounds/${UserJSON[message.author.id].background}.png`);
        const canvas = Canvas.createCanvas(250, 400);
        const context = canvas.getContext('2d');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        context.strokeStyle = '#0099ff';
        context.strokeRect(0, 0, canvas.width, canvas.height);

        context.font = '28px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText(`${message.author.username}`, canvas.width / 4, canvas.height / 1.6);

        context.beginPath();
        context.arc(70, 70, 65, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg', size: 4096 }));
        context.drawImage(avatar, 0, 0, 140, 140);



        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

        message.channel.send({ files: [attachment] });          
    }
}


module.exports.help = {
    name: "profile",
    aliases: []
}
