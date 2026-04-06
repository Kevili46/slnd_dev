FROM node:22-alpine AS builder
WORKDIR /app

COPY shared/ ./shared/

COPY services/id-service/package*.json ./services/id-service/

WORKDIR /app/services/id-service

RUN npm install --include=dev

COPY services/id-service/ ./

RUN npm run build

RUN ls -R dist

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY services/id-service/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/services/id-service/dist ./dist

EXPOSE 4601

CMD ["node", "dist/services/id-service/server.js"]