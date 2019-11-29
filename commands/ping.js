const { channelName } = require('../config.json');

module.exports = {
    name: 'ping',
    description: 'Pong!',
    aliases: ['p'],
    cooldown: 5,
    execute(message, args) {
        if (message.channel.name === channelName) {

            const pingTime = Date.now();

            message.channel.send("pinging...").then(msg => {
                msg.edit(`${Date.now() - pingTime}ms`);
            });

        } else return;
    },
};