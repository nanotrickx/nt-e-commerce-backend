# First Stage : to install and build dependences

FROM node:14 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm i --only=production && npm cache clean --force

# Second Stage : Setup command to run your app using lightweight node image
FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]