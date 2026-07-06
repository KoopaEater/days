# ==========================================
# Stage 1: Build the SvelteKit application
# ==========================================
FROM node:26-alpine3.23 AS builder

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package management files first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml ./

# Install all dependencies and bypass the 24-hour age check
ENV PNPM_CONFIG_MINIMUM_RELEASE_AGE=0
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the SvelteKit app (adapter-node outputs to the 'build' directory by default)
RUN pnpm run build

# Remove devDependencies, leaving only production dependencies in node_modules
RUN pnpm prune --prod

# ==========================================
# Stage 2: Run the production application
# ==========================================
FROM node:26-alpine3.23 AS runner

WORKDIR /app

# Install timezone data so the container can understand local time
RUN apk add --no-cache tzdata

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Copy the build output, production node_modules, and package.json from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the port the app runs on
EXPOSE 3000

# Start the server using the output from adapter-node
CMD ["node", "build"]
