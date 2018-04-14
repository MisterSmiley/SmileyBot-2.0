const Discord = require('discord.js');
const request = require('request')
exports.run = async (client, msg, args) => {
    let member = msg.mentions.members.first()
      let botid = member.user.id
        request('https://discordbots.org/api/bots/' + botid, (e, r, b)=> {
          let contenu = JSON.parse(b)
        if(contenu.error === "Not found")  {
          msg.channel.send("Ceci n'est pas un bot ou il n'est pas encore approuvé");
        } else {
        const embed = new Discord.RichEmbed()
          embed.setTitle(contenu.username)
          embed.setColor("#c20d0d")
          embed.setFooter("Fait avec l'API discordbots.org");
          embed.setTimestamp()
          embed.addField("Description", contenu.shortdesc)
          embed.addField("Certification", contenu.certifiedBot === true ? "Oui ✅" : "Non ❎")
          embed.addField("Nombres de serveurs", contenu.server_count)
          embed.addField("Librairie utilisé", contenu.lib)
          embed.addField("Ajouté le", contenu.date)
          embed.addField("Prefix", contenu.prefix)
          embed.addField("Liens", "[Invitation](" + contenu.invite + ")\n[DBL.org](https://discordbots.org/bot/" + botid + " )\n[Github](" + contenu.github + ")\n[Website](" + contenu.website + ")")
          embed.addField("Votes", contenu.points)
          msg.channel.send({embed});
        }
    })
}

exports.help = {
    usage: '[text]',
    description: 'Search a bot in dborg database',
    detail: '',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    category: 'util',
    example: '@bot#4792',
    alias: [
        null
    ]
};