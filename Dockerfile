FROM node:16-alpine3.14

WORKDIR /app

COPY /*.json ./

COPY . .

RUN npm install --legacy-peer-deps 

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]
