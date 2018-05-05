const paladins = require('paladins-api');
const pal = new paladins('2116', 'A1A9076FF6214CEDBA99BBF8FD7EC166');
const EventEmitter = require('events');
// API Paladins - Récuperation des informations
var sessionId;
exports.getNewSessionID = function(send){
    console.log("New Session ID")
    pal.connect((err, res) => {
        if(!err) {
            sessionId = res;
        }
        send(err, sessionId)
    });
}

exports.getPlayerInfos = function(player_name, send){
    console.log("getPlayerInfos")
    var playerInfosArray = [];
    pal.getPlayer(sessionId, player_name, (err, res) => {
        if(res == null){
            send(err, null);
            return;
        }
        if(!err){
            var str = JSON.stringify(res).replace("[", "").replace("]", "");
            var str2 = JSON.parse(str);
            playerInfosArray["created_datetime"] = str2.Created_Datetime;
            playerInfosArray["id"] = str2.Id;
            playerInfosArray["last_login_datetime"] = str2.Last_Login_Datetime;
            playerInfosArray["leaves"] = str2.Leaves;
            playerInfosArray["level"] = str2.Level;
            playerInfosArray["losses"] = str2.Losses;
            playerInfosArray["masterylevel"] = str2.MasteryLevel;
            playerInfosArray["name"] = str2.Name;
            playerInfosArray["personal_status_message1"] = str2.Personal_Status_Message;
            playerInfosArray["region"] = str2.Region;
            playerInfosArray["teamid"] = str2.TeamID;
            playerInfosArray["team_name"] = str2.Team_Name;
            playerInfosArray["total_achivements"] = str2.Total_Achievements;
            playerInfosArray["total_worshippers"] = str2.Total_Worshippers;
            playerInfosArray["wins"] = str2.Wins;
            playerInfosArray["ret_msg1"] = str2.ret_msg;
            playerInfosArray["match_played"] = str2.Losses + str2.Wins;
        } else {
            console.log("Erreur chargement du tableau playerInfosArray: ",err)
        }
        send(err, playerInfosArray)
        console.log("PlayerInfos: ", playerInfosArray)
    });
}

exports.getStatusInfos = function(player_name, send){
    console.log("getStatusInfos")
    var StatusInfosArray = [];
    pal.getPlayerStatus(sessionId, player_name, (err, res) => {
        if(!err){
            var str = JSON.stringify(res).replace("[", "").replace("]", "");
            var str2 = JSON.parse(str);
            StatusInfosArray["match"] = str2.Match;
            StatusInfosArray["personal_status_message2"] = str2.personal_status_message;
            StatusInfosArray["ret_msg2"] = str2.ret_msg;
            StatusInfosArray["status"] = str2.status;
            StatusInfosArray["status_string"] = str2.status_string;
        } else {
            console.log("Erreur chargement du tableau StatusInfosArray: ",err)
        }
        send(err, StatusInfosArray)
    });
}

exports.getChampionsInfos = function(player_name, send){
    console.log("getChampionsInfos")
    var ChampionsInfosArray = [];
    pal.getChampionRanks(sessionId, player_name, (err, res) => {
        if(!err){
            ChampionsInfosArray["length"] = res.length;
            for(var i in res){
                ChampionsInfosArray[i] = [];
                console.log(res[i]);
                ChampionsInfosArray[i]["assists"] = res[i].Assists;
                ChampionsInfosArray[i]["deaths"] = res[i].Deaths;
                ChampionsInfosArray[i]["kills"] = res[i].Kills;
                ChampionsInfosArray[i]["losses"] = res[i].Losses;
                ChampionsInfosArray[i]["minionkills"] = res[i].MinionKills;
                ChampionsInfosArray[i]["rank"] = res[i].Rank;
                ChampionsInfosArray[i]["wins"] = res[i].Wins;
                ChampionsInfosArray[i]["played"] = res[i].Wins + res[i].Losses;
                ChampionsInfosArray[i]["worshippers"] = res[i].Worshippers;
                ChampionsInfosArray[i]["champion"] = res[i].champion;
                ChampionsInfosArray[i]["champion_id"] = res[i].champion_id;
                ChampionsInfosArray[i]["player_id"] = res[i].player_id;
                ChampionsInfosArray[i]["ret_msg"] = res[i].ret_msg;
            }
        } else {
            console.log("Erreur chargement du tableau ChampionsInfosArray: ",err)
        }
        send(err, ChampionsInfosArray)
    });
}

exports.getUTCDate = function(date, send){
    var array = [];
    var splited = date.split(" ");
    array["mois"] = splited[0].split("/")[0];
    array["jour"] = splited[0].split("/")[1];
    array["annee"] = splited[0].split("/")[2];
    array["heure"] = splited[1].split(":")[0];
    array["minute"] = splited[1].split(":")[1];
    array["seconde"] = splited[1].split(":")[2];
    send(array);
}
exports.getUTCDateString = function(date, send){
    var array = [];
    var splited = date.split(" ");
    array["mois"] = splited[0].split("/")[0];
    array["jour"] = splited[0].split("/")[1];
    array["annee"] = splited[0].split("/")[2];
    array["heure"] = splited[1].split(":")[0];
    array["minute"] = splited[1].split(":")[1];
    array["seconde"] = splited[1].split(":")[2];
    var string = array["jour"] + "/" + array["mois"] + "/" + array["annee"] + " " + array["heure"] + ":" + array["minute"] + ":" + array["seconde"];
    send(string);
}
