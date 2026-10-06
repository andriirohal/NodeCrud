# 🧩 Node CRUD

A REST API built with Node.js, Express, and TypeScript, featuring a clean layered architecture, PostgreSQL persistence, and Docker Compose for containerized development.

---

## ✨ Features

- Get all products
- Get product by ID
- Create new product
- Update product by ID
- Delete product by ID
- Type-safe with TypeScript
- PostgreSQL persistence
- Dockerized backend and database
- Persistent PostgreSQL data with Docker volumes

---

## 🛠️ Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- pg (node-postgres)
- Docker
- Docker Compose

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

## 🐳 Docker Setup

The application uses Docker Compose to run the backend and PostgreSQL database as separate containers.

```txt
Docker Compose
│
├── backend
│   └── Node.js + Express
│       └── port 8080
│
└── db
    └── PostgreSQL
        └── port 5432
```

The PostgreSQL database uses a Docker volume to persist data between container restarts.

```yaml
volumes:
  - postgres_data:/var/lib/postgresql
```

---

## ⚙️ Installation

Install dependencies:

```console
npm install
```

Build the project:

```console
npm run build
```

---

## 🐳 Run with Docker

Build and start the containers:

```console
docker compose up --build
```

This starts:

- Node.js backend on `http://localhost:8080`
- PostgreSQL database on `localhost:5432`

The backend connects to PostgreSQL using the Docker service name:

```env
DATABASE_URL=postgres://andrii:password@db:5432/products_db
```

Stop the containers:

```console
docker compose down
```

Stop the containers and remove the PostgreSQL volume:

```console
docker compose down -v
```

---

## 🗄️ Database

PostgreSQL is configured automatically by Docker Compose with:

```env
POSTGRES_USER=andrii
POSTGRES_PASSWORD=password
POSTGRES_DB=products_db
```

The products table:

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  price NUMERIC(10,2) NOT NULL CHECK (price > 0),
  stock INTEGER NOT NULL CHECK (stock >= 0),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT products_name_check CHECK (
    char_length(name) > 0 AND name = TRIM(name)
  )
);
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