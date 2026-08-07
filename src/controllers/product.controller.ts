import { Request, Response, NextFunction } from "express";

import * as services from "../services";
import { pool } from "../config";

export async function getProductByIdController(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const result = await services.getProductById(pool, id);
    return res.status(result.status).json(result);
  
  } catch(error) {
    next(error);
  };
};

export async function createProductController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await services.createProduct(pool, req.body);
    return res.status(result.status).json(result);
  
  } catch(error) {
    next(error);
  };
};

export async function deleteProductController(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const result = await services.deleteProduct(pool, id);
    return res.status(result.status).json(result);
  
  } catch(error) {
    next(error);
  };
};

export async function updateProductController(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const result = await services.updateProduct(pool, id, req.body);
    return res.status(result.status).json(result);
  
  } catch(error) {
    next(error);
  };
};

export async function getAllProductsController(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);

    const result = await services.getAllProducts(pool, limit, offset);   
    return res.status(result.status).json(result);
  
  } catch(error) {
    next(error);
  };
};