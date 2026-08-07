import type { Pool } from "pg";

import type { Product, CreateProductInput, UpdateProductInput, Result } from "../types";
import { isValidName, isValidPrice, isValidStock } from "../helpers";

export async function createProduct(pool: Pool, input: CreateProductInput): Promise<Result<Product>> {
  const { name, price, stock } = input;
  
  if(!isValidName(name)) {
    return {
      success: false,
      error: "Invalid product name",
      status: 400
    };
  };

  if(!isValidPrice(price)) {
    return {
      success: false,
      error: "Invalid product price",
      status: 400
    };
  };

  if(!isValidStock(stock)) {
    return {
      success: false,
      error: "Invalid product stock",
      status: 400
    };
  };

  const result = await pool.query("INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING id, name, price, stock",
    [name, price, stock]
  );

  return {
    success: true,
    data: result.rows[0],
    status: 201
  };
};

export async function deleteProduct(pool: Pool, id: string): Promise<Result<Product>> {
  const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING id, name, price, stock",
    [id]
  );

  const product = result.rows[0];

  if (!product) {
    return {
      success: false,
      error: "Product not found",
      status: 404
    };
  };

  return {
    success: true,
    data: product,
    status: 200
  };
};

export async function getProductById(pool: Pool, id: string): Promise<Result<Product>> {
  const result = await pool.query("SELECT id, name, price, stock FROM products WHERE id = $1",
    [id]
  );

  const product = result.rows[0];

  if (!product) {
    return {
      success: false,
      error: "Product not found",
      status: 404
    };
  };

  return {
    success: true,
    data: product,
    status: 200
  };
};

export async function updateProduct(pool: Pool, id: string, input: Partial<UpdateProductInput>): Promise<Result<Product>> {
  const { name, price, stock } = input;

  if (input.name != null && !isValidName(name)) {
    return {
      success: false,
      error: "Invalid product name",
      status: 400
    };
  };

  if (price != null && !isValidPrice(price)) {
    return {
      success: false,
      error: "Invalid product price",
      status: 400
    };
  };

  if (stock != null && !isValidStock(stock)) {
    return {
      success: false,
      error: "Invalid product stock",
      status: 400
    };
  };

  const result = await pool.query("UPDATE products SET name = COALESCE($2, name), price = COALESCE($3, price), stock = COALESCE($4, stock) WHERE id = $1 RETURNING id, name, price, stock",
    [id, name, price, stock]
  );

  const product = result.rows[0];

  if (!product) {
    return {
      success: false,
      error: "Product not found",
      status: 404
    };
  };

  return {
    success: true,
    data: product,
    status: 200
  };
};

export async function getAllProducts(pool: Pool, limit: number, offset: number): Promise<Result<Product[]>> {
  const normalizedLimit = !Number.isFinite(limit) || limit <= 0 ? 10 : Math.min(limit, 100);
  const normalizedOffset =  !Number.isFinite(offset) ? 0 : Math.max(0, offset);
  
  const result = await pool.query("SELECT id, name, price, stock FROM products ORDER BY name LIMIT $1 OFFSET $2",
    [normalizedLimit, normalizedOffset]
  );

  return {
    success: true,
    data: result.rows,
    status: 200
  };
};