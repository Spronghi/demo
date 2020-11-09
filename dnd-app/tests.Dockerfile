# Install node v10
FROM node:10

# Set the workdir /app
WORKDIR /app

# Copy the package.json to workdir
COPY package.json ./

# Run npm install - install the npm dependencies
RUN npm install

# Copy application source
COPY . .

# Expose application ports - (3000 for API and 9229 for debug)
EXPOSE 3000 9229

ARG HOST=http://0.0.0.0:3000
ARG MONGODB=mongodb://mongo/test
ARG REDIS=redis://redis
ARG NODE_ENV=locale

# Start the application
CMD ["npm", "test"]
