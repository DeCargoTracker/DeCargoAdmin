# Используем официальный Node.js образ
FROM node:18

# Устанавливаем рабочую директорию в контейнере
WORKDIR /adminka

# Копируем файлы из папки build в контейнер
COPY ./adminka/build ./build

# Устанавливаем пакет serve для обслуживания статических файлов
RUN npm install -g serve

# Указываем команду для запуска сервера, который обслуживает статический контент
CMD ["serve", "-s", "build", "-l", "3000"]
