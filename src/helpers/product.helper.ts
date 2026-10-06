export function isValidName(name: unknown): name is string {
  if(typeof name !== "string") {
    return false;
  };

  return name === name.trim() && name.length > 0;
};

export function isValidPrice(price: unknown): price is number {
  if(typeof price !== "number" || !Number.isFinite(price)) {
    return false;
  };
  
  return Math.round(price * 100) / 100 === price && price > 0;
};

export function isValidStock(stock: unknown): stock is number {
  if(typeof stock !== "number") {
    return false;
  };

  return Number.isInteger(stock) && stock >= 0;
};