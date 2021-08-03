FROM node:14.17.3

WORKDIR /app

COPY package.json /app

RUN npm install
RUN npm i nodemon -g
COPY . /app

CMD npm start

EXPOSE 3000