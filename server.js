const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;
const app = express();

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

const cliant = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
  console.log(req.body.events);
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(200, result));
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  let replyText = '';
  console.log(event.message);

  switch (event.message.text) {
    
    //挨拶
    case String(event.message.text.match(/こんにちは.*/)):
    case String(event.message.text.match(/にゃんぱすー.*/)):
    case 'すらまっぱぎー':
    case 'お休みぃぃぃぃ':
    case 'にっこにっこにー':
      const ary = ['にゃんぱすー', 'スラマッパギー', 'お休みぃぃいぃ', 'にっこにっこにー'];
      replyText = ary[Math.floor(Math.random() * ary.length)];
      return cliant.replyMessage(event.replyToken, {
        type: 'text',
        text: replyText
      });
      break
    //物語シリーズのセリフ
    case String(event.message.text.match(/何でも知ってる.*/)):
      replyText = '何でもは知らないはよ。知ってることだけ';
      return cliant.replyMessage(event.replyToken, {
        type: 'text',
        text: replyText
      });
      break

    case String(event.message.text.match(/やったー.*/)):
    case String(event.message.text.match(/よっしゃー.*/)):
    case String(event.message.text.match(/いえーい.*/)):
      replyText = 'はっはー。随分と元気いいねえ。何かいいことでもあったのかい？'
      return cliant.replyMessage(event.replyToken, {
        type: 'text',
        text: replyText
      });
      break

    case 'ありゃりゃ木さん':
    replyText = 'アララギだ\n失礼噛みました\n人の名前をうっかり八兵衛みたいに言うんじゃない';
        return cliant.replyMessage(event.replyToken, {
          type: 'text',
          text: replyText
        });
      break

      case String(event.message.text.match(/.*した$/)):
      case String(event.message.text.match(/.*いた$/)):
      case String(event.message.text.match(/.*った$/)):
      case String(event.message.text.match(/.*えた$/)):
      replyText = 'ぼくはキメ顔でそう言った';
      return cliant.replyMessage(event.replyToken, {
        type: 'text',
        text: replyText
      });

      case String(event.message.text.match(/ありがとう.*/)):
      replyText = '礼には及ばん\nドーナツには及ぶがの';
      return cliant.replyMessage(event.replyToken, {
        type: 'text',
        text: replyText
      });

  }
}

app.listen(PORT);