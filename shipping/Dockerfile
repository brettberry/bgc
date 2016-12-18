FROM node:6.7.0

MAINTAINER Jon Brennecke <jpbrennecke@gmail.com>

RUN mkdir -p /usr/src/auth
WORKDIR /usr/src/auth

COPY . /usr/src/auth

ENV NODE_ENV production

RUN npm install

# install maven
RUN apt-get update && apt-get install -y maven

# get maven dependencies (liquibase and jdbc)
RUN mvn clean dependency:copy-dependencies

EXPOSE 5002

CMD ["sh", "./docker-start.sh"]
