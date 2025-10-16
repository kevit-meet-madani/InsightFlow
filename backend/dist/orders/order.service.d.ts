import { RedisService } from "src/redis/redis.service";
import { Repository } from "typeorm";
import { ClientKafka } from "@nestjs/microservices";
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateOrderDto } from "./dto/createorder.dto";
import { Order } from "./order.entity";
import { User } from "src/users/user.entity";
import { Product } from "src/products/product.entity";
export declare class OrderService {
    private orderRepo;
    private redis;
    private readonly kafkaClient;
    private readonly amqpConnection;
    private userRepo;
    private productRepo;
    constructor(orderRepo: Repository<Order>, redis: RedisService, kafkaClient: ClientKafka, amqpConnection: AmqpConnection, userRepo: Repository<User>, productRepo: Repository<Product>);
    createOrder(data: CreateOrderDto): Promise<{
        message: string;
        order: Order;
    }>;
    getAllOrders(): Promise<Order[]>;
}
