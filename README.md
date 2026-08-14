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
  name TEXT NOT NULL UNIQUE CHECK (char_length(name) > 0 AND name = trim(name)),
  price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
  stock INTEGER NOT NULL CHECK (stock >= 0)
);
```

Install PostgreSQL driver:

```console
npm install pg
npm install -D @types/pg
```

Create a `.env` file:

```env
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=password
PGDATABASE=products_db
PGPORT=5432
```

---

## ⚙️ Installation

Install dependencies:

```console
npm install
```

Start development server:

```console
npm run dev
```

Build the project:

```console
npm run build
```

Start production server:

```console
npm start
```

---

## 📄 Example Request

### Create Product

```json
{
  "name": "Laptop",
  "price": 1399,
  "stock": 10
}
```

Example response:

```json
{
  "id": "c7a2d9f4-8c1d-4a5a-8b67-1d2e3f4a5b6c",
  "name": "Laptop",
  "price": "1399.00",
  "stock": 10
}
```