const paladins = require('paladins-api');
const pal = new paladins('2116', 'A1A9076FF6214CEDBA99BBF8FD7EC166');
var fs = require('fs');

exports.run = async (client, msg, args) => {
let player_name = args[1];
      msg.channel.send(" 🔍 *Searching " + player_name + "...* 🔍");
  pal.connect((err, res) => {
        if(!err) {
            sessionId = res;
        }
        console.log(err, sessionId)
    });
  pal.getPlayer(sessionId, player_name, (err, res) => {
        if(res == null){
            send(err, null);
            return;
        }
        if(!err){
            var str = JSON.stringify(res).replace("[", "").replace("]", "");
            var str2 = JSON.parse(str);
           msg.channel.send("```" + "[°] Informations basique sur le profile [°]" +
                                 "```"+ "\nNom: " + "                  " + str2.Name +
                                        "\nNiveau: " + "               " + str2.Level +
                                        "\nRegion: " + "               " + str2.Region +
                                        "\nLevel: " + "               " + str2.MasteryLevel +
                                        "\nMatch perdus: " + "         " + str2.Losses +
                                        "\nMatch gagnés: " + "         " + str2.Wins +
                                        "\nMatch total joués: " + "    " + str2.Losses + str3.Wins +
                                        "\nDate de création: " + "     " + str2.Created_Datetime + " (UTC)" +
                                        "\nDernière connexion: " + "   " + str2.Last_Login_Datetime + " (UTC)" +
                                        "```")
        }
  };

  exports.help = {
    category: 'Util',
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
