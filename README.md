# Title
---
[![Run on Ainize](https://ainize.ai/images/run_on_ainize_button.svg)](https://ainize.web.app/redirect?git_repo=https://github.com/EastHShin/Chatbot-Lisa-Sentiment-Classification)

## Overview
---
Do you want to know what kind of feelings the other person has when talking to you?
But what if the other person is a chatbot, not a person? does chatbot also have feelings? <br>

This program assumes a chatbot is a person, chats with the bot, and classificates the feelings for each chatting sentence. try talking with Lisa right now!<br><br>

### (Korean) <br>
상대방과 대화를 할 때, 상대방이 어떤 감정을 가지고 말을 하고 있는지 궁금하지 않으신가요? 그런데, 상대방이 사람이 아니라 챗봇이라면 어떨까요? 챗봇에도 감정이 있을까요? <br>

이 프로그램은 챗봇이 사람이라고 가정하고 봇과 대화하며 각 문장마다의 감정을 분석하여 나타냅니다.
지금 당장 Lisa와 대화해보세요! 

**Demo web Github** : [Github](https://github.com/EastHShin/Chatbot-Lisa-Sentiment-Classification)
<br>
**Model API**: [Ainize](https://ainize.ai/EastHShin/Chatbot-Sentiment_Classification-API?branch=main)
<br>
**huggingface** : [Chatbot-LisaSimpson-DialoGPT](https://huggingface.co/EasthShin/Chatbot-LisaSimpson-DialoGPT), [Emotion-Classification-bert-base](https://huggingface.co/EasthShin/Emotion-Classification-bert-base)
<br>

## How to make
---
The Lisa-Chatbot model is created by obtaning a dataset from [Kaggle](https://www.kaggle.com/pierremegret/dialogue-lines-of-the-simpsons), pre-processing, and then finetuning the DialoGPT model. The Emotion-Classification model is made by getting a dataset from [emotion Dataset](https://huggingface.co/datasets/emotion), pre-processing, and then finetuning the Bert Model.
<br>
### (Korean)
Lisa-Chatbot 모델은 [Kaggle](https://www.kaggle.com/pierremegret/dialogue-lines-of-the-simpsons)에서 데이터셋을 얻어 pre-processing과정을 거친 뒤 DialoGPT 모델을 finetuning 하여 생성하였고, Emotion-Classification 모델은 Bert 모델에 [emotion Dataset](https://huggingface.co/datasets/emotion)을 이용해 finetuning하여 생성하였습니다. Lisa-Chatbot 모델을 이용해 텍스트를 입력하면 Lisa의 응답이 나오고, 이 응답을 다시 Emotion-Classification 모델을 통해 감정을 분석하여 나타냅니다.

## Usage
---
**Endpoint** : [endpoint](https://main-chatbot-lisa-sentiment-classification-east-h-shin.endpoint.ainize.ai/)
<br><br>
**Only English is allowed for this program.**

## With CLI
---
Using Curl on the terminal

### Post Parameter

```
    user = "text that you want to say to Lisa"
```
<br>

### Input Format
```
    {
        "user" : "string"
    }
```

### Output Format

```
{
    "0": {"label": label, "score": prediction score},
    "1": "string"
}
```

### API Prediction Test

```
curl -X POST "https://main-chatbot-sentiment-classification-api-east-h-shin.endpoint.ainize.ai/chat" -H "accept: application/json" -H "Content-Type: multipart/form-data" -F "question={How are you}"

{
    "0": {"label":"LABEL_1","score":0.9992185235023499},
    "1": "I'm fine. Just fine."
}
```

### Healthy Check

```
curl --request GET "https://main-chatbot-sentiment-classification-api-east-h-shin.endpoint.ainize.ai/healthz"

{
    Health OK
}
```
