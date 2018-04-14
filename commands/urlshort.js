const regTest = new RegExp(
    '^' +
    '(?:(?:https?|ftp)://)' +
    '(?:\\S+(?::\\S*)?@)?' +
    '(?:' +
    '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
    '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
    '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
    '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
    '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
    '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
    '|' +
    '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
    '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
    '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
    '\\.?' +
    ')' +
    '(?::\\d{2,5})?' +
    '(?:[/?#]\\S*)?' +
    '$', 'i'
);
const sf = require('snekfetch');
const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
    if (!args[0] || !regTest.test(args[0])) {
        return msg.channel.send('Please give a valid URL');
    }
        sf.post('https://www.googleapis.com/urlshortener/v1/url?key=' + require('../config/config.json').URLSHORTAPI).send({longUrl: args[0]}).then(res => {
            const embed = new Discord.RichEmbed()
                .addField('URL Shortening from', msg.author.tag, true)
                .addField('URL to shorten', args[0], true)
                .addField('Shortened URL', res.body.id, true)
                .setTimestamp()
            msg.channel.send({embed});
        }).catch(logger.error);
};

exports.help = {
    category: 'util',
    usage: '[url]',
    description: 'Shorten an URL',
    detail: `Shortens an URL with Google's API`,
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm: [],
    example: 'https://google.com/',
    alias: [
        'url',
        'shorten'
    ]
};
