# Use official Node.js runtime as base image
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Enable Corepack for Yarn 4 support
RUN corepack enable

# Copy package files
COPY package.json yarn.lock .yarnrc.yml ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the TypeScript code
RUN yarn build

# Expose port (not strictly necessary for CLI app, but good practice)
EXPOSE 3000

# Set the entrypoint to run the tip calculator
ENTRYPOINT ["node", "dist/index.js"]

# Default command arguments (can be overridden)
CMD []