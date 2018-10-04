const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;
const app = express();

const config = {
  channelSecret: process.env.CHANNEL_ACCESS_TOKEN,
  channelAccessToken:process.env.CHANNEL_SECRET 
};

const cliant = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
  console.log(req.body.events);
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  let replyText = '';

  switch (event.message.text){
    case 'こんにちは' || 'にゃんぱすー' || 'スラマッパギー':
    const ary = ['にゃんぱすー','スラマッパギー','お休みぃぃいぃ']
    replyText = ary[Math.floor(Math.random() * ary.length)];
    break
  }
  return
    cliant.replyMessage(event.replyToken, {
      type: 'text',
      text: replyText
    });
  }

app.listen(PORT);