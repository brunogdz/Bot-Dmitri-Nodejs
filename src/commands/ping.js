const execute = (bot,msg,args) => {
    let string = "PONG! Ta safisfeito agora?!\n";
    return msg.channel.send(string);
};

module.exports = {
    name: "ping",
    help: "Ele mostra o ping e pong",
    execute,
};