const { channelName } = require('../config.json');

module.exports = {
    name: 'clear',
    description: 'Clears messages from the channel.',
    aliases: ['cls', 'c'],
    usage: '[amount from 1 to 100]',
    guildOnly: true,
    cooldown: 3,
    execute(message, args) {
        if (message.channel.name === channelName) {

            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("You are missing the required permissions!");
            if (args[0] == 666) return message.channel.send(":scream:");
            if (args[0] == 1337) return message.channel.send(":wink:");
            if (args[0] > 100) return message.reply("you can\'t clear more than 100 messages at a time.");
            if (args[0] <= 0) return message.reply("you can\'t clear less than 1 messages.");
            if (!args[0]) {
                args[0] = 10;
            }
            if (isNaN(args[0])) return message.reply(`${args[0]} is not a number.`);
            message.channel.bulkDelete(args[0], true).then(() => {
                message.channel.send(`Cleared ${args[0]} messages`).then(msg => msg.delete(3000));
            });
        } else return;
    },
};