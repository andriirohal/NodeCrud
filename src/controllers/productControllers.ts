import { Request, Response } from "express";

import { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct } from "../repositories";

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if(!id || typeof id !== "string" || id.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid product ID"
      });
    };

    const result = await getProductById(id);

    if(!result.success) {
      return res.status(404).json(result);
    };

    return res.status(200).json(result);
  } catch(error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  };
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const result = await createProduct(req.body);

    if(!result.success) {
      return res.status(400).json(result);
    };

    return res.status(201).json(result);
  } catch(error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  };
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if(!id || typeof id !== "string" || id.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid product ID"
      });
    };

    const result = await deleteProduct(id);

    if(!result.success) {
      return res.status(404).json(result);
    };

    return res.status(200).json(result);
  } catch(error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  };
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if(!id || typeof id !== "string" || id.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid product ID"
      });
    };

    const result = await updateProduct(id, req.body);

    if(!result.success) {
      return res.status(404).json(result);
    };

    return res.status(200).json(result);
  } catch(error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  };
};

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    
    return res.status(200).json(products);
  } catch(error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  };
};