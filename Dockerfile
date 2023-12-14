FROM node:alpine
WORKDIR /usr/src/app
EXPOSE 4000
CMD npm i && npm run typeorm:run && npm start