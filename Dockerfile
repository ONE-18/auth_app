# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install all dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

RUN npm run build

EXPOSE 3000

# Run the web service on container startup.
CMD [ "node", "dist/server.js" ]