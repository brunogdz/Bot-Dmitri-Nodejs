const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const Translate = require('@google-cloud/translate');
const KSoftClient = require('@ksoft/api');
const cheerio = require('cheerio');



dotenv.config();


const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queues = new Map();

const commandFiles = fs.readdirSync(path.join(__dirname, "/commands")).filter((filename) => filename.endsWith(".js"));

for (var filename of commandFiles) {
    const command = require(`./commands/${filename}`);
    bot.commands.set(command.name, command);
}


bot.login(process.env.TOKEN);

const activities = [`${bot.guilds.size} servers!`, "Duvidas? digite .help"]

bot.on("ready", function () {

    console.log(`Estou conectado como ${bot.user.username}`);
    console.log()

    const activities_list = [
        "Streaming",
        "Watching",
        "digite .help",
        "Estou on"
    ]; // creates an arraylist containing phrases you want your bot to switch through.


    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length)); // generates a random number between 1 and the length of the activities array list (in this case 5).
        if (index == 1) {
            bot.user.setActivity('Estou online', { type: 'STREAMING', url: 'https://www.twitch.tv/dmitritv' })
        }

        if (index == 2) {
            bot.user.setActivity('digite .help', { type: 'LISTENING' }) // sets bot's activities to one of the phrases in the arraylist.
        }

        if (index == 3) {
            bot.user.setActivity('Estou online', { type: 'STREAMING', url: 'https://www.twitch.tv/dmitritv' })
        }

        bot.user.setActivity('.help', { type: 'WATCHING' })

    }, 20000); // Runs this every 10 seconds.
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