FROM node:18.17.0-alpine

ENV HOME=/home/app
WORKDIR $HOME
COPY ./public ./public
COPY ./src  ./src
COPY tsconfig.json ./
COPY package.json ./
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]