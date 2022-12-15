FROM node:14.7.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install

COPY . /app


EXPOSE 3000
CMD npm start
