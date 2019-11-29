const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, path, channelName, botOwnerID } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log(`Logged in as ${client.user.username}\n<${client.user.id}>`);
});

client.on('guildMemberAdd', member => {

	const channel = member.guild.channels.find(ch => ch.name === channelName);
	if (!channel) return console.log(`Couldn\'t find ${channelName}!`)
	var update = false
	const AvatarLink = member.user.avatarURL || member.user.defaultAvatarURL

	client.commands.get('avatar').execute(member, channel, AvatarLink, update);
	console.log(update)
});

client.on('userUpdate', (oldUser, newUser) => {

	const channel = newUser.client.channels.find(ch => ch.name === channelName);
	if (!channel) return console.log(`Couldn\'t find ${channelName}!`)
	var update = true

	const oldAvatar = oldUser.avatarURL || oldUser.defaultAvatarURL
	const newAvatar = newUser.avatarURL || newUser.defaultAvatarURL
	if (oldAvatar == newAvatar) return;

	client.commands.get('avatar').execute(newUser, channel, newAvatar, update);

});

client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	// if (message.channel.name === channelName) {
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return;// message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 0) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		if (commandName === 'avatarJoin' || commandName === 'avatarUpdate') return;

			command.execute(message, args, client);
	
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	// } else return;
});

client.login(token);