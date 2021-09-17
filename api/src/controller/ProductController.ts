import { Request, Response } from 'express';

import { ProductEntity } from '../entity/ProductEntity';
import { AppError } from '../errors/AppErrors';
import { ProductService } from '../services/ProductService';

function fillProduct(request: Request): ProductEntity {
  const { name, amount, brand } = request.body;

  let product = new ProductEntity();
  product.name = name;
  product.amount = amount;
  product.brand = brand;

  return product;
}

export class ProductController {
  async create(request: Request, response: Response) {
    const product = fillProduct(request);

    if (!product.name || !product.amount || !product.brand) {
      throw new AppError('nome ou quantidade ou marca não informado');
    }

    const productService = new ProductService();
    const productCreated = await productService.create(product);

    return response.status(201).json(productCreated);
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    let productService = new ProductService();
    let products = await productService.findAll();

    return response.json(products);
  }

  async findById(request: Request, response: Response) {
    let id = (Number)(request.params.id);

    const productService = new ProductService();
    const product = await productService.findById(id);

    return response.json(product);
  }

  async update(request: Request, response: Response) {
    const product = fillProduct(request);
    const productService = new ProductService();
    const productFound = await productService.update(product);

    return response.status(201).json(productFound);
  }

  async remove(request: Request, response: Response) {
    const product = fillProduct(request);
    const productService = new ProductService();
    const productFound = await productService.remove(product);

    return response.status(201).json(productFound);
  }
}
