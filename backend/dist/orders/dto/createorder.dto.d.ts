export declare enum OrderStatus {
    PENDING = "pending",
    RUNNING = "running",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class CreateOrderDto {
    customerId: string;
    vendorId?: string;
    products: string[];
    totalAmount: number;
    status?: OrderStatus;
    remarks?: string;
}
