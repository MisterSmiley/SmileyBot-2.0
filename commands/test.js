const config = require('../config/config.json');
const Discord = require('discord.js')
exports.run = async (client, msg, args) => {
    var test = new Discord.RichEmbed()
    .addField("test", "<:annonces:403632327328268301>")
    msg.channel.send(test)
};
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
