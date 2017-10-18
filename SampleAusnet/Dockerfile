FROM mhart/alpine-node

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serv"]
