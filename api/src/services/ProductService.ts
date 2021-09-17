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
      throw new AppError('Produto já cadastrado');
    }

    const productCreate = productRepository.create({
      name,
      amount,
      brand
    })

    await productRepository.save(productCreate);

    return productCreate;
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

  async update({ name, amount, brand }: ProductEntity): Promise<ProductEntity> {
    const productRepository = getRepository(ProductEntity);
    const findProduct = await productRepository.findOne({
      where: { name }
    });

    if (!findProduct) {
      throw new AppError('Produto não encontrado', 404);
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
      throw new AppError('Produto não encontrado', 404);
    }

    await productRepository.remove(findProduct);

    return findProduct;
  }

}
export { ProductService };
