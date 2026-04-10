FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY shared/package.json ./shared/
COPY services/id-service/package.json ./services/id-service/

RUN npm install

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json tsconfig.json ./
COPY shared/ ./shared/
COPY services/id-service/ ./services/id-service/

WORKDIR /app/shared
RUN ../node_modules/.bin/tsc -p tsconfig.json

WORKDIR /app/services/id-service
RUN ../../node_modules/.bin/tsc -p tsconfig.json --composite false --declaration false

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/shared ./shared
COPY --from=builder /app/services/id-service ./services/id-service

EXPOSE 4601

CMD ["node", "services/id-service/dist/server.js"]