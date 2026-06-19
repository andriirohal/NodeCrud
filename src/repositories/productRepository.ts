import fs from "fs/promises";
import path from "path";

import { Product, ProductInput, Result } from "../types";

const filePath = path.join(process.cwd(), "src/data/products.json");

const findById = (products: Product[], id: string): Product | undefined => {
  return products.find((p) => p.id === id);
}; 

const isNonNegative = (n: number) => n >= 0;
const isEmpty = (s: string) => !s.trim();

async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch(error) {
    console.error("Failed to read products file", error);
    return [];
  };
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

  if(isEmpty(data.name)) {
    return {
      success: false,
      error: "Name must not be empty"
    };
  };
  
  if(!isNonNegative(data.price)) {
    return {
      success: false,
      error: "Price must be 0 or greater"
    };
  };
  
  if(!isNonNegative(data.stock)) {
    return {
      success: false,
      error: "Stock must be 0 or greater"
    };
  };
  
  const newProduct: Product = {
    id: crypto.randomUUID(),
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
    if(isEmpty(data.name)) {
      return {
        success: false,
        error: "Name must not be empty"
      };
    }; 

    product.name = data.name;
  };

  if(data.price !== undefined) {
    if(!isNonNegative(data.price)) {
      return {
        success: false,
        error: "Price must be 0 or greater"
      };
    };

    product.price = data.price;
  };

  if(data.stock !== undefined) {
    if(!isNonNegative(data.stock)) {
      return {
        success: false,
        error: "Stock must be 0 or greater"
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