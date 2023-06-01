FROM node:18.14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN apk update
RUN apk add
RUN apk add ffmpeg

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
