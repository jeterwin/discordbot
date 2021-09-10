const jimp = require('jimp')

module.exports.run = async (bot, message, args) => {
        let user = message.mentions.users.first()
        if(user)
        var userimg = user.displayAvatarURL({format: 'png', size: 512})
        else
        var userimg = message.author.displayAvatarURL({format: 'png', size: 512})
        var imgs = [userimg, "jail.png"];
        var jimps = [];
      
        for (var i = 0; i< imgs.length; i++){
          jimps.push(jimp.read(imgs[i]));
        }
      
      
        Promise.all(jimps).then(function(data){
          return Promise.all(jimps);
        }).then(function(data){
          data[0].composite(data[1],0,0);
      
          data[0].write("jailed.png", function() {
            message.channel.send({files: ["jailed.png"]})
          })
        })
         
}


module.exports.help = {
    name: "jail",
    aliases: []
}
