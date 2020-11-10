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
	"https://www.youtube.com/watch?v=hfkcGZUzfRc",
	"https://youtu.be/GGPOXPFCCgs",
	"https://youtu.be/mabtHm-5RjY",
	"https://youtu.be/p5cnWRgyfR4",
	"https://youtu.be/Z2Y1pHUfamM",
	"https://youtu.be/3saCNbbPOd0",
	"https://youtu.be/OpLIPTC0uC4",
	"https://youtu.be/5a6o3R4T5ps",
	"https://youtu.be/qesXIWOQAJg",
	"https://youtu.be/15AIkcufw5s"
]

var playing = false;
var dispatcher;
var connection;
client.on('message', async message => {

  if (!message.guild) return;

  if (message.content === 'spazzatura') {
    if (message.member.voice.channel) {
      connection = await message.member.voice.channel.join();
      var canzone = canzoni[Math.floor(Math.random() * canzoni.length)];
      console.log(canzone);
      	    dispatcher = connection.play(ytdl(canzone, { filter: 'audioonly' }));
	    playing = true;
	    dispatcher.on('finish', () => {
		      console.log('Riproduzione interrotta');
		    playing = false;
	    });
    } else {
      message.reply('Devi trovarti in un canale vocale');
    }
  }
    if (message.content === 'fo cess') {
	if (playing) {
	    dispatcher.destroy();
		playing = false;
		connection.disconnect()
	} else {
		message.channel.send("Coglione non c'è niente in riproduzione");

	}
    }
  
});
