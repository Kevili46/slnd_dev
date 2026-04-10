FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY shared/package.json ./shared/
COPY services/id-service/package.json ./services/id-service/

RUN npm install --include=dev

COPY shared/ ./shared/
COPY services/id-service/ ./services/id-service/

WORKDIR /app/services/id-service
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY shared/package.json ./shared/
COPY services/id-service/package.json ./services/id-service/

RUN npm install --omit=dev --workspace=services/id-service

COPY --from=builder /app/services/id-service/dist ./dist
COPY --from=builder /app/shared ./shared

EXPOSE 4601

CMD ["node", "dist/main.js"]