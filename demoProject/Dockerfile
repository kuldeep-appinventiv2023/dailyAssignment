FROM node:18.16.0-alpine

WORKDIR /app/test

COPY package*.json ./

RUN npm i

COPY . .

ENV PORT = 3500

EXPOSE 3500

CMD [ "npx", "index.ts"]