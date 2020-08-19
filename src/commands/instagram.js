const axios = require('axios')
const { MessageEmbed } = require('discord.js');

const execute = async (bot, message, args) => {
    let url, response, account, details;
    try {
        url = `https://instagram.com/${args[0]}/?__a=1`;
        response = await axios.get(url)
        account = response.data
        message.channel.send(account)
        details = account.graphql.user
        


        const embed = new MessageEmbed()
            .setTitle(`${details.is_verified ? `${details.username} <a:verified:727820439497211994>` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
            .setDescription(details.biography)
            .setThumbnail(details.profile_pic_url)
            .addFields(
                {
                    name: "Publicações",
                    value: details.edge_owner_to_timeline_media.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Seguidores",
                    value: details.edge_followed_by.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Seguindo",
                    value: details.edge_follow.count.toLocaleString(),
                    inline: true
                }
            )
        await message.channel.send(embed)
    } catch (error) {

        return message.channel.send(`${error}`)
    }

}

module.exports = {
    name: "instagram",
    aliases: ["insta"],
    help: "Mostra as informações do usuario do instagram",
    execute,

}