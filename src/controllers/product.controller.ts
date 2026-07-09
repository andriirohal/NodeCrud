import { Request, Response, NextFunction } from "express";

import { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct } from "../services";

export const getProductByIdController = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const result = await getProductById(id);
    return res.status(result.status).json(result);
  
  } catch(error) {
    next(error);
  };
};

export const createProductController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await createProduct(req.body);
    return res.status(result.status).json(result);
  
  } catch(error) {
    next(error);
  };
};

export const deleteProductController = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const result = await deleteProduct(id);
    return res.status(result.status).json(result);
  
  } catch(error) {
    next(error);
  };
};

export const updateProductController = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const result = await updateProduct(id, req.body);
    return res.status(result.status).json(result);
  
  } catch(error) {
    next(error);
  };
};

export const getAllProductsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllProducts();   
    return res.status(result.status).json(result);
  
  } catch(error) {
    next(error);
  };
};