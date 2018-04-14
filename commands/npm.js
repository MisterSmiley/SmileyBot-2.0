const Discord = require('discord.js');
const npmapi = require('api-npm');

exports.run = async (client, msg, args) => {
    let embed = new Discord.RichEmbed()
    if (args[0]) {
      npmapi.getdetails(args.join('-'), data => {
        if (data.name) {
          embed.setColor("#c20d0d");
          embed.setAuthor(data.name, 'https://i.imgur.com/24yrZxG.png', 'https://www.npmjs.com/package/' + data.name);
          embed.setThumbnail("https://i.imgur.com/24yrZxG.png")
          embed.addField(`**${data.name} info's**`, "**Description :** \n\n"+data.description+"\n\n**Lien :**\n\nhttps://www.npmjs.com/package/"+data.name+"\n\n**Keywords :** \n\n"+data.keywords+"\n\n**Installation :** \n\n`npm install --save "+data.name+"`\n\n**Repository :** \n\n"+data.homepage+"\n\n**Auteur :**\n\n"+data.author.name+" \n\n**Mail :** "+data.author.email)
        } else {
          embed.setColor("#c20d0d");
          embed.setTitle("Package not found");
          embed.setDescription(`Package not found`);
        }
        msg.channel.send({embed});
      });
    } else {
      embed.setColor("#c20d0d");
      embed.setTitle("Package not found");
      embed.setDescription(`Package not found`);
      msg.channel.send({embed});
    }
  }

  exports.help = {
    category: 'util',
    usage: false,
    description: 'to do a npm search',
    detail: 'npm search',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    alias: [
        null
    ]
};