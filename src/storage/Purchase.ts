import { LocalStorageHelper } from '../helpers/LocalStorageHelper';
import { IProductModel } from '../screens/product/IProductModel';

export class Purchase {
  public static async getProducts(): Promise<IProductModel[]> {
    let json = await LocalStorageHelper.get('products') || '[]';

    return JSON.parse(json);
  }

  public static async findProductByBarcode(barcode: string): Promise<IProductModel | undefined> {
    let products = await this.getProducts();

    return products.find(_product => _product.barcode === barcode);
  }

  private static async saveProducts(products: IProductModel[]): Promise<void> {
    let json = JSON.stringify(products);

    await LocalStorageHelper.set('products', json);
  }

  public static async addProduct(product: IProductModel): Promise<void> {
    let products = await this.getProducts();
    let index = products.findIndex(_product => _product.barcode === product.barcode);

    if (index === -1) {
      products.push(product);
    } else {
      products[index] = product;
    }

    await this.saveProducts(products);
  }
}
