FROM node:22-alpine AS builder
WORKDIR /app

COPY shared/ ./shared/

COPY frontend/package*.json ./frontend/

WORKDIR /app/frontend
RUN npm install --legacy-peer-deps

COPY frontend/ ./
RUN npm run build

FROM nginx:alpine AS runner

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/frontend/dist/slnd/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]