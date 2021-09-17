import { getRepository } from 'typeorm';

import { ProductEntity } from '../entity/ProductEntity';
import { AppError } from '../errors/AppErrors';

export class ProductService {
  async create(product: ProductEntity): Promise<void> {
    const productRepository = getRepository(ProductEntity);
    const productFound = await productRepository.findOne({
      where: { name: product.name }
    });

    if (productFound) {
      throw new AppError('Produto já cadastrado');
    }

    await productRepository.save(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    let productRepository = getRepository(ProductEntity);
    let products = productRepository.find();

    if (!products) {
      throw new AppError('Nenhum produto encontrado', 404);
    }

    return products;
  }

  async findById(id: Number): Promise<ProductEntity> {
    const productRepository = getRepository(ProductEntity);
    const product = await productRepository.findOne({
      where: { id }
    });

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    return product;
  }

  async update(product: ProductEntity): Promise<void> {
    const productRepository = getRepository(ProductEntity);
    const productFound = await productRepository.findOne({
      where: { id: product.id }
    });

    if (!productFound) {
      throw new AppError('Produto não encontrado', 404);
    }

    await productRepository.save(product);
  }

  async remove(id: Number): Promise<void> {
    const productRepository = getRepository(ProductEntity);
    const productFound = await productRepository.findOne({
      where: { id }
    });

    if (!productFound) {
      throw new AppError('Produto não encontrado', 404);
    }

    await productRepository.remove(productFound);
  }
}
