# Install node v10
FROM node:10

# Set the workdir /dnd-app-db-init
WORKDIR /dnd-app-db-init

# Copy the package.json to workdir
COPY package.json ./

# Run npm install - install the npm dependencies
RUN npm install --quiet

# Copy application source
COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait && npm start
