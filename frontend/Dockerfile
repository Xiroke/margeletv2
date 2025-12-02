FROM oven/bun:1 AS builder
WORKDIR /app


COPY ./frontend/package.json bun.lockb ./
RUN bun install --frozen-lockfile


COPY ./frontend .

RUN bun run build


FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]