FROM node:lts-alpine

RUN mkdir /app
COPY . /app
WORKDIR /app

# Install the dependenciess
ENV MONGODB_URI="mongodb://root:pass@home-assignment-db:27017/testdb?authSource=admin"
ENV MONGODB_URI_TEST="mongodb://root:pass@home-assignment-db:27017/testdbtesting?authSource=admin"
ENV ALPHAVANTAGE_APIKEY="PTKKHIF2O5HLMTKV"
RUN yarn install

EXPOSE 8080