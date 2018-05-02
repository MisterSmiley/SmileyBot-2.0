const Hirez = require('hirez.js')
 
let hirez = new Hirez({
  devId: '2586',
  authKey: 'F834134C87134905A5C0C07877C1702F'
})

exports.run = async (client, msg, args) => {
    hirez.paladins('PC').session.generate()
  .then((res) => {
})
hirez.paladins('PC').getMatchHistory('AlexGames360')
  .then((res) => {
  console.log(res)
  })
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
