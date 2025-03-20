# Use the official Node.js image.
FROM node:22.14.0 AS build

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy the application source code to the container image.
COPY . .

# Build the React app for production.
RUN npm run build

# Start the server with a lightweight static server.
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 8080

# Update Nginx configuration to listen on port 8080
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]