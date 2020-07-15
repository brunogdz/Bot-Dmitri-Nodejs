const { MessageEmbed } = require("discord.js");
// const img = require("../../util/help.png")

const execute = (bot, msg, args) => {
    
    let string = "\n\n";
    bot.commands.forEach((command) => {
        if (command.help) {
            string += `**${process.env.PREFIX}${command.name}**: ${command.help}\n`;
        }
    });
    const servidor = new MessageEmbed()
        .setDescription(string)
        .setTitle("Quer tirar uma duvida ou sugestão, clique aqui e acessa servidor!!")
        .setURL("https://discord.gg/pzQGhpn")
        .setThumbnail("https://imgur.com/o0863Bd.png")

    msg.channel.send(servidor)
    // return msg.channel.send(string);
};


module.exports = {
    name: "help",
    help: "Exibe a ajuda de todos os comandos",
    execute,
};
