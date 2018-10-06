const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;
const app = express();

const config = {
  channelSecret:process.env.CHANNEL_SECRET ,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

const cliant = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
  console.log(req.body.events);
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(200,result));
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve( null);
  }
  let replyText = '';

  switch(event.message.text){
    case 'こんにちは':
    case 'すらまっぱぎー':
    case 'お休みぃぃぃぃ':
    case 'にっこにっこにー':
    case 'にゃんぱすー':
    const ary = ['にゃんぱすー','スラマッパギー','お休みぃぃいぃ','にっこにっこにー'];
    replyText = ary[Math.floor(Math.random() * ary.length)]; 
    return cliant.replyMessage(event.replyToken, {
      type: 'text',
      text: replyText
    });
    break
  }
}
  
app.listen(PORT);