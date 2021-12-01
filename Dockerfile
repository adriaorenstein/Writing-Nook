FROM ubuntu:focal

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update

RUN apt install -y npm sudo postgresql postgresql-contrib

RUN npm install --global webpack webpack-cli

RUN ln -snf /usr/share/zoneinfo/America/New_York /etc/localtime && echo America/New_York > /etc/timezone

RUN adduser --disabled-login --gecos '' node

RUN usermod -aG sudo node

RUN echo 'node:nodenode' | chpasswd

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER postgres

RUN service postgresql start && createuser -d node
RUN sed -i -e 's/md5/trust/' /etc/postgresql/12/main/pg_hba.conf

USER node

RUN npm install

COPY --chown=node:node . .
RUN rm secrets-docker.js secrets-aws.js
COPY --chown=node:node secrets-docker.js secrets.js
# RUN CREATE DATABASE writing-nook;

# RUN npm run seed

EXPOSE 8080

RUN webpack

USER root

RUN (service postgresql start) && (sudo -u node sh -c 'createdb writing-nook && npm run seed')
# CMD ["node", "app.js"]

# CMD ["npm", "run-script", "start-docker"]

CMD (service postgresql start) && (sudo -u node npm run-script start-docker)


#apt install postgresql postgresql-contrib
#sudo service postgresql start
#sudo -i -u postgres
#createdb writing-nook