# Installation

NestJS Boilerplate supports [TypeORM](https://www.npmjs.com/package/typeorm) and [Mongoose](https://www.npmjs.com/package/mongoose) for working with databases. By default, TypeORM uses [PostgreSQL](https://www.postgresql.org/) as the main database, but you can use any relational database.

Switching between TypeORM and Mongoose is implemented based on the [Hexagonal Architecture](architecture.md#hexagonal-architecture). This makes it easy to choose the right database for your application.

---

## Table of Contents <!-- omit in toc -->

- [Comfortable development (PostgreSQL + TypeORM)](#comfortable-development-postgresql--typeorm)
  - [Video guideline (PostgreSQL + TypeORM)](#video-guideline-postgresql--typeorm)
- [Comfortable development (MongoDB + Mongoose)](#comfortable-development-mongodb--mongoose)
- [Quick run (PostgreSQL + TypeORM)](#quick-run-postgresql--typeorm)
- [Quick run (MongoDB + Mongoose)](#quick-run-mongodb--mongoose)
- [Links](#links)

---

## Comfortable development (PostgreSQL + TypeORM)

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
   ```

1. Go to folder, and copy `env-example-relational` as `.env`.

   ```bash
   cd my-app/
   cp env-example-relational .env
   ```

1. Set `DATABASE_HOST=localhost` and `MAIL_HOST=localhost` in `.env`. Ensure PostgreSQL and Maildev (or your preferred mail catcher) are running locally.

1. Install dependency

   ```bash
   npm install
   ```

1. Run app configuration

   > You should run this command only the first time on initialization of your project, all next time skip it.

   > If you want to contribute to the boilerplate, you should NOT run this command.

   ```bash
   npm run app:config
   ```

1. Run migrations

   ```bash
   npm run migration:run
   ```

1. Run seeds

   ```bash
   npm run seed:run:relational
   ```

1. Run app in dev mode

   ```bash
   npm run start:dev
   ```

1. Open <http://localhost:3000>

### Video guideline (PostgreSQL + TypeORM)

<https://github.com/user-attachments/assets/136a16aa-f94a-4b20-8eaf-6b4262964315>

---

## Comfortable development (MongoDB + Mongoose)

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
   ```

1. Go to folder, and copy `env-example-document` as `.env`.

   ```bash
   cd my-app/
   cp env-example-document .env
   ```

1. Set `DATABASE_URL=mongodb://localhost:27017` in `.env`. Ensure MongoDB and Maildev (or your preferred mail catcher) are running locally.

1. Install dependency

   ```bash
   npm install
   ```

1. Run app configuration

   > You should run this command only the first time on initialization of your project, all next time skip it.

   > If you want to contribute to the boilerplate, you should NOT run this command.

   ```bash
   npm run app:config
   ```

1. Run seeds

   ```bash
   npm run seed:run:document
   ```

1. Run app in dev mode

   ```bash
   npm run start:dev
   ```

1. Open <http://localhost:3000>

---

## Quick run (PostgreSQL + TypeORM)

Follow [Comfortable development (PostgreSQL + TypeORM)](#comfortable-development-postgresql--typeorm) with PostgreSQL and Maildev running locally.

---

## Quick run (MongoDB + Mongoose)

Follow [Comfortable development (MongoDB + Mongoose)](#comfortable-development-mongodb--mongoose) with MongoDB and Maildev running locally.

---

## Links

- Swagger (API docs): <http://localhost:3000/docs>
- Adminer (client for DB): <http://localhost:8080>
- MongoDB Express (client for DB): <http://localhost:8081/>
- Maildev: <http://localhost:1080>

---

Previous: [Introduction](introduction.md)

Next: [Architecture](architecture.md)
