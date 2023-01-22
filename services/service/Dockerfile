FROM node:lts-alpine

RUN mkdir /app
COPY . /app
RUN chmod 755 /app/crontab.txt
RUN /usr/bin/crontab /app/crontab.txt
WORKDIR /app

# Install the dependenciess
ENV MONGODB_URI="mongodb://root:pass@home-assignment-db:27017/testdb?authSource=admin"
ENV MONGODB_URI_TEST="mongodb://root:pass@home-assignment-db:27017/testdbtesting?authSource=admin"
ENV ALPHAVANTAGE_APIKEY="PTKKHIF2O5HLMTKV"
RUN yarn install
RUN yarn build

EXPOSE 8080