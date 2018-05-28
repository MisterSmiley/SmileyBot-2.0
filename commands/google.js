const Discord = require('discord.js');
const google = require('google');

exports.run = (client, msg, args) => {
    const toSearch = args.join(' ');
    let links = [];
    if (!toSearch) {
        return msg.reply('Please insert something to search');
    }

    google(toSearch, async (err, res) => {
        for (var i = 0; i < res.links.length; ++i) {
    var link = res.links[i];
            
        await msg.react('✅');
        let embed = new Discord.RichEmbed()
        .setTitle("SmileyBot")
        .addField("**I found**", `[${link.title}](${link.href}) \n\n${link.description}`)
        await msg.channel.send(embed);
        }
    });
};

exports.help = {
    category: 'fun',
    usage: '[term]',
    description: 'Search at google',
    detail: `Look for whatever you want when you want`,
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    example: 'Why am I a jake pauler?',
    alias: [
        'g'
    ]
};
