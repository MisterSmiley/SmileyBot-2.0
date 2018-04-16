const config = require('../config/config.json');
exports.run = async (client, msg, args) => {
    msg.channel.send("<:annonces:403632327328268301>");
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
