const Fortnite = require('fortnite');
const stats = new Fortnite("NDA5Mjg3NDM1MzkwODEyMTcw.DcYCkA.nrFqjWvZ0OhZuuZ_gNLtc5T5Ttc");
const Discord = require('discord.js')

exports.run = (client, msg, args) => {
    if (!['pc','xbl','psn'].includes(args[0])) return msg.channel.send('**Please Include the platform: `&fortnite [ pc | xbl | psn ] <username>`**');
    if (!args[1]) return msg.channel.send('**Please Include the username: `&fortnite [ pc | xbl | psn ] <username>`**');
    
    var platform = args.shift(); 
    var username = args.join(' '); 
    
    stats.getInfo(username, platform).then(data => {
      
      const embed = new Discord.RichEmbed() 
        .setColor(0xffffff) 
        .setTitle(`Stats for ${data.username}`) 
        .setDescription(`**Top Placement**\n\n**Top 3:** *${data.lifetimeStats[0].value}*\n**Top 5:** *${data.lifetimeStats[1].value}*\n**Top 6:** *${data.lifetimeStats[3].value}*\n**Top 12:** *${data.lifetimeStats[4].value}*\n**Top 25:** *${data.lifetimeStats[5].value}*`, true) // We can have other information look different, in fields or in the description.
        .setThumbnail('https://vignette.wikia.nocookie.net/fortnite/images/d/d8/Icon_Founders_Badge.png')
        .addField('Total Score', data.lifetimeStats[6].value, true)
        .addField('Matches Played', data.lifetimeStats[7].value, true)
        .addField('Wins', data.lifetimeStats[8].value, true)
        .addField('Win Percentage', data.lifetimeStats[9].value, true)
        .addField('Kills', data.lifetimeStats[10].value, true)
        .addField('K/D Ratio', data.lifetimeStats[11].value, true)
        .addField('Kills Per Minute', data.lifetimeStats[12].value, true)
      
      msg.channel.send(embed)
        
    })
    .catch(error => { 
      
      msg.channel.send('Username not found!');
      console.log(error)

    
    })
}

exports.help = {
    category: 'util',
    usage: '<platform> <username>',
    description: 'Fortnite Stats',
    detail: 'Fortnite Stats',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    example: '@user#3476',
    alias: [
        'ftn'
    ]
};
