# Instructions 

FROM node:24

# Goes to the app directory

WORKDIR /src/

# COPY package.json and package-lock.json (if available)

COPY package*.json /src/

# Install app dependencies

RUN npm install

# Copy the rest of our app into the container

COPY . .

# Build the application

RUN npm run build

# Set port environment variable

ENV PORT=8080

# Expose the port so our computer can access it

EXPOSE 8080

# RUN the app

CMD ["npm", "start"]