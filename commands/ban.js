const { botOwnerID, channelName } = require('../config.json');

module.exports = {
    name: 'ban',
    description: 'Bannes a member.',
    usage: '[member which should get banned] [reason]',
    guildOnly: true,
    cooldown: 5,
    execute(message, args, client) {

        if (!message.member.hasPermission('BAN:MEMBERS')) return message.reply("You are missing the required permissions!");
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send("I don\'t have permissions to do that!")

        const banMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!banMember) return message.reply("Please provide a bannable member that should be banned!");

        if (banMember.user.id === message.member.user.id) return message.reply("You can\'t ban yourself!");
        if (banMember.user.id === botOwnerID) return message.reply(`I can\'t ban <@${botOwnerID}>. He is my owner!`)
        if (banMember.user.id === client.user.id) return message.reply("I can\'t ban myself! You have to do it :disappointed_relieved:");
        if (banMember.hasPermission('BAN_MEMBERS') || banMember.hasPermission('ADMINISTRATOR')) return message.reply(`You can\'t ban ${banMember}! He has the same ore higher permissions than you!`);

        let reason = args.slice(1).join(' ');

        let banMessage = `**YOU HAVE BEEN BANED FROM \`${message.guild.name}\`**`;
        let channelMessage = `**Banned \`@${banMember.user.tag}\` \`<${banMember.id}>\`**`;
        let logMessage = `${message.author.tag} banneded ${banMember.user.tag}.`

        if (reason) {
            banMessage += `\n**REASON: \`${reason}\`**`;
            channelMessage += `\n**Reason: \`${reason}\`**`;
            logMessage += ` Reason: ${reason}`
        }

        banMember.send(banMessage).then(() =>
            banMember.ban(logMessage)).catch(err => console.log(err));
        message.channel.send(channelMessage);
        console.log(logMessage);
    },
};