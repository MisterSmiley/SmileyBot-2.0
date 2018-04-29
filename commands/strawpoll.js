const sf = require('snekfetch');
const discord = require('discord.js');

exports.run = async (bot, msg, args) => {
        if (!args[0] || !args[1] || !args[2] || !args.join().includes('"')) {
            return msg.channel.send('Please give at least 2 options and a title.');
        }
        let title = args.join(' ').split('"')[1];
        if (args.slice(title.split(' ').length).join(' ').split(',').length < 2) {
            return msg.channel.send('Please give at least 2 options');
        }
        var poll = { title: title, options: [ args.slice(title.split(' ').length).join(' ').split(',') ] };
await sf.post({
              url: 'https://strawpoll.me/api/v2/polls',
              followAllRedirects: true, 
              body: poll,
              json: true
        });
        let choices = args.slice(title.split(' ').length).join(' ').split(',');
        const embed = new discord.RichEmbed()
            .setTitle('Strawpoll | \'' + title + '\'')
            .setDescription(`[Click here for the strawpoll](http://strawpoll.me/${poll.body.id})`)
            .setColor('#eacd10')
            .addField('Strawpoll created from:', msg.author.tag)
            .addField('Choices:', choices);

        msg.channel.send({embed});
};

exports.help = {
    category: 'util',
    usage: '"title of poll" [poll options (separated with `,`)]',
    description: 'Creates a strawpoll',
    detail: 'Creates a new strawpoll with given options',
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm: [],
    example: '"Is SmileyBot the best bot ever?" Yes,No',
    alias: [
        'poll'
    ]
};
