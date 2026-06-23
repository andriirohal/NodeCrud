import { Request, Response, NextFunction } from "express";

import { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct } from "../services";
import { Result } from "../types";

const handleResult = <D>(res: Response, result: Result<D>, successStatus: number = 200) => {
  if(!result.success) {
    const status = result.error === "Product not found" ? 404 : 400;
    return res.status(status).json(result);
  };

  return res.status(successStatus).json(result);
};

export const getProductByIdController = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const result = await getProductById(id);
    return handleResult(res, result);
  } catch(error) {
    next(error);
  };
};

export const createProductController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await createProduct(req.body);
    return handleResult(res, result);
  } catch(error) {
    next(error);
  };
};

export const deleteProductController = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const result = await deleteProduct(id);
    return handleResult(res, result);
  } catch(error) {
    next(error);
  };
};

export const updateProductController = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const result = await updateProduct(id, req.body);
    return handleResult(res, result);
  } catch(error) {
    next(error);
  };
};

export const getAllProductsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllProducts();   
    return handleResult(res, result);
  } catch(error) {
    next(error);
  };
};