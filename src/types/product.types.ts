export type Product = {
  id: string,
  name: string,
  price: number,
  stock: number
};

export type ProductInput = Omit<Product, "id">;

export type Result<D> = | { success: true, data: D } | { success: false, error: string };