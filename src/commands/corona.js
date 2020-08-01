const MessageEmbed = require("discord.js").MessageEmbed;

const axios = require('axios');

async function execute (bot, msg, args) {
    const dadosAPI = await buscaDadosAPI();
    const embed = new MessageEmbed()
        .setTitle("Status do Corona Virus no Brasil")
        .setDescription("Mostra os números de casos confirmados e não confirmados, mortes e curados")
        .addFields(
            { name: `Casos = ${dadosAPI.NCases}`,value:"🤢" },
            { name: `Confirmados = ${dadosAPI.NConfirmed}`, value: "😷" },
            { name: `Mortes = ${dadosAPI.NDeath}`, value: "💀" },
            { name: `Curados = ${dadosAPI.NRecovered}`, value: "👌" },
            { name: `Dados atualizados em = ${dadosAPI.Updated}`, value:"🗓"}
        )
    msg.channel.send(embed);
}
const buscaDadosAPI = async () => {


    try {
        const resultado = await axios.get("https://covid19-brazil-api.now.sh/api/report/v1/brazil");

        const { cases: NCases, confirmed: NConfirmed, deaths: NDeath, recovered: NRecovered, updated_at: Updated } = resultado.data.data;

        return {
            NCases,
            NConfirmed,
            NDeath,
            NRecovered,
            Updated
        }
    } catch (erro) {
        console.log(erro);
    }
}

module.exports = {
    name: "corona",
    help: "Retorna uma MessageEmbed",
    execute,
};
// async function coronaStatus() {
//     const request = require('request');

//     const options = {
//         method: 'GET',
//         url: 'https://covid19-brazil-api.now.sh/api/report/v1/brazil'
//     };

//     request(options, (err, res, body) => {
//         if (err) {
//             throw new Error(err);
//         }
//         const resultadoObj = JSON.parse(body);

//         const { cases: NCases, confirmed: NConfirmed,
//             deaths: NDeath,
//             recovered: NRecover,
//             updated_at: Updated
//         } = resultadoObj.data;
//         console.log(body);
//         console.log(NCases);
//         console.log(NConfirmed);
//         console.log(NDeath);
//         console.log(NRecover);
//         console.log(Updated);
//     });


// }

// const execute = (bot, msg, args) => {
//     console.log("OK");

//     const NCases;
//     const NConfirmed;
//     const NDeath;
//     const NRecover;
//     const Updated;

//     await coronaStatus();
//     const embed = new MessageEmbed()
//         .setTitle("Status do Corona Virus no Brasil")
//         .setDescription("Mostra os números de casos confirmados e não confirmados, mortes e curados")
//         .addFields(
//             { name: `Casos = ${NCases}, value:"🤢"` },
//             { name: `Confirmados = ${NConfirmed}`, value: "😷" },
//             { name: `Mortes = ${NDeath}`, value: "💀" },
//             { name: `Curados = ${NRecover}`, value: "👌" }
//         )
//     msg.channel.send(embed);
//     msg.channel.reply("União Flasco")
// };




// module.exports = {
//     name: "corona",
//     help: "Informa quantos casos de corona tem no brasil",
//     execute,
// };


   // const NCases = resultadoObj.data.cases;
        // const NConfirmed = resultadoObj.data.confirmed;
        // const NDeath = resultadoObj.data.deaths;
        // const NRecover = resultadoObj.data.recovered;
        // const Updated = resultadoObj.data.updated_at;