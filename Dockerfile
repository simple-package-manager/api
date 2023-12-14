FROM node:alpine
WORKDIR /usr/src/app
EXPOSE 4000
CMD npm i && npx sequelize-cli-typescript db:migrate && npm start