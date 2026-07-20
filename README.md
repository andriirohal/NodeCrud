# 🧩 Node CRUD

A REST API built with Node.js, Express, and TypeScript, featuring a clean layered architecture and PostgreSQL as the persistence layer.

---

## ✨ Features

- Get all products
- Get product by ID
- Create new product
- Update product by ID
- Delete product by ID
- Type-safe with TypeScript
- PostgreSQL persistence

---

## 🛠️ Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- pg (node-postgres)

---

## 📁 Project Structure

```txt
src/
├── config/
├── controllers/
├── helpers/
├── middlewares/
├── routes/
├── services/
├── types/
├── app.ts
└── server.ts
```

---

## 🗄️ Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE products_db;
```

Create the products table:

```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK(char_length(trim(name)) > 0),
    price NUMERIC(10, 2) NOT NULL CHECK(price >= 0),
    stock INTEGER NOT NULL CHECK(stock >= 0)
);
```

Install PostgreSQL driver:

```bash
npm install pg
npm install -D @types/pg
```

Create a `.env` file:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=products_db
DB_PORT=5432
```

---

## 🔌 Database Connection

Create a PostgreSQL connection pool:

```ts
// src/config/pool.ts

import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});
```

The `pg` package provides a connection pool used throughout the application to execute SQL queries.

---

## ⚙️ Installation

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Create new product |
| PATCH | `/products/:id` | Update product by ID |
| DELETE | `/products/:id` | Delete product by ID |

---

## 📄 Example Request

### Create Product

```json
{
  "name": "Laptop",
  "price": 999.99,
  "stock": 10
}
```

Example response:

```json
{
  "id": "c7a2d9f4-8c1d-4a5a-8b67-1d2e3f4a5b6c",
  "name": "Laptop",
  "price": "999.99",
  "stock": 10
}
```