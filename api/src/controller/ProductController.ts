import { Request, Response } from 'express';

import { ProductEntity } from '../entity/ProductEntity';
import { AppError } from '../errors/AppErrors';
import { ProductService } from '../services/ProductService';

function fillProduct(request: Request): ProductEntity {
  const { name, amount, brand } = request.body;

  let product = new ProductEntity();
  product.name = name;
  product.amount = Number(amount);
  product.brand = brand;

  if (request.params.id) {
    product.id = Number(request.params.id);
  }

  return product;
}

export class ProductController {
  async create(request: Request, response: Response): Promise<Response> {
    const product = fillProduct(request);

    if (!product.name || !product.amount || !product.brand) {
      throw new AppError('Nome, quantidade e/ou marca não informado');
    }

    const productService = new ProductService();
    await productService.create(product);

    return response.status(201).json({ id: product.id });
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    let productService = new ProductService();
    let products = await productService.findAll();

    return response.json(products);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    let id = Number(request.params.id);

    const productService = new ProductService();
    const product = await productService.findById(id);

    return response.json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const product = fillProduct(request);

    if (!product.id || !product.name || !product.amount || !product.brand) {
      throw new AppError('ID, nome, quantidade e/ou marca não informado');
    }

    const productService = new ProductService();
    await productService.update(product);

    return response.json({ id: product.id });
  }

  async remove(request: Request, response: Response): Promise<Response> {
    let id = Number(request.params.id);

    const productService = new ProductService();
    await productService.remove(id);

    return response.json({ id });
  }
}
