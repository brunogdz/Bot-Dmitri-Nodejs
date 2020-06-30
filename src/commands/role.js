const MessageEmbed = require("discord.js").MessageEmbed;

const execute = (bot, msg, args) => {
    if (args.length === 0) {
        const embed = new MessageEmbed();
        embed.setTitle("Escolha suas áreas de interesse");
        embed.setDescription("Cada área de interesse possui um emoji")

        embed.setAuthor(
            "DmitriTV",
            `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`,
            "https://twitch.tv/dmitritv"
        );
        embed.addFields([
            { name: "DEV", value: "💻", inline: true },
            { name: "CS:GO", value: "🧨", inline: true },
            { name: "Valorant", value: "🔫", inline: true },
            { name: "Sea of Thieves", value: "⛵️", inline: true },
            { name: "Fortnite", value: "🧱", inline: true },
            { name: "Minecraft", value: "⛏", inline: true },
            { name: "COD-WARZONE", value: "✈️", inline: true },
            { name: "Rainbow 6: Siege", value: "6️⃣", inline: true },
        ]);
        msg.member.send({ embed }).then((embed) => {
            ["💻", "🧨", "🔫", "⛵️", "🧱", "⛏", "✈️", "6️⃣"].forEach((emoji) => {
                embed.react(emoji);
            });
            const collector = embed.createReactionCollector((reaction, user) => 
            ["💻", "🧨", "🔫", "⛵️", "🧱", "⛏", "✈️", "6️⃣"].includes(reaction.emoji.name)
            );
            collector.on("collect", (reaction, user) => {
                console.log(reaction.emoji.name);
            });
        });
    } else {

    }
};

module.exports = {
    name: "role",
    help: "Atribui cargos a um usuário",
    execute,
};