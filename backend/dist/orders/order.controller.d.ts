import { CreateOrderDto } from "./dto/createorder.dto";
import { OrderService } from "./order.service";
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(body: CreateOrderDto): Promise<{
        message: string;
        order: import("./order.entity").Order;
    }>;
    getAllOrders(): Promise<import("./order.entity").Order[]>;
}
