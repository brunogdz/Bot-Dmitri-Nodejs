const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

const execute = async (bot, msg, args) => {
    const url = args[0];
    if (!args) {
        return msg.channel.send("Falta colocar o link!");
    }
    const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURI(url)}`);
    const body = await res.text();

    if (body === "Error: Please enter a valid URL to shorten") {
        return msg.error("falta link!");
    }

    const embed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setFooter("Desenvolvido pelo Bruno Gomes-ΔŁŦ-#6519")
        .setDescription(body);
    msg.channel.send(embed);

};

module.exports = {
    name: "shortLink",
    aliases: ["sl"],
    help: "link encurtador",
    execute,
};