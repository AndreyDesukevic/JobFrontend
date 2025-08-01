FROM node:20 AS builder
WORKDIR /app

COPY career-hawk ./
COPY career-hawk/src/config.json ./src/config.json

RUN npm ci
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]