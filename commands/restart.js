const { channelName } = require('../config.json');

module.exports = {
    name: 'restart',
    description: 'Restarts the bot.',
    aliases: ['rs'],
    cooldown: 5,
    execute(message, args) {
        if (message.channel.name === channelName) {

            if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You can\'t restart the bot.\nYou are missing the required permissions!");
            message.channel.send("The bot will restart in 5").then(msg => {
                setTimeout(function () {
                    msg.edit("The bot will restart in 4").then(msg => {
                        setTimeout(function () {
                            msg.edit("The bot will restart in 3").then(msg => {
                                setTimeout(function () {
                                    msg.edit("The bot will restart in 2").then(msg => {
                                        setTimeout(function () {
                                            msg.edit("The bot will restart in 1").then(msg => {
                                                msg.delete(1000).then(() => {
                                                    setTimeout(function () {
                                                        process.exit();
                                                    }, 100);
                                                });
                                            });
                                        }, 1000);
                                    });
                                }, 1000);
                            });
                        }, 1000);
                    });
                }, 1000);
            });

        } else return;
    },
};





