import { Router } from "express";
import { createProductController, getAllProductsController, getProductByIdController, deleteProductController, updateProductController } from "../controllers";

export const router = Router();

router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);
router.delete("/:id", deleteProductController);
router.patch("/:id", updateProductController);
router.post("/", createProductController);