# Dockerfile for a Node.js (PayPal) app
FROM node:20-alpine

# create app directory
WORKDIR /usr/src/app

# install dependencies (cached)
COPY package*.json ./
RUN npm ci --only=production --silent

# copy application source
COPY . .

# ensure non-root ownership
RUN chown -R node:node /usr/src/app
USER node

ENV NODE_ENV=production
EXPOSE 5000

# start the app (ensure "start" script exists in package.json)
CMD ["npm", "start"]
# End of Dockerfile