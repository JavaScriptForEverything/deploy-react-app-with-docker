FROM node:16.13.2-alpine3.15
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
