const { Utils } = require("erela.js");
const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const MessageEmbed = require("discord.js").MessageEmbed;
const cheerio = require('cheerio');
const genius = require("genius-lyrics");
const axios = require("axios");
const G = new genius.Client(process.env.GENIUS)


async function teste(url){
    let res = await fetch(url);
    if(res.status !== 200) throw `Deu ruim`;

    rest = await res.text();

    const $ = cheerio.load(res);
    return $('.lyrics').text().trim();
}

async function execute(bot, msg, args) {

    const queue = bot.queues.get(msg.guild.id);



    if (!queue) {
        return msg.reply("Sem musicas na lifa");
    }
    const np = queue.songs[0].title;
    console.log(`${np}`);


    const sentmsg = await msg.channel.send(
        '👀 Searching for lyrics 👀'
    );
    // get song id
    var url = `https://api.genius.com/search?q=${encodeURI(np)}`;
        console.log(url)
    const headers = {
        Authorization: `Bearer ${process.env.GENIUS}`
    };

    try {
        var body = await fetch(url, { headers });
        
        var result = await body.json();
        
        const songID = result.response.hits[0].result.id;
        console.log(songID)
        // const songID = result.response.hits[0].result.id;
        // get lyrics
        url = `https://api.genius.com/songs/${songID}`;
        body = await fetch(url, { headers });
        result = await body.json();

        const song = result.response.song;

        console.log(song.url)

        let lyrics = await getLyrics(song.url);
        lyrics = lyrics.replace(/(\[.+\])/g, '');
        console.log(lyrics)
        if (!lyrics) {
            return msg.channel.send(
                'No lyrics have been found for your query, please try again and be more specific.'
            );
        }
        if (lyrics.length >= 4096)
            return msg.channel.send(
                'Lyrics are too long to be returned in a msg embed'
            );
        if (lyrics.length < 2048) {
            const lyricsEmbed = new MessageEmbed()
                .setColor('#00724E')
                .setDescription(lyrics.trim());
            return sentmsg.edit('', lyricsEmbed);
        } else {
            // 2048 < lyrics.length < 4096
            const firstLyricsEmbed = new MessageEmbed()
                .setColor('#00724E')
                .setDescription(lyrics.slice(0, 2048));
            const secondLyricsEmbed = new MessageEmbed()
                .setColor('#00724E')
                .setDescription(lyrics.slice(2048, lyrics.length));
            sentmsg.edit('', firstLyricsEmbed);
            msg.channel.send(secondLyricsEmbed);
            return;
        }
    } catch (e) {
        console.error(e);
        return sentmsg.edit(
            'Something when wrong, please try again or be more specific'
        );
    }
};
async function getLyrics(url) {
    // const response = await fetch(url);
    // const text = await response.text();
    // const $ = cheerio.load(text);
    // let lyrics = $('div[class=lyrics]')
    // .text()
    // .trim()
    // return lyrics;
    return fetch(url)
    .then(res => res.text())
    .then(async res => {
      // Using Cheerio to parse HTML, accessible using JQuery syntax
      // Loads the page HTML
      const $ = cheerio.load(res)

      // Selects <div class="lyrics"> and returns the text
      let lyrics = $('div[class=lyrics]').text().trim()

      // Recursive
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      
      return lyrics
    })

}


module.exports = {
    name: "lyrics",
    help: "Mostra a letra da musica",
    execute,
}