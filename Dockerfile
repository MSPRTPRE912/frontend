FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli
RUN npm install

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV API_URL=http://localhost:8081/
ENV APP_PORT=4200

ENTRYPOINT ["/entrypoint.sh"]