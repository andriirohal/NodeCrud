import { Router } from "express";
export const router = Router();

import { createProductController, getAllProductsController, getProductByIdController, deleteProductController, updateProductController } from "../controllers";
import { validateId } from "../middlewares";

router.get("/", getAllProductsController);
router.get("/:id", validateId, getProductByIdController);
router.delete("/:id", validateId, deleteProductController);
router.patch("/:id", validateId, updateProductController);
router.post("/", createProductController);