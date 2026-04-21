FROM node:22-alpine AS builder
WORKDIR /app

COPY services/api-gateway/package*.json ./services/api-gateway/

RUN cd services/api-gateway && npm install

COPY services/api-gateway/ ./services/api-gateway/

RUN cd services/api-gateway && npx -p typescript tsc -p tsconfig.json

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY services/api-gateway/package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/services/api-gateway/dist/ ./

EXPOSE 4600

CMD ["node", "server.js"]