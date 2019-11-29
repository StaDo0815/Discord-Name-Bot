const Discord = require('discord.js');
const download = require('image-downloader');
const { path } = require('../config.json');

module.exports = {
    name: 'avatarJoin',
    description: 'Sends the current avatar of the joined member **[NO COMMAND]**',
    guildOnly: true,
    cooldown: 0,
    execute(member, channel, AvatarLink) {

        if (!channel) return console.log("No channel found");

        var joinPath = `${path}/join/avatar.png`
        
        options = {
            url: AvatarLink,
            dest: joinPath,      // Save to the join path [config.json] + join/avatar.png
            //extractFilename: false
        }

        download.image(options)
            .then(({ filename, image }) => {
                console.log(`Saved ${member.user.tag}\'s avatar to`, filename)  // Saved to the join path [config.json] + join/avatar.png

                    var joinAvatar = new Discord.RichEmbed()
                        .attachFile(joinPath)
                        .setImage('attachment://avatar.png')
                        .setTitle("Welcome to the server")
                        .setDescription(`${member.user}!`)

                
                channel.send(joinAvatar);
            })
            .catch((error) => console.error(error));

    },
};