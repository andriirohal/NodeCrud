import validator from "validator";

export function isValidPrice(price: unknown): price is number {
  return typeof price === "number" && Number.isFinite(price) && price >= 0;
};

export function isValidStock(stock: unknown): stock is number {
  return typeof stock === "number" && Number.isInteger(stock) && stock >= 0;
};

export function isValidName(name: unknown): name is string {
  return typeof name === "string" && validator.isLength(name.trim(), { min: 1 });
};