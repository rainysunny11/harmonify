FROM node:18

WORKDIR /backend

COPY ./authorization_code/package*.json ./

RUN npm install

COPY ./authorization_code/ ./

EXPOSE 8888

CMD ["npm", "start"]