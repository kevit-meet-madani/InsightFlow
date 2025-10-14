import { Product } from 'src/products/product.entity';
import { BaseEntity } from 'typeorm';
export declare class Inventory extends BaseEntity {
    id: number;
    product: Product;
    quantityAvailable: number;
    warehouseLocation: string;
    threshold: number;
}
