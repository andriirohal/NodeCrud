const PRICE_FORMAT = /^\d{1,8}(\.\d{1,2})?$/;
const MAX_STOCK = 2_147_483_647;

export function isValidName(name: unknown): name is string {
  if(typeof name !== "string") {
    return false;
  };

  return name === name.trim() && name.length > 0;
};

export function isValidPrice(price: unknown): price is string {
  if(typeof price !== "string") {
    return false;
  };
  
  return Number(price) > 0 && PRICE_FORMAT.test(price);
};

export function isValidStock(stock: unknown): stock is number {
  if(typeof stock !== "number") {
    return false;
  };

  return Number.isInteger(stock) && stock >= 0 && stock <= MAX_STOCK;
};