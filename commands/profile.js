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

        const circle = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 70,
        }
const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;

	do {
		context.font = `${fontSize -= 10}px Roboto`;
	} while (context.measureText(text).width > canvas.width / 1.65);

	return context.font;
}

        context.font = applyText(canvas, `${message.author.username}!`);
        context.fillStyle = '#ffffff';
        context.fillText(`${message.author.username}`, canvas.width / 4, canvas.height / 1.25);

        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg', size: 4096 }));
        const aspect = avatar.height / avatar.width;
        const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
        const hsy = circle.radius * Math.max(aspect, 1.0);
        context.drawImage(avatar,circle.x - hsx,circle.y - hsy,hsx * 2,hsy * 2);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

        message.channel.send({ files: [attachment] });          
    }
}


module.exports.help = {
    name: "profile",
    aliases: []
}
