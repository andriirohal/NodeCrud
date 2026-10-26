# Instructions

FROM node:24

# Goes to the app directory

WORKDIR /app/

# Copy package.json and package-lock.json (if available)

COPY package.*json /app/

# Install app dependencies

RUN npm install

# Copy the rest of the app

COPY . .

# Build the application

RUN npm run build

# Set port environment variable

ENV PORT=8080

# Expose the port to the host.

EXPOSE 8080

# RUN the application

CMD ["npm", "start"]