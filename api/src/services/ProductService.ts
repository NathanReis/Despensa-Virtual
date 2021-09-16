import { ProductEntity } from './../entity/ProductEntity';
import { getRepository } from 'typeorm';
import { AppError } from '../errors/AppErrors';

class ProductService {
  async create({ name, amount, brand }: ProductEntity): Promise<ProductEntity> {

    const productRepository = getRepository(ProductEntity);
    const findProduct = await productRepository.findOne({
      where: { name }
    });
    if (findProduct) {
      // throw new AppError('Produto já cadastrado');
      throw new Error('Produto já cadastrado');
    }
    const productCreate = productRepository.create({
      name,
      amount,
      brand
    })

    await productRepository.save(productCreate);
    return productCreate;
  }

  async findOne({ name }: ProductEntity): Promise<ProductEntity> {
    const productRepository = getRepository(ProductEntity);
    const findProduct = await productRepository.findOne({
      where: { name }
    });

    if (!findProduct) {
      // throw new AppError('Produto não encontrado', 404);
      throw new Error('Produto não encontrado');
    }
    return findProduct;

  }

  async update({ name, amount, brand }: ProductEntity): Promise<ProductEntity> {
    const productRepository = getRepository(ProductEntity);
    const findProduct = await productRepository.findOne({
      where: { name }
    });

    if (!findProduct) {
      // throw new AppError('Produto não encontrado', 404);
      throw new Error('Produto não encontrado');
    }

    findProduct.name = name;
    findProduct.amount = amount;
    findProduct.brand = brand;

    await productRepository.save(findProduct);
    return findProduct;
  }

  async remove({ name }: ProductEntity): Promise<ProductEntity> {
    const productRepository = getRepository(ProductEntity);
    const findProduct = await productRepository.findOne({
      where: { name }
    });

    if (!findProduct) {
      // throw new AppError('Produto não encontrado', 404);
      throw new Error('Produto não encontrado');
    }

    await productRepository.remove(findProduct);
    return findProduct;
  }

}
export { ProductService };
