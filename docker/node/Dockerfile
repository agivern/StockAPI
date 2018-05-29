FROM node:carbon

WORKDIR /usr/src/app

RUN npm install -g nodemon

ADD start.sh /start.sh
RUN chmod 755 /start.sh

CMD ["/start.sh"]
