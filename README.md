# 🧩 Node CRUD

A REST API built with Node.js, Express, and TypeScript, featuring a layered architecture, Prisma ORM, PostgreSQL persistence, comprehensive automated tests, and Docker Compose for containerized development.

---

## ✨ Features

- Get all products
- Get product by ID
- Create a new product
- Update product by ID
- Delete product by ID
- Type-safe development with TypeScript
- Database access with Prisma ORM
- PostgreSQL persistence
- Input validation and centralized error handling
- Automated tests across the entire project
- Dockerized backend and database
- Persistent PostgreSQL data with Docker volumes

---

## 🛠️ Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- Jest
- Docker
- Docker Compose

---

## 📁 Project Structure

```text
prisma/
└── schema.prisma
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

tests/
```

---

## 🐳 Docker Setup

The application uses Docker Compose to run the backend and PostgreSQL database as separate containers.

```text
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

PostgreSQL uses a Docker volume to persist data between container restarts.

```yaml
volumes:
  - postgres_data:/var/lib/postgresql
```

---

## 🚀 Getting Started

### Run with Docker

Build and start the containers:

```bash
docker compose up --build
```

This starts the backend at `http://localhost:8080` and PostgreSQL on port `5432`.

Stop the containers:

```bash
docker compose down
```

Stop the containers and remove the database volume:

```bash
docker compose down -v
```

**Warning:** Removing the volume deletes the persisted PostgreSQL data.

### Environment Variables

Configure your `.env` file with the required database credentials and connection URLs.

```env
POSTGRES_USER=andrii
POSTGRES_PASSWORD=password
POSTGRES_DB=products_db

DATABASE_URL=postgres://andrii:password@localhost:5432/products_db?schema=public
DOCKER_DATABASE_URL=postgres://andrii:password@db:5432/products_db?schema=public
```

Use the Docker connection URL inside containers and the local connection URL when running the backend directly on your machine. Keep your actual `.env` file out of version control.

---

## 🗄️ Database

The project uses Prisma ORM to interact with PostgreSQL. The database schema is defined in `prisma/schema.prisma`.

The `products` model includes:

- `id` — UUID primary key generated automatically.
- `name` — required, unique product name.
- `price` — product price greater than zero.
- `stock` — non-negative inventory quantity.
- `created_at` — creation timestamp set automatically.
- `updated_at` — timestamp automatically updated when a product is modified through Prisma.

Prisma provides type-safe database queries and generated client methods, reducing the need to write raw SQL for routine database operations.

---

## 🧪 Testing

The project includes automated tests covering the entire application, helping verify business logic, input validation, error handling, and API behavior.

Run the test suite:

```bash
npm run test
```

Runs Jest tests with coverage and detects open handles.

---

## 📄 Example Request

### Create Product

**POST** `/products`

Request body:

```json
{
  "name": "Laptop",
  "price": 1300,
  "stock": 10
}
```

Example response:

```json
{
  "id": "c7a2d9f4-8c1d-4a5a-8b67-1d2e3f4a5b6c",
  "name": "Laptop",
  "price": 1300,
  "stock": 10,
  "createdAt": "2026-10-26T17:44:09.071Z",
  "updatedAt": "2026-10-26T17:44:09.071Z"
}
```

---

## 🎯 Project Goals

This project demonstrates practical backend development skills, including REST API design, layered architecture, database modeling, ORM usage, automated testing, error handling, and containerized development.