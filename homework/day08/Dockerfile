FROM node:14

WORKDIR /backend/

COPY ./package.json /backend/
COPY ./yarn.lock /backend/
RUN yarn install

COPY . /backend/

CMD yarn dev