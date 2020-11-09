# Install node v10
FROM node:10

# Set the workdir /dnd-app
WORKDIR /dnd-app

# Copy the package.json to workdir
COPY package.json ./

# Run npm install - install the npm dependencies
RUN npm install --quiet

# Copy application source
COPY . .

# Expose application ports - (3000 for API and 9229 for debug)
EXPOSE 3000 9229

# Start the application
CMD ["npm", "start"]
