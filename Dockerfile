FROM node:20

EXPOSE 3000

WORKDIR /nestJS

COPY package*.json ./

RUN npm i npm@latest -g

RUN npm install -g @nestjs/cli

COPY . .

CMD ["npm", "run", "start:prod"]