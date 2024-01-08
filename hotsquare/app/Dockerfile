FROM node:14-slim

WORKDIR /app

COPY ./package.json ./

COPY package-lock.json ./

RUN npm install -g npm

RUN npm install -g bootstrap

RUN npm i multi-range-slider-react

RUN npm install --save @deck.gl/core

COPY . .

CMD [ "npm", "start" ]
