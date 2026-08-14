import validator from "validator";

export function isValidPrice(price: unknown): price is number {
  if(typeof price !== "number") {
    return false;
  };
  
  return Number.isFinite(price) && price > 0;
};

export function isValidStock(stock: unknown): stock is number {
  if(typeof stock !== "number") {
    return false;
  };

  return Number.isInteger(stock) && stock >= 0;
};

export function isValidName(name: unknown): name is string {
  if(typeof name !== "string") {
    return false;
  };

  return name === name.trim() && validator.isLength(name, { min: 1 });
};