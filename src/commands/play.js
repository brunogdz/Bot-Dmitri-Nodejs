const search = require("yt-search");
const ytdl = require("ytdl-core-discord");
const MessageEmbed = require("discord.js").MessageEmbed;

let timeoutID;
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
                    const l = queue.songs.length;
                    queue.songs.push(song);
                    bot.queues.set(msg.guild.id, queue);
                    const embed = new MessageEmbed()
                        .setColor("#0099ff")
                        .setAuthor(
                            "Adicionada na fila ♪ ...",
                            "https://media.giphy.com/media/ccu9c0Iu7aGFa/giphy.gif"
                        )
                        .setTitle(queue.songs[l].title)
                        .setDescription(`Musica adicionada na posição: ${l}`)
                        .setThumbnail(queue.songs[l].thumbnail);
 
                    msg.channel.send(embed);

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
    clearTimeout(timeoutID)
    try{
    let queue = bot.queues.get(msg.member.guild.id);
    if (!song) {
        bot.queues.delete(msg.member.guild.id);
            timeoutID = setTimeout(() => {
                const mensagemQuit = new MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle('Vou meter o pé já que não tenho mais nada pra tocar!')
                    .setImage('https://cdn.discordapp.com/avatars/295619301388582914/a_328fcc16c4103389be85363fb4714be6.gif?size=512')
                msg.channel.send(mensagemQuit)
                if (queue) {
                    queue.connection.disconnect();

                    return bot.queues.delete(msg.member.guild.id);
                }
            }, 180 * 1000)
    }
    if (!msg.member.voice.channel) {
        if (queue) {
            queue.connection.disconnect();
            const r = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Me deixou aqui na call solo 😢 vou sair aqui 😭")
            msg.channel.send(r);
            return
        }

        return msg.reply("Você precisa estar em um canal para reproduzir");

    }

    const r = new MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(
            "Tocando ♪ ...",
            "https://media.giphy.com/media/pVVKJJuEQre3219fLh/source.gif"
        )
        .setTitle(`${song.title}`)
        .setThumbnail(song.thumbnail)
    msg.channel.send(r);


    if (!queue) {
        const conn = await msg.member.voice.channel.join();
        queue = {
            volume: 10,
            connection: conn,
            dispatcher: null,
            songs: [],
        };

        bot.queues.set(msg.member.guild.id, queue);
        queue.songs.push(song);

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
}catch(e){
    console.error(e);
}

};

module.exports = {
    name: "play",
    aliases: ["p", "tocar"],
    help: "Reproduz a música desejada no canal atual do usuário! Pode usar o .p e .tocar",
    execute,
    playSong,
};