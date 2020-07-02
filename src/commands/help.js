const execute = (bot, msg, args) => {
    let string = "\n";
    bot.commands.forEach((command) => {
        if (command.help) {
            string += `**${process.env.PREFIX}${command.name}**: ${command.help}\n`;
        }
    });
    const embed = new MessageEmbed()
        .setTitle("Status do Corona Virus no Brasil")
        .setDescription(`${string}`)
    msg.channel.send(embed);
    // return msg.channel.send(string);
};

module.exports = {
    name: "help",
    help: "Exibe a ajuda de todos os comandos",
    execute,
};
