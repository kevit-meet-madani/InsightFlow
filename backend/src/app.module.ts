import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { RedisModule } from './redis/redis.module';
import { ClientsModule , Transport } from '@nestjs/microservices';
import { OrderModule } from './orders/order.module';
import { User } from './users/user.entity';
import { Order } from './orders/order.entity';
import { Product } from './products/product.entity';
import { Notification } from './notification/notification.entity';
import { Inventory } from './invnentory/inventory.entity';
import { Shipment } from './shipment/shipment.entity';
import { Payment } from './payment/payment.entity';
import { ProductModule } from './products/product.module';


dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD || 'your_password',
      database: process.env.DB_NAME || 'testdb',
      entities: [User,Order,Product,Notification,Inventory,Shipment,Payment],          
      synchronize: true,         
      logging: true,
    }),
    AuthModule, 
    UsersModule,
    OrderModule,
    JwtModule,
    RedisModule,
    ProductModule  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
