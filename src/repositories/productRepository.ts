import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import { Product, ProductInput, Result } from "../types";

const filePath = path.join(process.cwd(), "src/data/products.json");

const findById = (products: Product[], id: string): Product | undefined => {
  return products.find((p) => p.id === id);
}; 

const isNonNegative = (n: number) => n >= 0;
const isEmpty = (s: string) => !s.trim();

async function readProducts(): Promise<Product[]> {
  const data = await fs.readFile(filePath, "utf-8");
    
  if(!data.trim()) return [];
    
  return JSON.parse(data) as Product[];
};

async function writeProducts(products: Product[]) {
  await fs.writeFile(filePath, JSON.stringify(products, null, 2));
};

export async function getProductById(id: string): Promise<Result<Product>> {
  const products = await readProducts();
  const product = findById(products, id);

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
};

export async function createProduct(data: ProductInput): Promise<Result<Product>> {
  const products = await readProducts();

  if(data.name === undefined || data.price === undefined || data.stock === undefined) {
    return {
      success: false,
      error: "Missing required fields"
    };
  };

  if(typeof data.name !== "string" || isEmpty(data.name)) {
    return {
      success: false,
      error: "Name is not valid"
    };
  };
  
  if(typeof data.price !== "number" || !isNonNegative(data.price)) {
    return {
      success: false,
      error: "Price is not valid"
    };
  };
  
  if(typeof data.stock !== "number" || !isNonNegative(data.stock)) {
    return {
      success: false,
      error: "Stock is not valid"
    };
  };
  
  const newProduct: Product = {
    id: randomUUID(),
    name: data.name,
    price: data.price,
    stock: data.stock
  };

  products.push(newProduct);

  await writeProducts(products);

  return {
    success: true,
    data: newProduct
  };
};

export async function deleteProduct(id: string): Promise<Result<Product>> {
  const products = await readProducts();
  
  const index = products.findIndex((p) => p.id === id);

  if(index === -1) {
    return {
      success: false,
      error: "Product not found"
    };
  };

  const deleted = products.splice(index, 1)[0];

  await writeProducts(products);

  return {
    success: true,
    data: deleted
  };
};

export async function updateProduct(id: string, data: ProductInput): Promise<Result<Product>> {
  const products = await readProducts();
  const product = findById(products, id);

  if(!product) {
    return {
      success: false,
      error: "Product not found"
    };
  };

  if(data.name !== undefined) {
    if(typeof data.name !== "string" || isEmpty(data.name)) {
      return {
        success: false,
        error: "Name is not valid"
      };
    }; 

    product.name = data.name;
  };

  if(data.price !== undefined) {
    if(typeof data.price !== "number" || !isNonNegative(data.price)) {
      return {
        success: false,
        error: "Price is not valid"
      };
    };

    product.price = data.price;
  };

  if(data.stock !== undefined) {
    if(typeof data.stock !== "number" || !isNonNegative(data.stock)) {
      return {
        success: false,
        error: "Stock is not valid"
      };
    };

    product.stock = data.stock;
  };

  await writeProducts(products);

  return {
    success: true,
    data: product
  };
};

export async function getAllProducts(): Promise<Product[]> {
  return readProducts();
};