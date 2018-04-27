exports.run = async (client, msg, args) => {
  var image = message.author.avatarURL; 
} 
message.channel.send({ file: { attachment: "https://cute-api.tk/api/v1/generate/triggered/url=" + image, name: "triggered.gif" 
}}) 
}


exports.help = {
category: "fun",
usage: "",
description: "It's a triggered.. What do you expect this description to say!?!?"
detail: "<:never:439014129747886081>"
botPerm: ['SEND_MESSAGES'],
example: false,
    alias: [
        "trigger"
    ]
};
