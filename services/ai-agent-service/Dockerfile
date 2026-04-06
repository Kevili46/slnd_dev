FROM node:22-alpine AS builder
WORKDIR /app

COPY shared/ ./shared/
COPY services/ai-agent-service/package*.json ./services/ai-agent-service/

WORKDIR /app/services/ai-agent-service
RUN npm install --include=dev

COPY services/ai-agent-service/ ./
RUN npm run build

RUN mkdir -p dist/services/ai-agent-service/src/assets && \
    cp -r src/assets/. dist/services/ai-agent-service/src/assets/

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY services/ai-agent-service/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/services/ai-agent-service/dist ./dist
COPY --from=builder /app/services/ai-agent-service/src/assets ./assets

EXPOSE 4602

CMD ["node", "dist/services/ai-agent-service/server.js"]