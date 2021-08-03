var express = require('express');
const request = require('request')
var router = express.Router();
const axios = require('axios');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chat with Lisa'
  });
});

router.post('/chat', (req,res,next) => {
  let result;
  let user_chat;

  const dateObj = new Date();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  if (parseInt(minutes) < 10){
    minutes = "0" + minutes
  }
  let local_time = hours + ':' + minutes;

  user_chat = req.body["user"];
  console.log(user_chat);
  
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

    console.log(trans_label, user_chat, answer);

    res.send({
    label: trans_label,
    ans: answer,
    user: user_chat,
    time: local_time
  });
  });

})
module.exports = router;
