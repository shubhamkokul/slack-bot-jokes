const dotenv = require("dotenv");
var SlackBot = require("slackbots");
const axios = require("axios");

dotenv.config({ path: "./config/config.env" });
const channel = "random";

var bot = new SlackBot({
  token: process.env.TOKEN,
  name: process.env.NAME
});

bot.on("start", function() {
  var params = {
    icon_emoji: ":laughter:"
  };
});

bot.on("error", err => console.log(err));

bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  handleMessage(data.text);
});

function handleMessage(message) {
  if (message.includes(" chucknorris")) {
    chuckJoke();
  } else if (message.includes(" yomama")) {
    yoMamaJoke();
  } else if(message.includes(' random')) {
    randomJoke();
  } else if(message.includes(' help')) {
    runHelp();
  }
}

function chuckJoke() {
  axios.get("http://api.icndb.com/jokes/random").then(res => {
    const joke = res.data.value.joke;
    bot.postMessageToChannel(channel, joke);
  });
}

function yoMamaJoke() {
  axios.get("https://api.yomomma.info/").then(res => {
    const joke = res.data.joke;
    bot.postMessageToChannel(channel, joke);
  });
}

function randomJoke() {
  const rand = Math.floor(Math.random() * 2) + 1;
  if (rand === 1) {
    chuckJoke();
  } else if (rand === 2) {
    yoMamaJoke();
  }
}

function runHelp() {
    var params = {
        icon_emoji: ":question:"
      };
      bot.postMessageToChannel(channel, `Type @WorkJokeBot with either 'chucknorris', 'yomama' or 'random' to get a joke` ,params)
}
