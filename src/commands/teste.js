const { KSoftClient } = require('@ksoft/api');
const MessageEmbed = require("discord.js").MessageEmbed;
const { Utils } = require("erela.js");
const { RichEmbed } = require("discord.js");


const execute = (bot, msg, args) => {
    let string = "==== AJUDA ====\n\n";
    bot.commands.forEach((command) => {
        if (command.help) {
            string += `**${process.env.PREFIX}${command.name}**: ${command.help}\n`;
        }
    });
    return msg.channel.send(string);
};

module.exports = {
    name: "teste",
    help: "Comando em beta, para outras coisas",
    execute,
};