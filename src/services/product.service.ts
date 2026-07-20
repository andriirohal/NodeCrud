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

  const result = await pool.query("INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *",
    [product.name.trim(), product.price, product.stock]
  );

  return {
    success: true,
    data: result.rows[0],
    status: 201
  };
};

export async function deleteProduct(pool: Pool, id: string): Promise<Result<Product>> {
  const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *",
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
  const result = await pool.query("SELECT * FROM products WHERE id = $1",
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

export async function updateProduct(pool: Pool, id: string, product: Partial<ProductInput>): Promise<Result<Product>> {
  const trimmedName = typeof product.name === "string" ? product.name.trim() : undefined;

  if (product.name != null && !isValidName(trimmedName)) {
    return {
      success: false,
      error: "Invalid product name",
      status: 400
    };
  };

  if (product.price != null && !isValidPrice(product.price)) {
    return {
      success: false,
      error: "Invalid product price",
      status: 400
    };
  };

  if (product.stock != null && !isValidStock(product.stock)) {
    return {
      success: false,
      error: "Invalid product stock",
      status: 400
    };
  };

  const result = await pool.query("UPDATE products SET name = COALESCE($2, name), price = COALESCE($3, price), stock = COALESCE($4, stock) WHERE id = $1 RETURNING *",
    [id, trimmedName, product.price, product.stock]
  );

  const updatedProduct = result.rows[0];

  if (!updatedProduct) {
    return {
      success: false,
      error: "Product not found",
      status: 404
    };
  };

  return {
    success: true,
    data: updatedProduct,
    status: 200
  };
};

export async function getAllProducts(pool: Pool, limit = 10, offset = 0): Promise<Result<Product[]>> {
  const result = await pool.query("SELECT * FROM products ORDER BY name LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  return {
    success: true,
    data: result.rows,
    status: 200
  };
};