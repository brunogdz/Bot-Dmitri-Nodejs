const MessageEmbed = require("discord.js").MessageEmbed;

const axios = require('axios');
async function execute(bot, msg, args) {
    const s = args.join(" ");
    const dadosAPI = await buscaDados(s);
    const embed = new MessageEmbed()
        .setTitle(`Clima da cidade: ${dadosAPI.Cidade}`)
        .setDescription("Mostrando algumas informações sobre o clima da cidade que você digitou. Lembrando que tem que colocar o Estado após a cidade, separando com virgula")
        .addFields(
            {name: `Data hoje:${dadosAPI.data1}`, value:"⠀", inline: true},
            {name: `Máxima hoje:${dadosAPI.Max1}`, value: "⠀", inline: true},
            {name: `Mínima hoje:${dadosAPI.Min1}`, value: "⠀", inline: true},
            {name: `Amanhã:${dadosAPI.data2}`, value: "⠀", inline: true},
            {name: `Máxima amanhã:${dadosAPI.Max2}`, value: "⠀", inline: true},
            {name: `Mínima amanhã:${dadosAPI.Min2}`, value: "⠀", inline: true},
            {name: `Tempo está:${dadosAPI.Descricao}`, value: "⠀"},
            {name: `Umidade: ${dadosAPI.Umidade}%`, value: "⠀"},
            {name: `Vento: ${dadosAPI.Speed}`, value: "⠀"},
            {name: `Sol nascendo às: ${dadosAPI.Nascer}`, value: "⠀"},
            {name: `Sol se põe às: ${dadosAPI.Por}`, value: "⠀", inline: true},
            {name: `Horas agora: ${dadosAPI.Hora}`, value: "⠀"}
            
        )
        .setThumbnail("")
        msg.channel.send(embed)
};

const buscaDados = async (s) => {
    try {
        const citys = s;
        const linkValid = `https://api.hgbrasil.com/weather?key=${process.env.WEATHER}`;
        var url = `${linkValid}&city_name=${encodeURI(citys)}`;
        var urllimitada = `https://api.hgbrasil.com/weather?array_limit=2&fields=only_results,temp,city_name=${encodeURI(citys)},forecast,max,min,date&key=${process.env.WEATHER}`;
        // const resultado = await axios.get("https://api.hgbrasil.com/weather?key=393df20d")

        const resultado = await axios.get(urllimitada)

        const { temp: Temperatura, date: Data } = resultado.data
        const { date: data1, max: Max1, min: Min1 } = resultado.data.forecast[0]
        const { date: data2, max: Max2, min: Min2 } = resultado.data.forecast[1]
        console.log(Temperatura, Data, data1, Max1, Min1, data2, Max2, Min2)

        const Plus = await axios.get(url)

        const { description: Descricao, currently: status, city: Cidade, humidity: Umidade, wind_speedy: Speed, sunrise: Nascer, sunset: Por, time: Hora } = Plus.data.results


        return {
            Temperatura,
            Hora,
            data1,
            Max1,
            Min1,
            data2,
            Max2,
            Min2,
            Descricao,
            status,
            Cidade,
            Umidade,
            Speed,
            Nascer,
            Por

        }
    } catch (e) {
        console.error(e)
    }
}
module.exports = {
    name: "clima",
    aliases: ["weather", "tempo"],
    help: "Mostra o clima de uma cidade",
    execute,
};