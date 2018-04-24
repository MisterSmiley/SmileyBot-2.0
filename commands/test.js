const config = require('../config/config.json');
const Discord = require('discord.js')
exports.run = async (client, msg, args) => {
    let pages = ["Test1", "Test2"]
    let page = 1;
    const embed = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setFooter(`Page ${page} of ${pages.length}`)
        .setDescription(pages[page - 1])

    msg.channel.send(embed).then(msgEmbed => {

        msgEmbed.react('⏪').then(r => { msgEmbed.react('⏩')
            
            const backwards = msgEmbed.createReactionCollector((reaction, user) => reaction.emoji.name === '⏪' && user.id === msg.author.id, { time: 60000 });
            const forwards = msgEmbed.createReactionCollector((reaction, user) => reaction.emoji.name === '⏩' && user.id === msg.author.id, { time: 60000 });

            function reset() {
                embed.setDescription(pages[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msgEmbed.edit(embed)
            }

            backwards.on('collect', r => {
                if (page === 1) return;
                page--;
                reset()
            })

            forwards.on('collect', r => {
                if (page === pages.length) return;
                page++;
                reset()
            })
        })
    })
}
exports.help = {
    category: 'devonly',
    usage: '[devonly]',
    description: 'devonly',
    detail: 'devonly',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    alias: [
    ],
    example: 'devonly'
};
