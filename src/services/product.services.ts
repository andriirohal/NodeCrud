import { randomUUID } from "crypto";

import { Product, Result, ProductInput } from "../types";
import { writeProducts, readProducts } from "../repositories";

const findById = (products: Product[], id: string): Product | undefined => {
  return products.find((p) => p.id === id);
}; 

const isValidNumber = (n: number) => typeof n === "number" && n >= 0;
const isValidName = (s: string) => typeof s === "string" && s.trim().length > 0;

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

  if(data.name == null || data.price == null || data.stock == null) {
    return {
      success: false,
      error: "Missing required fields"
    };
  };

  if(!isValidName(data.name)) {
    return {
      success: false,
      error: "Invalid product name"
    };
  };
  
  if(!isValidNumber(data.price)) {
    return {
      success: false,
      error: "Invalid product price"
    };
  };
  
  if(!isValidNumber(data.stock)) {
    return {
      success: false,
      error: "Invalid product stock"
    };
  };
  
  const newProduct: Product = {
    id: randomUUID(),
    name: data.name.trim(),
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

export async function updateProduct(id: string, data: Partial<ProductInput>): Promise<Result<Product>> {
  const products = await readProducts();
  const product = findById(products, id);

  if(!product) {
    return {
      success: false,
      error: "Product not found"
    };
  };

  if(data.name != null) {
    if(!isValidName(data.name)) {
      return {
        success: false,
        error: "Invalid product name"
      };
    }; 

    product.name = data.name.trim();
  };

  if(data.price != null) {
    if(!isValidNumber(data.price)) {
      return {
        success: false,
        error: "Invalid product price"
      };
    };

    product.price = data.price;
  };

  if(data.stock != null) {
    if(!isValidNumber(data.stock)) {
      return {
        success: false,
        error: "Invalid product stock"
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

export async function getAllProducts(): Promise<Result<Product[]>> {
  return {
    success: true,
    data: await readProducts()
  };
};