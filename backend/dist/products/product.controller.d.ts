import { ProductService } from "./product.service";
export declare class ProductController {
    private producService;
    constructor(producService: ProductService);
    getProducts(): any;
}
