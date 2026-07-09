import type { Product, ProductInput, Result } from "../types";
import { pool } from "../config";

const isValidPrice = (price: unknown): price is number => 
  typeof price === "number" && Number.isFinite(price) && price >= 0;

const isValidStock = (stock: unknown): stock is number => 
  typeof stock === "number" && Number.isInteger(stock) && stock >= 0;

const isValidName = (name: unknown): name is string => 
  typeof name === "string" && name.trim().length > 0;

export async function getProductById(id: string): Promise<Result<Product>> {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", 
    [id]
  );

  if(!result.rows[0]) {
    return {
      success: false,
      error: "Product not found",
      status: 404
    };
  };

  return {
    success: true,
    data: result.rows[0],
    status: 200
  };
};

export async function createProduct(product: ProductInput): Promise<Result<Product>> {
  if(!isValidName(product.name)) {
    return {
      success: false,
      error: "Invalid product name",
      status: 400
    };
  };
  
  if(!isValidPrice(product.price)) {
    return {
      success: false,
      error: "Invalid product price",
      status: 400
    };
  };
  
  if(!isValidStock(product.stock)) {
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

export async function deleteProduct(id: string): Promise<Result<Product>> {
  const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", 
    [id]
  );

  if(!result.rows[0]) {
    return {
      success: false,
      error: "Product not found",
      status: 404
    };
  };

  return {
    success: true,
    data: result.rows[0],
    status: 200
  };
};

export async function updateProduct(id: string, product: Partial<ProductInput>): Promise<Result<Product>> {
  const trimmedName = typeof product.name === "string" ? product.name.trim() : undefined;
  
  if(product.name != null && !isValidName(trimmedName)) {
    return {
      success: false,
      error: "Invalid product name",
      status: 400
    };
  };

  if(product.price != null && !isValidPrice(product.price)) {
    return {
      success: false,
      error: "Invalid product price",
      status: 400
    };
  };

  if(product.stock != null && !isValidStock(product.stock)) {
    return {
      success: false,
      error: "Invalid product stock",
      status: 400
    };
  };

  const result = await pool.query("UPDATE products SET name = COALESCE($2, name), price = COALESCE($3, price), stock = COALESCE($4, stock) WHERE id = $1 RETURNING *",
    [id, trimmedName, product.price, product.stock]
  );

  if(!result.rows[0]) {
    return {
      success: false,
      error: "Product not found",
      status: 404
    };
  };

  return {
    success: true,
    data: result.rows[0],
    status: 200
  };
};

export async function getAllProducts(): Promise<Result<Product[]>> {
  const result = await pool.query("SELECT * FROM products");
  
  return {
    success: true,
    data: result.rows,
    status: 200
  };
};