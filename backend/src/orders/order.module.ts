import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisModule } from 'src/redis/redis.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Order } from './order.entity';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';


@Module({
    imports:[
        TypeOrmModule.forFeature([Order,User,Product]),
        ClientsModule.register([
              {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                  client: {
                    clientId: 'nestjs-app',
                    brokers: ['localhost:9092'], // your Kafka broker
                  }
                  // consumer: {
                  //   groupId: 'nestjs-consumer', // consumer group
                  // },
                },
              },
            ]),
            RedisModule,
            RabbitMQModule.forRoot({
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
    providers:[OrderService],
    controllers:[OrderController],
    exports:[OrderService]
})

export class OrderModule {}