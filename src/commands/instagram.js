const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

async function execute(bot, msg, args) {
    try {
        const a = args.join(" ");
        const dadosAPI = await buscaDadosAPI(a);
        const embed = new MessageEmbed()
            .setTitle(`${dadosAPI.Verified ? `${dadosAPI.UserName} <a:verified:727820439497211994>` : ` ${dadosAPI.UserName}`} ${dadosAPI.Private ? '🔒' : ''} `)
            .setDescription(dadosAPI.Biography)
            .setThumbnail(dadosAPI.ProfilePic)
            .addFields(
                {
                    name: "Nome Completo",
                    value: dadosAPI.FullName,
                    inline: true
                },
                {
                    name: "Seguidores",
                    value: dadosAPI.Seguidores,
                    inline: true
                },
                {
                    name: "Seguindo",
                    value: dadosAPI.Seguindo,
                    inline: true
                },
                {
                    name: "Perfil de negócios",
                    value: dadosAPI.T,
                    inline: true
                },
                {
                    name: "Categoria ",
                    value: dadosAPI.Categoria,
                    inline: true
                },
            )
        await msg.channel.send(embed)

    } catch (error) {
        msg.channel.send('Invalid username')
    }
}
const buscaDadosAPI = async (a) => {
    try {



        const resultado = await axios({
            "method": "GET",
            "url": "https://instagram-data1.p.rapidapi.com/user/info",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "instagram-data1.p.rapidapi.com",
                "x-rapidapi-key": "3da1d5bb6dmsh1efbd62e8c685aep18e4f0jsn3b27a822a344",
                "useQueryString": true
            }, "params": {
                "username": `${a}`
            }
        })
        const ta = resultado.data;
        let { is_verified: Verified, username: UserName, is_private: Private, biography: Biography, profile_pic_url: ProfilePic, is_business_account: Business, full_name: FullName, category_name: Categoria } = resultado.data;
        // const { count: Publicacoes } = resultado.data.graphql.user.edge_owner_to_timeline_media;
        const { count: Seguidores } = resultado.data.edge_followed_by;
        const { count: Seguindo } = resultado.data.edge_follow;
        const teste = "Sem nenhuma categoria";


        if (Business != true) {
            const T = "Não"
            const C = "Sem nenhuma categoria"
            Categoria = C;
            return {
                Verified,
                UserName,
                Private,
                Biography,
                ProfilePic,
                Seguidores,
                Seguindo,
                T,
                FullName,
                Categoria
            }
        } else {
            const T = "Sim";
            return {
                Verified,
                UserName,
                Private,
                Biography,
                ProfilePic,
                Seguidores,
                Seguindo,
                T,
                FullName,
                Categoria
            }
        }
    } catch (err) {
        console.log('Invalid username')
        
    }
}


module.exports = {
    name: "instagram",
    aliases: ["insta"],
    help: "Mostra as informações do usuario do instagram, comando em beta",
    execute,

}