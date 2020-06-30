const { Utils } = require("erela.js")
const { RichEmbed } = require("discord.js")
const MessageEmbed = require("discord.js").MessageEmbed;

const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    
    if (!queue) {
        return msg.reply("Não existe nenhuma musica na fila seu animal");
    }
    const np = queue.songs[0].title;
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(` ▶️ : ${np}`);
        // .setTitle(`:arrow_forward: ${np}`);

    //return msg.reply(np);
    msg.channel.send(embed);

};

module.exports = {
    name: "np",
    help: "Pausa a reprodução de música atual",
    execute,
};