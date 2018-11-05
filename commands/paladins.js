const paladins = require('paladins-api');
const pal = new paladins('2116', 'A1A9076FF6214CEDBA99BBF8FD7EC166');
var fs = require('fs');

var player_name = process.argv[2];
var api = require("../paladins/getinfos.js");

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function replyErrorInChat(message, errorcode){
  message.reply("Une erreur est survenue, code d'erreur: #" + errorcode +
  "\n Faite passer ce code d'erreur à mon créateur (AnotherFox#0147) ou à un administrateur")
}
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}
exports.run = async (client, msg, args) => {
        let player_name = args[1];
        var splited = player_name.split(":");
        var options = null;
        var cancel = false;
        if(splited.length > 1){
            options = splited[0];
            player_name = splited[1];
        }
        var infosPlayer = [];
        var infosStatus = [];
        var infosChampions = [];
        var stringChampions = null;
        var stringChampions2 = null;
        var stringChampions3 = null;
        message.reply("Recherche en cours sur le joueur " + player_name + " ...")
        console.log("[" + message.author.username + "]" + " Recherche sur le joueur " + player_name + " en cours ...")
        api.getNewSessionID((err, res) => {
            if(err){
                console.log("Impossible de créer une nouvelle session ! Erreur:", err)
            }
        })

        sleep(1000).then(() => {
            if(cancel){
                return;
            }
            api.getPlayerInfos(player_name, (err, res) => {
                if(res == null){
                    cancel = true;
                    message.reply("Le joueur demandé est introuvable");
                    console.log("[" + message.author.username + "]" + " Le joueur " + player_name + " est introuvable !")
                }
                if(!err){
                    infosPlayer = res;
                }
            })
        })
        sleep(2000).then(() => {
            if(cancel){
                return;
            }
            api.getStatusInfos(player_name, (err, res) => {
                if(!err){
                    infosStatus = res;
                }
            })
        })

        if(options != null){
            sleep(3000).then(() => {
                if(cancel){
                    return;
                }
                api.getChampionsInfos(player_name, (err, res) => {
                    if(!err){
                        infosChampions = res;
                        for(var i in infosChampions){
                            if(i >= 20){
                               stringChampions3 += infosChampions[i]["champion"] + " ".repeat(14 - infosChampions[i]["champion"].toString().length) +
                                infosChampions[i]["kills"] + " ".repeat(5 - infosChampions[i]["kills"].toString().length) + "    " +
                                infosChampions[i]["assists"] + " ".repeat(7 - infosChampions[i]["assists"].toString().length) + "   " +
                                infosChampions[i]["deaths"] + " ".repeat(5 - infosChampions[i]["deaths"].toString().length) + "  " +
                                (infosChampions[i]["kills"]/infosChampions[i]["deaths"]).toFixed(2)  + " ".repeat(3 - Math.round((infosChampions[i]["kills"]/infosChampions[i]["deaths"])).toString().length) + " |  " +
                                infosChampions[i]["wins"] + " ".repeat(7 - infosChampions[i]["wins"].toString().length) + "   " +
                                infosChampions[i]["losses"] + " ".repeat(6 - infosChampions[i]["losses"].toString().length) + "   " +
                                infosChampions[i]["played"] + " ".repeat(5 - infosChampions[i]["played"].toString().length) + "   " +
                                Math.round((infosChampions[i]["wins"]/infosChampions[i]["played"])*100) + "%" + " ".repeat(5 - Math.round((infosChampions[i]["wins"]/infosChampions[i]["played"])*100).toString().length) + " |  " +
                                infosChampions[i]["rank"] + "\n";
                            } else
                            if(i >= 10){
                               stringChampions2 += infosChampions[i]["champion"] + " ".repeat(14 - infosChampions[i]["champion"].toString().length) +
                                infosChampions[i]["kills"] + " ".repeat(5 - infosChampions[i]["kills"].toString().length) + "    " +
                                infosChampions[i]["assists"] + " ".repeat(7 - infosChampions[i]["assists"].toString().length) + "   " +
                                infosChampions[i]["deaths"] + " ".repeat(5 - infosChampions[i]["deaths"].toString().length) + "  " +
                                (infosChampions[i]["kills"]/infosChampions[i]["deaths"]).toFixed(2)  + " ".repeat(3 - Math.round((infosChampions[i]["kills"]/infosChampions[i]["deaths"])).toString().length) + " |  " +
                                infosChampions[i]["wins"] + " ".repeat(7 - infosChampions[i]["wins"].toString().length) + "   " +
                                infosChampions[i]["losses"] + " ".repeat(6 - infosChampions[i]["losses"].toString().length) + "   " +
                                infosChampions[i]["played"] + " ".repeat(5 - infosChampions[i]["played"].toString().length) + "   " +
                                Math.round((infosChampions[i]["wins"]/infosChampions[i]["played"])*100) + "%" + " ".repeat(5 - Math.round((infosChampions[i]["wins"]/infosChampions[i]["played"])*100).toString().length) + " |  " +
                                infosChampions[i]["rank"] + "\n";
                            } else {
                                stringChampions += infosChampions[i]["champion"] + " ".repeat(14 - infosChampions[i]["champion"].toString().length) +
                                    infosChampions[i]["kills"] + " ".repeat(5 - infosChampions[i]["kills"].toString().length) + "    " +
                                    infosChampions[i]["assists"] + " ".repeat(7 - infosChampions[i]["assists"].toString().length) + "   " +
                                    infosChampions[i]["deaths"] + " ".repeat(5 - infosChampions[i]["deaths"].toString().length) + "  " +
                                    (infosChampions[i]["kills"]/infosChampions[i]["deaths"]).toFixed(2)  + " ".repeat(3 - Math.round((infosChampions[i]["kills"]/infosChampions[i]["deaths"])).toString().length) + " |  " +
                                    infosChampions[i]["wins"] + " ".repeat(7 - infosChampions[i]["wins"].toString().length) + "   " +
                                    infosChampions[i]["losses"] + " ".repeat(6 - infosChampions[i]["losses"].toString().length) + "   " +
                                    infosChampions[i]["played"] + " ".repeat(5 - infosChampions[i]["played"].toString().length) + "   " +
                                    Math.round((infosChampions[i]["wins"]/infosChampions[i]["played"])*100) + "%" + " ".repeat(5 - Math.round((infosChampions[i]["wins"]/infosChampions[i]["played"])*100).toString().length) + " |  " +
                                    infosChampions[i]["rank"] + "\n";
                            }
                            //console.log(stringChampions);
                        }
                    }
                })
            })

        }
        sleep((options != null) ? 4000 : 3000).then(() => {
            if(cancel){
                return;
            }
            var DateCreation;
            var DateConnexion;
            api.getUTCDateString(infosPlayer["created_datetime"], (res) => {
                DateCreation = res;
            })
            api.getUTCDateString(infosPlayer["last_login_datetime"], (res) => {
                DateConnexion = res;
            })
            message.channel.send("```" + "[°] Informations basique sur le profile" + ((options != null) ? (" + Champions (Total: " + infosChampions["length"] + ")") : "") + " [°]" + "```" +
                                 "```"+ "\nNom: " + "                  " + infosPlayer["name"] +
                                        "\nNiveau: " + "               " + infosPlayer["level"] +
                                        "\nRegion: " + "               " + infosPlayer["region"] +
                                        "\nStatus: " + "               " + infosStatus["status_string"] +
                                        "\nMatch perdus: " + "         " + infosPlayer["losses"] +
                                        "\nMatch gagnés: " + "         " + infosPlayer["wins"] +
                                        "\nMatch total joués: " + "    " + infosPlayer["match_played"] +
                                        "\nRegion: " + "               " + infosPlayer["region"] +
                                        "\nDate de création: " + "     " + DateCreation + " (UTC)" +
                                        "\nDernière connexion: " + "   " + DateConnexion + " (UTC)" +
                                        "```")
            if(options != null){
                message.channel.send("```" + "-----------------------------------------------------------------\n" +
                                        "Nom          Tués    Assists   Morts   Ratio   |  Gagnées   Perdus   Joués   Ratio  |  Rang\n" +
                                       "```")
                if(stringChampions != null){
                    message.channel.send("```" +
                                        stringChampions.replace("null", "")
                                        + "```")
                }
                if(stringChampions2 != null){
                    message.channel.send("```" +
                                        stringChampions2.replace("null", "")
                                        + "```")
                }
                if(stringChampions3 != null){
                    message.channel.send("```" +
                                        stringChampions3.replace("null", "")
                                        + "```")
                }
            console.log("[" + message.author.username + "]" + " Recherche sur le joueur " + player_name + " fini sans erreur")        
    }
        }
});

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
