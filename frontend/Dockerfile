FROM node:22-alpine AS builder
WORKDIR /app

COPY shared/package*.json ./shared/
COPY frontend/package.json ./frontend/

RUN cd shared && npm install
RUN cd frontend && npm install

COPY shared/ ./shared/
COPY frontend/ ./frontend/

WORKDIR /app/frontend
RUN npm run build -- --configuration production

FROM nginx:alpine AS runner

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/frontend/dist/slnd/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]