#base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire test project into the container
COPY . .

# Install Pw browsers
RUN npx playwright install --with-deps

# Set environment variables (optional, for debugging)
ENV BASE_URL=http://ghost:2368

# keep container up
CMD ["tail", "-f", "/dev/null"]