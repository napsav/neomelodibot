const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
client.login(process.env.BOT_TOKEN);

const canzoni = [
	"https://www.youtube.com/watch?v=pi_DN9Mg4vk",
	"https://www.youtube.com/watch?v=i-2TEee1OsQ",
	"https://www.youtube.com/watch?v=DMyuC9SMAxQ",
	"https://www.youtube.com/watch?v=0kgLP10i1lo",
	"https://www.youtube.com/watch?v=r_lrzQChPOE",
	"https://www.youtube.com/watch?v=r_lrzQChPOE",
	"https://www.youtube.com/watch?v=hfkcGZUzfRc"
]

client.on('message', async message => {

  if (!message.guild) return;

  if (message.content === 'spazzatura') {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const dispatcher = connection.play(ytdl(canzoni[Math.floor(Math.random() * canzoni.length)], { filter: 'audioonly' }));
    } else {
      message.reply('Devi trovarti in un canale vocale');
    }
  }
});
