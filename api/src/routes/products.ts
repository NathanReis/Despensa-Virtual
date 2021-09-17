import express from 'express';

import { ProductController } from '../controller/ProductController';

const router = express.Router();

let productController = new ProductController();

router.get("/", productController.findAll)
router.get("/:id", productController.findById)

router.post("/", productController.create);

router.put("/:id", productController.update)

router.delete("/:id", productController.remove)

export { router }
