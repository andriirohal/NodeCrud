// Database configuration

export { pool } from "../config";

// Types

export { Product, ProductInput, Result } from "../types";

// Router

export { router } from "../routes";

// Services

export { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct } from "../services";

// Middlewares

export { validateId, errorHandler } from "../middlewares";

// Controllers

export { getAllProductsController, createProductController, getProductByIdController, deleteProductController, updateProductController } from "../controllers";