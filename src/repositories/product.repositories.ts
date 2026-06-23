import fs from "fs/promises";
import path from "path";

import { Product } from "../types";

const filePath = path.join(process.cwd(), "src/data/products.json");

export async function readProducts(): Promise<Product[]> {
  const data = await fs.readFile(filePath, "utf-8");
    
  if(!data.trim()) return [];
  
  return JSON.parse(data) as Product[];
};

export async function writeProducts(products: Product[]) {
  await fs.writeFile(filePath, JSON.stringify(products, null, 2));
};