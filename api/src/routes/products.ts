import express, { response } from 'express';
import { ProductController } from '../controller/ProductController';
const router = express.Router();

let productController = new ProductController();


router.get("/", productController.findProduct)

router.post("/", productController.createProduct);

router.put("/", productController.updateProduct)

router.delete("/", productController.removeProduct)

export { router }
