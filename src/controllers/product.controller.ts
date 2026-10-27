import type { Request, Response, NextFunction } from "express";

import * as services from "../services/product.service.js";
import type { CreateProductInput, UpdateProductInput } from "../types/product.types.js";

export async function getProductController(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const response = await services.getProduct(id);
    return res.status(response.status).json(response);
  
  } catch(error) {
    next(error);
  };
};

export async function createProductController(req: Request<{}, {}, CreateProductInput>, res: Response, next: NextFunction) {
  try {
    const response = await services.createProduct(req.body);
    return res.status(response.status).json(response);
  
  } catch(error) {
    next(error);
  };
};

export async function deleteProductController(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const response = await services.deleteProduct(id);
    return res.status(response.status).json(response);
  
  } catch(error) {
    next(error);
  };
};

export async function updateProductController(req: Request<{ id: string }, {}, UpdateProductInput>, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const repsonse = await services.updateProduct(id, req.body);
    return res.status(repsonse.status).json(repsonse);
  
  } catch(error) {
    next(error);
  };
};

export async function getProductsController(req: Request<{}, {}, {}, { limit: number, offset: number }>, res: Response, next: NextFunction) {
  try {
    const limit = req.query.limit;
    const offset = req.query.offset;

    const response = await services.getProducts(limit, offset);   
    return res.status(response.status).json(response);
  
  } catch(error) {
    next(error);
  };
};