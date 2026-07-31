import type { Pool } from "pg";

import type { Product, ProductInput, Result } from "../types";
import { isValidName, isValidPrice, isValidStock } from "../helpers";

export async function createProduct(pool: Pool, product: ProductInput): Promise<Result<Product>> {
  if (!isValidName(product.name)) {
    return {
      success: false,
      error: "Invalid product name",
      status: 400
    };
  };

  if (!isValidPrice(product.price)) {
    return {
      success: false,
      error: "Invalid product price",
      status: 400
    };
  };

  if (!isValidStock(product.stock)) {
    return {
      success: false,
      error: "Invalid product stock",
      status: 400
    };
  };

  const result = await pool.query<Product>("INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING id, name, price, stock",
    [product.name.trim(), product.price, product.stock]
  );

  return {
    success: true,
    data: result.rows[0],
    status: 201
  };
};

export async function deleteProduct(pool: Pool, id: string): Promise<Result<Product>> {
  const result = await pool.query<Product>("DELETE FROM products WHERE id = $1 RETURNING id, name, price, stock",
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
  const result = await pool.query<Product>("SELECT id, name, price, stock FROM products WHERE id = $1",
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

export async function updateProduct(pool: Pool, id: string, input: Partial<ProductInput>): Promise<Result<Product>> {
  const trimmedName = typeof input.name === "string" ? input.name.trim() : undefined;

  if (input.name != null && !isValidName(trimmedName)) {
    return {
      success: false,
      error: "Invalid product name",
      status: 400
    };
  };

  if (input.price != null && !isValidPrice(input.price)) {
    return {
      success: false,
      error: "Invalid product price",
      status: 400
    };
  };

  if (input.stock != null && !isValidStock(input.stock)) {
    return {
      success: false,
      error: "Invalid product stock",
      status: 400
    };
  };

  const result = await pool.query<Product>("UPDATE products SET name = COALESCE($2, name), price = COALESCE($3, price), stock = COALESCE($4, stock) WHERE id = $1 RETURNING id, name, price, stock",
    [id, trimmedName, input.price, input.stock]
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
  const normalizedLimit = limit <= 0 ? 10 : Math.min(limit, 100);
  const normalizedOffset = offset < 0 ? 0 : offset;
  
  const result = await pool.query<Product>("SELECT id, name, price, stock FROM products ORDER BY name LIMIT $1 OFFSET $2",
    [normalizedLimit, normalizedOffset]
  );

  return {
    success: true,
    data: result.rows,
    status: 200
  };
};