import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";

export class ProductService{

    constructor(@InjectRepository(Product) private productRepo:Repository<Product>) {}

    getProducts(){
        return this.productRepo.find();
    }
}