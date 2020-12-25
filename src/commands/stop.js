const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (!queue) {
        return msg.reply("Não existe nenhuma musica na fila seu animal");
    }
    queue.songs = [];
    bot.queues.set(msg.guild.id,queue);
    msg.react("👍");
    queue.dispatcher.end();
};

module.exports = {
    name: "stop",
    help: "Para a reprodução de músicas",
    execute,
    
};