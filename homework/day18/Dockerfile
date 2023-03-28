FROM node:14

WORKDIR /PDB/

COPY ./package.json /PDB/
COPY ./yarn.lock /PDB/
RUN yarn install

COPY . /PDB/

CMD yarn start:dev