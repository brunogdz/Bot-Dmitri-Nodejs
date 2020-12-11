const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

const execute = async (bot, msg, args) => {

    const url = `https://github.com/brunogomes98/Bot-Dmitri-Nodejs`
    const p = await fetch("https://api.github.com/repos/brunogomes98/Bot-Dmitri-Nodejs");
    const json = await p.json();
    const embed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setFooter("Desenvolvido pelo Bruno Gomes#6519")
        .setImage(`https://media.giphy.com/media/kC9Kveaw468cPLxpYE/source.gif`)
        .addField("Stars", json.stargazers_count, true)
        .addField("Forks", json.forks_count, true)
        .addField("Language", json.language, true)
        .setDescription(`Se puder dar um star! ficarei muito grato!\n O repositorio do projeto é esse: [Click here](${url})`);

    msg.channel.send(embed);
};

module.exports = {
    name: "github",
    help: "mandar o repositorio do projeto",
    execute,
};