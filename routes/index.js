var express = require('express');
const request = require('request')
var router = express.Router();
const axios = require('axios');

let label_list = [];
let answer_list = [];
let user_chat_list = [];
let time_list = [];
let count = 0;
/* GET home page. */
router.get('/', function(req, res, next) {
  
  
  
  res.render('index', { title: 'Chat with Lisa' ,
      label: label_list,
      ans: answer_list,
      user: user_chat_list,
      time: time_list,
      cnt: count
  });
});

router.post('/chat', (req,res,next) => {
  let result;
  let user_chat;

  if(answer_list.length > 10){
    label_list.length = 0;
    answer_list.length = 0;
    user_chat_list.length = 0;
    time_list.length = 0;
    count = 0;
}
  const dateObj = new Date();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  if (parseInt(minutes) < 10){
    minutes = "0" + minutes
  }
  let local_time = hours + ':' + minutes;
  time_list.push(local_time);
  time_list.push(local_time);

  user_chat = req.body["user"];
  console.log(user_chat);
  user_chat_list.push(user_chat);
  const options = {
    uri: "https://main-chatbot-sentiment-classification-api-east-h-shin.endpoint.ainize.ai/chat",
    method: 'POST',
    form: {
      question: user_chat
    }
  }


  request.post(options, async function(err, httpResponse, body){
    let label, answer;
    let trans_label;
    result = await JSON.parse(body)
    label = await result['0']['label']
    answer = await result['1']
    count += 2;
    console.log(count + "server");
    if (label == 'LABEL_0')
      trans_label = 'sadness';
    else if(label == 'LABEL_1')
      trans_label = 'Joy';
    else if(label == 'LABEL_2')
      trans_label = 'Love';
    else if(label == 'LABEL_3')
      trans_label = 'Anger';
    else if(label == 'LABEL_4')
      trans_label = 'Fear';
    else if(label == 'LABEL_5')
      trans_label = 'Surprise';


    label_list.push(trans_label);
    answer_list.push(answer);
    console.log(trans_label, user_chat, answer);
    console.log(label_list, answer_list, user_chat_list);

    res.send({ title: 'Chatbot-Sentiment-Classification' ,
    label: label_list,
    ans: answer_list,
    user: user_chat_list,
    time: time_list,
    cnt: count
  });
  });

})
module.exports = router;
