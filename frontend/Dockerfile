FROM oven/bun:1 AS builder

ARG VITE_BACKEND_URL
ARG VITE_FRONTEND_URL
ARG VITE_BACKEND_WS_URL

WORKDIR /app

COPY package.json ./

COPY bun.lock ./

RUN bun install --frozen-lockfile

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_FRONTEND_URL=$VITE_FRONTEND_URL
ENV VITE_BACKEND_WS_URL=$VITE_BACKEND_WS_URL

COPY . .

RUN bun run build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]