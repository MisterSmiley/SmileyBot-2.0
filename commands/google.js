const Discord = require('discord.js');
const google = require('google');

exports.run = (client, msg, args) => {
    const toSearch = args.join(' ');
    let links = [];
    if (!toSearch) {
        return msg.reply('Please insert something to search');
    }

    google(toSearch, async (err, res) => {
        for (var i = 0; i < 1; ++i) {
    var link = res.links[i];
            
        await msg.react('<:google:450812327118241793>');
        let embed = new Discord.RichEmbed()
        .setThumbnail("https://cdn.discordapp.com/attachments/413814161395548162/450812278346874881/2000px-Google__G__Logo.svg.png")
        .setColor("#c20d0d")
        .setTimestamp()
        .setTitle("SmileyBot")
        .addField("**<:google:450812327118241793> I found**", `[${link.title}](${link.href}) \n\n${link.description}`)
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
