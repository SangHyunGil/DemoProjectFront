FROM node:16.13.2 as builder

WORKDIR '/usr/src/app'

COPY . ./
RUN yarn install
CMD ["yarn", "start"]