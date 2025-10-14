import { InjectRepository } from "@nestjs/typeorm";
import { RedisService } from "src/redis/redis.service";
import { Repository, In } from "typeorm";
import { ClientKafka } from "@nestjs/microservices";
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject } from "@nestjs/common";
import { CreateOrderDto } from "./dto/createorder.dto";
import { Order, OrderStatus } from "./order.entity";
import { User } from "src/users/user.entity";
import { Product } from "src/products/product.entity";
// ...existing code...

export class OrderService{

    constructor(@InjectRepository(Order) private orderRepo:Repository<Order>,private redis:RedisService,@Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
    private readonly amqpConnection: AmqpConnection,
    @InjectRepository(User) private userRepo:Repository<User>,
    @InjectRepository(Product) private productRepo:Repository<Product>
  ) {}

    

    async createOrder(data: CreateOrderDto) {

      



  const customer = await this.userRepo.findOne({ where: { id: data.customerId } });
  console.log(data);
  if (!customer) throw new Error('Customer not found');

  // 2️⃣ Validate vendor if provided
  let vendor: User | null = null;
  if (data.vendorId) {
    vendor = await this.userRepo.findOne({ where: { id: data.vendorId } });
    if (!vendor) throw new Error('Vendor not found');
  }

  // 3️⃣ Validate products
  const products = await this.productRepo.find({ where: { id: In(data.products) } });
  if (products.length !== data.products.length) throw new Error('Some products not found');

  // 4️⃣ Create order
  const order = this.orderRepo.create({
    customerId: customer.id,
    vendorId: vendor?.id,
    productIds: products.map(p => p.id),
    totalAmount: data.totalAmount,
    status: data.status ?? OrderStatus.PENDING,
    remarks: data.remarks,
  });

  await this.orderRepo.save(order);

  // 5️⃣ Cache order in Redis
  await this.redis.set(`order:${order.id}`, JSON.stringify(order), 3600);

  // 6️⃣ Emit Kafka event
  await this.kafkaClient.connect();
  this.kafkaClient.emit('order_created', {
    key: order.id,
    value: {
      orderId: order.id,
      customerId: order.customerId,
      vendorId: order.vendorId,
      totalAmount: order.totalAmount,
      timestamp: new Date().toISOString(),
      products: order.productIds,
    },
  });

  // 7️⃣ Publish RabbitMQ message for payment
  await this.amqpConnection.publish('orders_exchange', 'order.payment', {
    orderId: order.id,
    action: 'PROCESS_PAYMENT',
    totalAmount: order.totalAmount,
  });

  // 8️⃣ Return response
  return {
    message: 'Order created successfully',
    order,
  };
}

}


