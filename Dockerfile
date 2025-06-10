# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Install `serve` to serve the production build
RUN npm install -g serve

# Expose the port `serve` will run on
EXPOSE 4173

# Run the app using SPA fallback
CMD ["serve", "-s", "dist", "-l", "4173"]