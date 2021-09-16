import { Request, Response } from 'express';
import { ProductEntity } from '../entity/ProductEntity';
import { ProductService } from '../services/ProductService';
import { AppError } from '../errors/AppErrors';

function fillProduct(request: Request): ProductEntity {
  const { name, amount, brand } = request.body;

  let product = new ProductEntity();
  product.name = name;
  product.amount = amount;
  product.brand = brand;

  return product;
}

class ProductController {

  async createProduct(request: Request, response: Response) {
    const product = fillProduct(request);

    if (!product.name || !product.amount || !product.brand) {
      // throw new AppError('nome ou quantidade ou marca não informado');
      throw new Error('nome ou quantidade ou marca não informado');
    }

    const productService = new ProductService();
    const productCreated = await productService.create(product);

    return response.status(201).json(productCreated);
  }

  async findProduct(request: Request, response: Response) {
    const product = fillProduct(request);

    const productService = new ProductService();
    const productFound = await productService.findOne(product)

    return response.status(201).json(productFound);

  }

  async updateProduct(request: Request, response: Response) {
    const product = fillProduct(request);
    const productService = new ProductService();
    const productFound = await productService.update(product);

    return response.status(201).json(productFound);
  }

  async removeProduct(request: Request, response: Response) {
    const product = fillProduct(request);
    const productService = new ProductService();
    const productFound = await productService.remove(product);
    return response.status(201).json(productFound);
  }

}

export { ProductController };
