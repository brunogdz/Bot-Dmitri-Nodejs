const search = require("yt-search");
const ytdl = require("ytdl-core-discord");
const MessageEmbed = require("discord.js").MessageEmbed;

const execute = (bot, msg, args) => {
    const s = args.join(" ");
    try {
        search(s, (err, result) => {
            if (err) {
                throw err;
            } else if (result && result.videos.length > 0) {
                const song = result.videos[0];
                const queue = bot.queues.get(msg.guild.id);
                if (queue) {
                    queue.songs.push(song);
                    bot.queues.set(msg.guild.id, queue);
                } else playSong(bot, msg, song);
            } else {
                return msg.reply("Desculpa, não achei a musica")
            }
        });
    } catch (e) {
        console.error(e);
    }
};

const playSong = async (bot, msg, song) => {
    let queue = bot.queues.get(msg.member.guild.id);
    if (!song) {
        if (queue) {
            queue.connection.disconnect();
            return bot.queues.delete(msg.member.guild.id);
        }
    }
    if (!msg.member.voice.channel) {
        return msg.reply("Você precisa estar em um canal para reproduzir");
    }

    if (!queue) {
        const conn = await msg.member.voice.channel.join();
        queue = {
            volume: 10,
            connection: conn,
            dispatcher: null,
            songs: [song],
        };
        
        bot.queues.set(msg.member.guild.id, queue);
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Música adicionada: ${queue.songs[0].title}`);


        msg.channel.send(embed);
        
    }
    queue.dispatcher = await queue.connection.play(
        await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly" }),
        {
            type: "opus",
        }
    );
    queue.dispatcher.on("finish", () => {
        queue.songs.shift(); 
        playSong(bot, msg, queue.songs[0]);
        
    });
    
};

module.exports = {
    name: "play",
    aliases: ["p","tocar"],
    help: "Reproduz a música desejada no canal atual do usuário! Pode usar o .p e .tocar",
    execute,
    playSong,
};