
var nani = require("nani").init("mistersmiley-mvo1y", "tsr8a9thmJQJ23Xon9gY3zTddcrb8");
const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
msg.channel.send(" 🔍 *Searching...* 🔍");
      nani.get('manga/search/' + args).then(function(r) {
        if (r.length == 0 || r == null) {
          msg.channel.send("❌ Nothing found ");
          return
        } else {
          nani.get('manga/' + r[0].id).then(function(data) {
            var cleanText = data.description.replace(/<\/?[^>]+(>|$)/g, "");
              var mangaEmbed = new Discord.RichEmbed()
              .setDescription(cleanText)
              .addField(`**Names: **`, `${data.title_japanese}, ${data.title_romaji}, ${data.title_english}`)
              .addField("**Type: **", data.type)
              .addField("**Genres: **", data.genres)
              .addField("**Score: **", data.average_score)
              .addField("**Status: **", data.airing_status)
              .addField("**Start Date: **", data.start_date.substr(0, 10))
              .addField("Source", `[AniList](http://anilist.co/manga/${data.id})`)
              .setImage(data.image_url_lge)
              .setColor("RANDOM")
              msg.channel.send(mangaEmbed);
            })
        }
      }).catch(function(e) {
        console.log(e);
        msg.channel.send("❌ Nothing found ");
      });
    }
    
    exports.help = {
    category: 'fun',
    usage: false,
    description: 'Search a manga',
    detail: 'Search a manga',
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm: [],
    example: false,
    alias: [
        null
    ]
};
