import fs from "fs/promises";
import crypto from "crypto";
import path from "path";

import type { Product, ProductInput, Result } from "../types";

const filePath = path.join(process.cwd(), "src/data/products.json");

async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  };
};

async function writeProducts(products: Product[]) {
  await fs.writeFile(filePath, JSON.stringify(products, null, 2));
};

export async function getProducts(): Promise<Product[]> {
  return readProducts();
};

export async function getProductById(id: string): Promise<Result<Product>> {
  try {
    const products = await readProducts();

    const product = products.find((p) => p.id === id);

    if(!product) {
      return {
        success: false,
        error: "Product not found"
      };
    };

    return {
      success: true,
      data: product
    };
  } catch(error) {
    return {
      success: false,
      error: "Failed to get product"
    };
  };
};

export async function createProduct(data: ProductInput): Promise<Product> {
  const products = await readProducts();
  
  const newProduct = {
    id: crypto.randomUUID(),
    ...data
  };

  products.push(
    newProduct
  );

  await writeProducts(
    products
  );

  return newProduct;
};