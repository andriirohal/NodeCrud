import { Router } from "express";

import * as controllers from "../controllers/product.controller.js";
import { validateId } from "../middlewares/product.middleware.js";

export const router = Router();

router.get("/", controllers.getProductsController);
router.post("/", controllers.createProductController);
router.get("/:id", validateId, controllers.getProductController);
router.patch("/:id", validateId, controllers.updateProductController);
router.delete("/:id", validateId, controllers.deleteProductController);