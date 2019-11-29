const Discord = require('discord.js');
const download = require('image-downloader');
const { path } = require('../config.json');

module.exports = {
    name: 'avatar',
    description: 'Sends the current avatar of a member **[NO COMMAND]**',
    guildOnly: true,
    cooldown: 0,
    execute(member, newUser, channel, AvatarLink, update) {

        var joinPath = `${path}/join/avatar.png`
        var updatePath = `${path}/update/avatar.png`

        if (update == true) {

            options = {
                url: newAvatar,
                dest: updatePath,      // Save to the update path [config.json] + update/avatar.png
                //extractFilename: false
            }

            download.image(options)
                .then(({ filename, image }) => {
                    console.log(`Saved ${newUser.tag}\'s avatar to`, filename)  // Saved to the update path [config.json] + update/avatar.png

                    var updateAvatar = new Discord.RichEmbed()
                        .attachFile(updatePath)
                        .setImage('attachment://avatar.png')
                        .setTitle("Chanches,")
                        .setDescription(`${newUser}!`)


                    channel.send(updateAvatar);
                })
                .catch((error) => console.error(error));

        } if (update == false) {

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

        }
    },
};