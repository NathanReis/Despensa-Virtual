export interface IProductModel {
  id: number;
  name: string;
  barcode: string;
  categoryEntity: {
    id: number;
    ncm: number;
    description: string;
  }
};
