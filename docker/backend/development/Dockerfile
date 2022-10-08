FROM node:16
# Installing libvips-dev for sharp Compatability
RUN apt-get update && apt-get install libvips-dev vim -y

# where our Strapi app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY ./backend/package*.json ./backend/package-lock.json /app/
COPY ./.env /app/

ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies in /app
RUN npm config set network-timeout 600000 -g && npm install

# Copy the rest of our Strapi folder into /app
COPY ./backend /app

# Build Strapi admin
RUN npm build

# Run yarn dev, as we would via the command line 
CMD ["npm", "run", "develop"]