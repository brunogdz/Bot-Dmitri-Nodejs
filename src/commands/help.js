const execute = (bot, msg, args) => {
    let string = "\n";
    bot.commands.forEach((command) => {
        if (command.help) {
            string += `**${process.env.PREFIX}${command.name}**: ${command.help}\n`;
        }
    });
    // return msg.channel.send(string);
    const embed = new MessageEmbed()
        .setTitle("Olá! :)")
        .setDescription(`${string}`)
    msg.channel.send(embed);
};

module.exports = {
    name: "help",
    help: "Exibe a ajuda de todos os comandos",
    execute,
};
