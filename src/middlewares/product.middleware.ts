import type { Request, Response, NextFunction } from "express";

import validator from "validator";

export function validateId(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  const { id } = req.params;
  
  if(!validator.isUUID(id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid product ID",
      status: 400
    });
  };

  next();
};

export function uniqueHandler(error: unknown, _req: Request, res: Response, next: NextFunction) {
  const err = error as { 
    code?: string;
    constraint?: string;
  };

  if(err.code === "23505" && err.constraint === "products_name_unique") {
    return res.status(409).json({
      success: false,
      error: "A product with this name already exists",
      status: 409
    });
  };

  next(error);
};

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error(error);

  return res.status(500).json({
    success: false,
    error: "Internal server error",
    status: 500
  });
};