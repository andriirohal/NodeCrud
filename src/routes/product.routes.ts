import { createProductController, getAllProductsController, getProductByIdController, deleteProductController, updateProductController } from "../controllers";
import { validateId } from "../middlewares";

import { Router } from "express";
export const router = Router();

router.get("/", getAllProductsController);
router.get("/:id", validateId, getProductByIdController);
router.delete("/:id", validateId, deleteProductController);
router.patch("/:id", validateId, updateProductController);
router.post("/", createProductController);