import { Product } from "./product.entity";
import { Repository } from "typeorm";
export declare class ProductService {
    private productRepo;
    constructor(productRepo: Repository<Product>);
    getProducts(): any;
}
