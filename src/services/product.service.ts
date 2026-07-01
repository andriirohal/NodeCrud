import { randomUUID } from "crypto";

import { Product, ProductInput, Result } from "../types";
import { pool } from "../config";

const isValidPrice = (n: unknown): n is number => 
  typeof n === "number" && Number.isFinite(n) && n >= 0;

const isValidStock = (n: unknown): n is number => 
  typeof n === "number" && Number.isInteger(n) && n >= 0;

const isValidName = (s: unknown): s is string => 
  typeof s === "string" && s.trim().length > 0;

export async function getProductById(id: string): Promise<Result<Product>> {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

  if(!result.rows[0]) {
    return {
      success: false,
      error: "Product not found"
    };
  };

  return {
    success: true,
    data: result.rows[0]
  };
};

export async function createProduct(product: ProductInput): Promise<Result<Product>> {
  if(!isValidName(product.name)) {
    return {
      success: false,
      error: "Invalid product name"
    };
  };
  
  if(!isValidPrice(product.price)) {
    return {
      success: false,
      error: "Invalid product price"
    };
  };
  
  if(!isValidStock(product.stock)) {
    return {
      success: false,
      error: "Invalid product stock"
    };
  };
  
  const newProduct: Product = {
    id: randomUUID(),
    name: product.name.trim(),
    price: product.price,
    stock: product.stock
  };

  const result = await pool.query(
    "INSERT INTO products (id, name, price, stock) VALUES ($1, $2, $3, $4) RETURNING *",
    [newProduct.id, newProduct.name, newProduct.price, newProduct.stock]
  );

  return {
    success: true,
    data: result.rows[0]
  };
};

export async function deleteProduct(id: string): Promise<Result<Product>> {
  const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

  if(!result.rows[0]) {
    return {
      success: false,
      error: "Product not found"
    };
  };

  return {
    success: true,
    data: result.rows[0]
  };
};

export async function updateProduct(id: string, product: Partial<ProductInput>): Promise<Result<Product>> {
  const trimmedName = product.name != null ? product.name.trim() : undefined;
  
  if(product.name != null && !isValidName(trimmedName)) {
    return {
      success: false,
      error: "Invalid product name"
    };
  };

  if(product.price != null && !isValidPrice(product.price)) {
    return {
      success: false,
      error: "Invalid product price"
    };
  };

  if(product.stock != null && !isValidStock(product.stock)) {
    return {
      success: false,
      error: "Invalid product stock"
    };
  };

  const result = await pool.query(
    "UPDATE products SET name = COALESCE($2, name), price = COALESCE($3, price), stock = COALESCE($4, stock) WHERE id = $1 RETURNING *",
    [id, trimmedName, product.price, product.stock]
  );

  if(!result.rows[0]) {
    return {
      success: false,
      error: "Product not found"
    };
  };

  return {
    success: true,
    data: result.rows[0]
  };
};

export async function getAllProducts(): Promise<Result<Product[]>> {
  const result = await pool.query("SELECT * FROM products");
  
  return {
    success: true,
    data: result.rows
  };
};