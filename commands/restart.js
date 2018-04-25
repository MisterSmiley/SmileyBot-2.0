exports.run = async (client, msg, args) => {
if (msg.author.id === "110932722322505728"){
                        if(client.voiceConnection){
                            client.voiceConnection.destroy();
                        }
                        msg.channel.send("Bientôt de retour !").then(message => {
                            exec('node app.js', (error, stdout, stderr) => {
                                if (error) {
                                    console.error(`exec error: ${error}`);
                                    msg.channel.send(`exec error: ${error}`);
                                    return;
                                }
                                console.log(`stdout: ${stdout}`);
                                console.log(`stderr: ${stderr}`);
                            });
                            bot.destroy();
                        }).catch(console.log);
                    }
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
