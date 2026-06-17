import { Request, Response } from "express";
import { createProduct, getProducts, getProductById } from "../repositories";

export const getAllProductsController = async (req: Request, res: Response) => {
  const products = await getProducts();
  res.json(products);
};

export const getProductByIdController = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await getProductById(id);

  if(!result.success) {
    return res.status(404).json(result);
  };

  return res.json(result);
};

export const addProductController = async (req: Request, res: Response) => {
  const product = await createProduct(req.body);
  res.json(product);
};