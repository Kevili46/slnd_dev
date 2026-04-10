FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY shared/package.json ./shared/
COPY services/ai-agent-service/package*.json ./services/ai-agent-service/

RUN npm install --include=dev

COPY shared/ ./shared/
COPY services/ai-agent-service/ ./services/ai-agent-service/

WORKDIR /app/services/ai-agent-service
RUN npm run build

RUN mkdir -p dist/src/assets && \
    cp -r src/assets/. dist/src/assets/

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY shared/package.json ./shared/
COPY services/ai-agent-service/package*.json ./services/ai-agent-service/
RUN npm install --omit=dev --workspace=services/ai-agent-service

COPY --from=builder /app/services/ai-agent-service/dist ./dist
COPY --from=builder /app/services/ai-agent-service/src/assets ./assets

EXPOSE 4602

CMD ["node", "dist/server.js"]