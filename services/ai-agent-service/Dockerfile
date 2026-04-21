FROM node:22-alpine AS builder
WORKDIR /app

COPY shared/package*.json ./shared/
COPY services/ai-agent-service/package*.json ./services/ai-agent-service/

RUN cd shared && npm install
RUN cd services/ai-agent-service && npm install

COPY shared/ ./shared/
COPY services/ai-agent-service/ ./services/ai-agent-service/

RUN cd shared && npx -p typescript tsc
RUN cd services/ai-agent-service && npx -p typescript tsc -p tsconfig.json

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY services/ai-agent-service/package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/services/ai-agent-service/dist/ ./
COPY --from=builder /app/shared/dist/ ./shared/dist/
COPY --from=builder /app/services/ai-agent-service/src/assets ./src/assets

EXPOSE 4602

CMD ["node", "dist/server.js"]