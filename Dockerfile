FROM --platform=linux/amd64 node:22-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "src/app.js"]