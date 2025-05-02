FROM nginx:latest

# Копируем конфигурационный файл Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80 для HTTP-трафика
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]