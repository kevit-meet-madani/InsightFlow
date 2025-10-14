"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const microservices_1 = require("@nestjs/microservices");
const redis_module_1 = require("../redis/redis.module");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const order_entity_1 = require("./order.entity");
const user_entity_1 = require("../users/user.entity");
const product_entity_1 = require("../products/product.entity");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, user_entity_1.User, product_entity_1.Product]),
            microservices_1.ClientsModule.register([
                {
                    name: 'KAFKA_SERVICE',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'nestjs-app',
                            brokers: ['localhost:9092'],
                        }
                    },
                },
            ]),
            redis_module_1.RedisModule,
            nestjs_rabbitmq_1.RabbitMQModule.forRoot({
                exchanges: [
                    {
                        name: 'orders_exchange',
                        type: 'topic',
                    }
                ],
                uri: process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672',
                connectionInitOptions: { wait: true },
            }),
        ],
        providers: [order_service_1.OrderService],
        controllers: [order_controller_1.OrderController],
        exports: [order_service_1.OrderService]
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map