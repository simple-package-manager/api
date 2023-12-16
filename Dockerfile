FROM node:alpine
WORKDIR /usr/src/app
EXPOSE 4000
CMD npm i && npm run build-only && npm run to:run && npm start