export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export type CreateProductInput = {
  name: string;
  price: number;
  stock: number;
};

export type UpdateProductInput = {
  name: string | null;
  price: number | null;
  stock: number | null;
};

export type Result<D> = { success: true; data: D; status: number; } | { success: false; error: string; status: number; };