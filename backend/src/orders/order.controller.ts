import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dto/createorder.dto";
import { OrderService } from "./order.service";

@Controller('orders')
export class OrderController{

   constructor(private orderService:OrderService) {}   

   @Post('create')
   createOrder(@Body() body:CreateOrderDto){
     return this.orderService.createOrder(body);
   }
}