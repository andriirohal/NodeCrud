import { Request, Response, NextFunction } from "express";

const UUID_REDEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const validateId = (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  const id = req.params.id;
  
  if(!UUID_REDEX.test(id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid product ID",
      status: 400
    });
  };

  next();
};

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);

  return res.status(500).json({
    success: false,
    error: "Internal server error",
    status: 500
  });
};