# Install node v10
FROM node:10

# Set the workdir /app
WORKDIR /dnd-app-frontend

# Copy the package.json to workdir
COPY package.json ./

# Run npm install - install the npm dependencies
RUN npm install --quiet

# Copy application source
COPY . .

EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
