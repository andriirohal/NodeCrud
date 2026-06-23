import { Request, Response, NextFunction } from "express"
import { validate as isUuid } from "uuid";

export const validateId = (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  const id = req.params.id;
  
  if(!isUuid(id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid product ID"
    });
  };

  next();
};

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  return res.status(500).json({
    success: false,
    error: "Internal server error"
  });
};