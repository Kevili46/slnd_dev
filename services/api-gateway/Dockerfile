# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY shared/package.json ./shared/
COPY services/api-gateway/package*.json ./services/api-gateway/

WORKDIR /app/services/api-gateway
RUN npm install --include=dev

COPY shared/ ./shared/
COPY services/api-gateway/ ./

RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY services/api-gateway/package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/services/api-gateway/dist ./dist

EXPOSE 4600

CMD ["node", "dist/server.js"]