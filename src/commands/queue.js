const { Utils } = require("erela.js")
const { RichEmbed } = require("discord.js")
const MessageEmbed = require("discord.js").MessageEmbed;

const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);

    if (!queue) {
        return msg.reply("Não existe nenhuma musica na fila seu animal");
    }
    let que = queue.songs;
    let np = queue.songs[0];
    let showQ = `Tocando agora\n▶️ ${np.title} \n\n 🎵--FILA--🎵 \n\n `;
    for (var i = 1; i < que.length; i++) {
        showQ += `${i}) ${queue.songs[i].title}\n`;
    }
    // msg.channel.send(${np}\n\n);
    msg.channel.send(showQ);
    /*
    const embed = new MessageEmbed()
        
        .setColor('#0099ff')
        .setTitle(`:arrow_forward: ${np}`)
        .setDescription(`${showQ}`);

    //return msg.reply(np);
    msg.channel.send(embed);
    */
};

module.exports = {
    name: "queue",
    help: "Mostra a fila de músicas",
    execute,
};