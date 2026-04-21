FROM node:22-alpine AS builder
WORKDIR /app

COPY shared/package*.json ./shared/
COPY services/id-service/package*.json ./services/id-service/

RUN cd shared && npm install
RUN cd services/id-service && npm install

COPY shared/ ./shared/
COPY services/id-service/ ./services/id-service/

RUN cd shared && npx -p typescript tsc
RUN cd services/id-service && npx -p typescript tsc -p tsconfig.json

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY services/id-service/package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/services/id-service/dist/ ./
COPY --from=builder /app/shared/dist/ ./shared/dist/

EXPOSE 4601

CMD ["node", "server.js"]