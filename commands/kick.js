const { botOwnerID, channelName } = require('../config.json');

module.exports = {
    name: 'kick',
    description: 'Kicks a member.',
    usage: '[member which should get kicked] [reason]',
    guildOnly: true,
    cooldown: 5,
    execute(message, args, client) {

        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply("You are missing the required permissions!");
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send("I don\'t have permissions to do that!")

        const kickMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!kickMember) return message.reply("Please provide a kickable member that should be kicked!");

        if (kickMember.user.id === message.member.user.id) return message.reply("You can\'t kick yourself!");
        if (kickMember.user.id === botOwnerID) return message.reply(`I can\'t kick <@${botOwnerID}>. He is my owner!`)
        if (kickMember.user.id === client.user.id) return message.reply("I can\'t kick myself! You have to do it :disappointed_relieved:");
        if (kickMember.hasPermission('KICK_MEMBERS') || kickMember.hasPermission('ADMINISTRATOR')) return message.reply(`You can\'t kick ${kickMember}! He has the same ore higher permissions than you!`);

        let reason = args.slice(1).join(' ');

        let kickMessage = `**YOU HAVE BEEN KICKED FROM \`${message.guild.name}\`**`;
        let channelMessage = `**Kicked \`@${kickMember.user.tag}\` \`<${kickMember.id}>\`**`;
        let logMessage = `${message.author.tag} kicked ${kickMember.user.tag}.`

        if (reason) {
            kickMessage += `\n**REASON: \`${reason}\`**`;
            channelMessage += `\n**Reason: \`${reason}\`**`;
            logMessage += ` Reason: ${reason}`
        }

        kickMember.send(kickMessage).then(() =>
            kickMember.kick(logMessage)).catch(err => console.log(err));
        message.channel.send(channelMessage);
        console.log(logMessage);
    },
};