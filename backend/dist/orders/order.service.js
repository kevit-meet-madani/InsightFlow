"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const redis_service_1 = require("../redis/redis.service");
const typeorm_2 = require("typeorm");
const microservices_1 = require("@nestjs/microservices");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const order_entity_1 = require("./order.entity");
const user_entity_1 = require("../users/user.entity");
const product_entity_1 = require("../products/product.entity");
let OrderService = class OrderService {
    orderRepo;
    redis;
    kafkaClient;
    amqpConnection;
    userRepo;
    productRepo;
    constructor(orderRepo, redis, kafkaClient, amqpConnection, userRepo, productRepo) {
        this.orderRepo = orderRepo;
        this.redis = redis;
        this.kafkaClient = kafkaClient;
        this.amqpConnection = amqpConnection;
        this.userRepo = userRepo;
        this.productRepo = productRepo;
    }
    async createOrder(data) {
        const customer = await this.userRepo.findOne({ where: { id: data.customerId } });
        console.log(data);
        if (!customer)
            throw new Error('Customer not found');
        let vendor = null;
        if (data.vendorId) {
            vendor = await this.userRepo.findOne({ where: { id: data.vendorId } });
            if (!vendor)
                throw new Error('Vendor not found');
        }
        const products = await this.productRepo.find({ where: { id: (0, typeorm_2.In)(data.products) } });
        if (products.length !== data.products.length)
            throw new Error('Some products not found');
        const order = this.orderRepo.create({
            customerId: customer.id,
            vendorId: vendor?.id,
            productIds: products.map(p => p.id),
            totalAmount: data.totalAmount,
            status: data.status ?? order_entity_1.OrderStatus.PENDING,
            remarks: data.remarks,
        });
        await this.orderRepo.save(order);
        await this.redis.set(`order:${order.id}`, JSON.stringify(order), 3600);
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
        await this.amqpConnection.publish('orders_exchange', 'order.payment', {
            orderId: order.id,
            action: 'PROCESS_PAYMENT',
            totalAmount: order.totalAmount,
        });
        return {
            message: 'Order created successfully',
            order,
        };
    }
    getAllOrders() {
        return this.orderRepo.find();
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, common_1.Inject)('KAFKA_SERVICE')),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(5, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository, redis_service_1.RedisService,
        microservices_1.ClientKafka,
        nestjs_rabbitmq_1.AmqpConnection,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map