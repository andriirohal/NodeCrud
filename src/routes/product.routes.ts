import { Router } from "express";
export const router = Router();

import { createProductController, getAllProductsController, getProductByIdController, deleteProductController, updateProductController, validateId } from "../core";

router.get("/", getAllProductsController);
router.post("/", createProductController);
router.get("/:id", validateId, getProductByIdController);
router.patch("/:id", validateId, updateProductController);
router.delete("/:id", validateId, deleteProductController);