# --- Stage 1: Builder ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# --- Stage 2: Runner ---
FROM node:20-alpine AS runner

# Install curl in the runner stage
RUN apk add --no-cache curl

WORKDIR /app
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/ . 

EXPOSE 5000

# HEALTHCHECK: Docker will now ping your /health route
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

CMD ["node", "server.js"]