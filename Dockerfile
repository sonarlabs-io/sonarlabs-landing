FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of your source code
COPY . .

# Build app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]