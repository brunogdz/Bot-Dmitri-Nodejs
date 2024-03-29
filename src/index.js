const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const Translate = require('@google-cloud/translate');
const KSoftClient = require('@ksoft/api');
const cheerio = require('cheerio');
const MessageEmbed = require("discord.js").MessageEmbed;

// dalheeeeeeeeeeeeeeeeee
// daleee esse yolo2


dotenv.config();


const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queues = new Map();

const commandFiles = fs.readdirSync(path.join(__dirname, "/commands")).filter((filename) => filename.endsWith(".js"));

for (var filename of commandFiles) {
    const command = require(`./commands/${filename}`);
    bot.commands.set(command.name, command);
}

let activities_list = [
    `Streaming`,
    `${bot.users.cache.size} usuarios!`,
    `digite -help`,
    `Online em ${bot.guilds.cache.size} servidores`,
];

let i = 0;

bot.login(process.env.TOKEN);

bot.on("ready", function () {

    console.log(`Estou conectado como ${bot.user.username}`);
    console.log()
    
        
        setInterval(() => {

        let index = Math.floor(i); // generates a random number between 1 and the length of the activities array list (in this case 5).
        
        if (index == 0) {
            bot.user.setActivity('Estou online', { type: 'STREAMING', url: 'https://www.twitch.tv/dmitritv' })
        }

        if (index == 1) {
            bot.user.setActivity('digite -help', { type: 'LISTENING' }) // sets bot's activities to one of the phrases in the arraylist.
        }

        if (index == 2) {
            bot.user.setActivity( `Online em ${bot.guilds.cache.size} servidores`, { type: 'LISTENING' })
        }

        if( index == 3){
            bot.user.setActivity(`${bot.users.cache.size} usuarios!`, { type: 'WATCHING' })
        }
        i = i+1;
        if(i === activities_list.length) i = i - activities_list.length;

    }, 20000)
    
});


bot.on("message", (msg) => {
    if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;

    const args = msg.content.slice(process.env.PREFIX.length).split(" ");
    const commandName = args.shift();

    try {
        const command = bot.commands.get(commandName)
            || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) throw Error("comando nao encontrado");
        command.execute(bot, msg, args)

    } catch (e) {
        console.error(e)
        // return msg.reply("Ops! Não aprendi esse comando ainda!");
    }
});

bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'bem-vindo');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    const embed = new MessageEmbed()
        // .setTitle(`Seja muito bem-vindo(a) ${member.user.username} ao servidor!!`)
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .setDescription(`Seja muito bem-vindo(a) ${member} ao servidor!!`)
        .setImage("https://media.giphy.com/media/iYDlg0CljYqTm/giphy.gif")
    channel.send(embed);

  });