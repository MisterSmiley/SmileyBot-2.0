const Hirez = require('hirez.js')
const snekfetch = require('snekfetch');

var hirez = new Hirez({
  devId: '2586',
  authKey: 'F834134C87134905A5C0C07877C1702F'
})

exports.run = async (client, msg, args) => {
    hirez.paladins('PC').session.generate()
  .then((res) => {
})
 
hirez.paladins('PC').getUser('AlexGames360')
  .then((res) => {
 snekfetch.post('https://www.hastebin.com/documents').send(res)
 .then(reply => {
  msg.channel.send(`https://www.hastebin.com/${reply.body.key}.js`);
 }});
};
  
  exports.help = {
    category: 'DeveloperOnly',
    usage: 'test',
    description: 'test',
    detail: 'test',
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm: [],
    example: 'test',
    alias: [
        null
    ]
};
