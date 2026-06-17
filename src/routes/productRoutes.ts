import { Router } from "express";
import { addProductController, getAllProductsController, getProductByIdController } from "../controllers";

export const router = Router();

router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);
router.post("/", addProductController);