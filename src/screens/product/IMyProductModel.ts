export interface IMyProductModel {
    id: number;
    idProduct: number;
    idUserGroup: number;
    amount: number;
    status: string;
    productEntity: {
        barcode: string;
        id: number;
        name: string;
    }
    validate: string;
};
