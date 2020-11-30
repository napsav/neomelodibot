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
	"https://youtu.be/15AIkcufw5s",
	"https://youtu.be/gs-W19d5MQw",
	"https://youtu.be/Wun-JhIAyt8",
	"https://youtu.be/cjNNeSJJ2QA",
	"https://youtu.be/k0Y3155sdR8",
	"https://youtu.be/qnu0jb1XdXw",
	"https://youtu.be/sa0YV6ceodQ",
	"https://youtu.be/trvK3o1Yrx4",
	"https://youtu.be/SE11KafTKJk",
	"https://youtu.be/prX7zVOVecU",
	"https://youtu.be/Z7cgDT1y_WA",
	"https://youtu.be/xTx4gjP1lxg",
	"https://youtu.be/ZCzQK4GFf-Y",
	"https://youtu.be/nrA7Ni7hlJ4",
	"https://youtu.be/xkpW6GfStfM",
	"https://youtu.be/vLG1ey7Pipc",
	"https://youtu.be/mJXWfOwjgZg",
	"https://youtu.be/5NClv-oJDzM",
	"https://youtu.be/mlTBM7LQCbI",
	"https://youtu.be/LGsVgQbFfxI",
	"https://www.youtube.com/watch?v=5HlXzO_eTy8"
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
