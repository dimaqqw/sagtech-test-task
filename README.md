## Инструкция по установке и запуску

```bash
$ npm install
```
Создать базу данных в pgAdmin<br>
Создать файл .env и в нём добавить строку<br>
DATABASE_URL="postgresql://SERVER_NAME:SERVER_PASSWORD@localhost:PORT_DB/DB_NAME?schema=public"<br>
Заменить значения: SERVER_NAME, SERVER_PASSWORD, PORT_DB, DB_NAME на свои значения.<br>

## Миграция призмы
```
$ npx prisma migrate dev --name init
```

## Running the app

```bash
# development
$ npm run start
