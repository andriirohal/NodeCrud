export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export type ProductInput = Omit<Product, "id">;

export type Result<D> = | { success: true, data: D, status: number } | { success: false, error: string, status: number };