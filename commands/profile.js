const Canvas = require('canvas');
const fs = require('fs');
const request = require('request');
const jimp = require('jimp');
const pretty = require('pretty-ms');
const snumber = require('short-number')

exports.run = async (client, msg, args) => {
    msg.channel.send("**Generating...**").then(gen => {

        let time = (new Date).getTime();
        let id = (!msg.mentions.users.first()) ? msg.author.id : msg.mentions.users.first().id;
        let user = (!msg.mentions.users.first()) ? msg.author : msg.mentions.users.first();
        let Image = Canvas.Image,
            canvas = new Canvas(2000, 2000),
            ctx = canvas.getContext('2d');
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
            fs.readFile('./images/profiletest.png', (err, profile) => {
                if (err) return console.log(err);
                let that = new Image;
                that.src = profile;
                ctx.drawImage(that, 0, 0, 2000, 2000)
                let url = user.displayAvatarURL.endsWith(".webp") ? user.displayAvatarURL.slice(0, -5) + ".png" : user.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);

                        //Avatar
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
                        ava.src = buf;
                        ctx.drawImage(ava, 100, 100, 300, 300);

                        //Sent
                        try {
                            sent = snumber(sent);
                        } catch(e)  {
                            sent = 0;
                        }
                        ctx.font = "bold 120px Helvetica";
                        ctx.textAlign = "center";
                        ctx.fillText(sent, 311, 1415);

                        let canvas2 = new Canvas(400, 400)
                        let ctx2 = canvas2.getContext('2d')

                        ctx2.drawImage(canvas, 0, 0, 400, 400)

                        canvas2.toBuffer((err, buf) => {
                            if (err) return console.log(err);
                            msg.channel.sendFile(buf);
                            gen.edit("**Here is " + user.username + "'s Profile**");
                        })
                    })
            })
        })
    })
}

function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    let lines = [];
    let line = '';

    if (ctx.measureText(text).width < maxWidth) {
        return [text];
    }

    while (words.length > 0) {
        let split = false;

        while (ctx.measureText(words[0]).width >= maxWidth) {
            const tmp = words[0];
            words[0] = tmp.slice(0, -1);

            if (!split) {
                split = true;
                words.splice(1, 0, tmp.slice(-1));
            } else {
                words[1] = tmp.slice(-1) + words[1];
            }
        }

        if (ctx.measureText(line + words[0]).width < maxWidth) {
            line += `${words.shift()} `;
        } else {
            lines.push(line);
            line = '';
        }

        if (words.length === 0) {
            lines.push(line);
        }
    }

    return lines;
}

exports.help = {
    category: 'util',
    usage: '@user#0001',
    description: "Show User's profile",
    detail: 'In dev',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    example: '@Jus de Patate#0190',
    alias: [
        'profile'
    ]
};
