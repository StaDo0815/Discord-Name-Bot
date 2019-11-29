const Discord = require('discord.js');
const download = require('image-downloader');
const { path } = require('../config.json');

module.exports = {
    name: 'avatarUpdate',
    description: 'Sends the current avatar of the updated member **[NO COMMAND]**',
    guildOnly: true,
    cooldown: 0,
    execute(newUser, channel, newAvatar) {

        if (!channel) return console.log("No channel found");

        var updatePath = `${path}/update/avatar.png`
        
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

    },
};