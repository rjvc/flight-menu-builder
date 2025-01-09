# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for both frontend and backend
COPY package*.json ./

# Install dependencies for the backend
RUN npm install

# Copy the backend code
COPY backend ./backend

# Install dependencies for the frontend
WORKDIR /usr/src/app/frontend
RUN npm install

# Build the React frontend app
RUN npm run build

# Copy the frontend build output into the backend folder to be served by Express
WORKDIR /usr/src/app
COPY frontend/build ./backend/build

# Expose the port the app will run on (3001 for the backend API)
EXPOSE 3001

# Set the working directory to the backend and define the command to run the backend
WORKDIR /usr/src/app/backend
CMD ["npm", "run", "start:backend"]
