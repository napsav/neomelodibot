require('dotenv').config()
const Discord = require('discord.js');
const fetch = require('node-fetch')
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

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

var canzoni_shuffle = canzoni
const PREFIX = "-"
var head = 0
var canzone = null;

client.on('ready', () => {
	console.log('Connesso');
});

function riproduci(connection, canzone, neomelodico = false) {
	dispatcher = connection.play(ytdl(canzone, {
		quality: 'highestaudio',
		highWaterMark: 1 << 25
	}));
	playing = true;
	dispatcher.on('debug', info => console.log(info))
	dispatcher.on('speaking', (x) => {
		if (!x) {
			console.log('Riproduzione interrotta');
			if (neomelodico) {
				head++
				canzone = canzoni_shuffle[head % canzoni_shuffle.length]
				riproduci(connection, canzone, true)
				playing = false;
			}
			
		}
	});
}

function urlyoutube(arg) {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
	let match = arg.match(regExp);
	if (match && match[2].length == 11) {
		return match[2]
	} else {
		return null;
	}
}

async function queryYoutube(args) {
	let query = args.join("+")
	let final = [];
	await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${process.env.YOUTUBETOKEN}`, { method: "Get" }).then(res => res.json())
		.then((json) => {
			let url = "https://youtube.com/watch?v=" + json.items[0].id.videoId
			const embed = {
				"title": `${json.items[0].snippet.title}`,
				"description": `${json.items[0].snippet.channelTitle}`,
				"url": `${url}`,
				"color": 1274397,
				"timestamp": "2021-01-29T10:01:37.739Z",
				"footer": {
					"icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
					"text": "Ricerca YouTube"
				},
				"thumbnail": {
					"url": `${json.items[0].snippet.thumbnails.default.url}`
				},
				"author": {
					"name": "NeomelodiBOT Youtube",
					"url": "",
					"icon_url": ""
				},
				"fields": []
			};
			console.log(json.items[0].id.videoId)
			final = [json.items[0].id.videoId, embed]
			//message.channel.send("Riproduco: " + json.items[0].snippet.title + " | Canale: " + json.items[0].snippet.channelTitle)
		});
		return final;
}

client.on('message', async message => {

	if (!message.guild) return;
	if (message.author.bot) return;
	if (message.content.startsWith("!play")) {
		message.channel.send("Il Bambino Rachitico è andato in pensione, usa -play <parola da cercare o link>. Per fermarlo puoi scrivere \"fo cess\", per riprodurre canzoni neomelodiche \"spazzatura\"")
	}
	if (message.content.startsWith(PREFIX) && message.content.length > 1) {
		const args = message.content.slice(PREFIX.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();
		console.log(args)
		console.log(command)
		if (!args.length && !(command === "play" || command === "p")) {
			message.channel.send("Devi inserire un link di youtube in questo modo: -p <link o parola> o -play <link o parola>. Per fermare la musica del cuore puoi scrivere 'fo cess', per andare avanti 'annanz'. Non me la prendo.")
		} else {
			if (playing) {
				let ytid = urlyoutube(args[0])
				if (ytid != null) {
					riproduci(connection, "https://youtube.com/watch?v=" + ytid)
				} else {
					let query = await queryYoutube(args)
					console.log(query)
					riproduci(connection, "https://youtube.com/watch?v=" + query[0])
					message.channel.send( {embed: query[1]} )
				}

				//message.channel.send("Resetto la connessione. Puoi rimandare il messaggio?")
			} else {
				let ytid = urlyoutube(args[0])
				if (ytid != null) {
					connection = await message.member.voice.channel.join();
					riproduci(connection, "https://youtube.com/watch?v=" + ytid)
				} else {
					connection = await message.member.voice.channel.join();
					let query = await queryYoutube(args)
					console.log(query)
					riproduci(connection, "https://youtube.com/watch?v=" + query[0])
					message.channel.send({embed: query[1]})
				}
			}
		}
	}


	if (message.content === 'spazzatura') {

		if (message.member.voice.channel) {
			connection = await message.member.voice.channel.join();
			shuffleArray(canzoni_shuffle)
			canzone = canzoni_shuffle[head % canzoni_shuffle.length]
			console.log(canzone);
			riproduci(connection, canzone, true)

		} else {
			message.reply('Devi trovarti in un canale vocale');
		}
	}
	if (message.content.toLowerCase() === 'annanz' || message.content.toLowerCase() === 'avanti' || message.content.toLowerCase() === 'skip') {
		if (playing) {
			head++
			canzone = canzoni_shuffle[head]
			dispatcher = connection.play(ytdl(canzone, { filter: 'audioonly' }))
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
