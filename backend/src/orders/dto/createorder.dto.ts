import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, ArrayNotEmpty, IsUUID, IsNumber } from 'class-validator';

export enum OrderStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @IsUUID()
  @IsOptional()
  vendorId?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID("all", { each: true })
  products: string[];

  @IsNumber()
  totalAmount: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsString()
  @IsOptional()
  remarks?: string;
}
