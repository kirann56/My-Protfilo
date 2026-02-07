# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && \
    npm install && \
    npm install -g vite @vitejs/plugin-react

COPY . .

RUN npm run build

# ---------- Production stage ----------
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# nginx config (REAL PATH)
COPY my-protfilo/src/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
