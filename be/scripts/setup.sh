#!/bin/bash

# Start Docker containers
echo "Starting Docker containers..."
docker-compose up -d

# Wait for Strapi to be ready
echo "Waiting for Strapi to be ready..."
until curl -s http://localhost:1337/admin > /dev/null; do
  echo "Waiting for Strapi..."
  sleep 5
done

# Install dependencies
echo "Installing dependencies..."
npm install

# Start Strapi in development mode
echo "Starting Strapi in development mode..."
npm run develop &

# Wait for Strapi to be fully started
echo "Waiting for Strapi to be fully started..."
sleep 30

# Run admin initialization script
echo "Running admin initialization script..."
npm run init:admin

# Keep the script running
echo "Setup completed. Press Ctrl+C to stop Strapi."
wait 