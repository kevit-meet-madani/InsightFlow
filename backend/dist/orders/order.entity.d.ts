export declare enum OrderStatus {
    PENDING = "pending",
    RUNNING = "running",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class Order {
    id: string;
    orderNumber: string;
    customerId: string;
    vendorId?: string;
    productIds: string[];
    totalAmount: number;
    status: OrderStatus;
    remarks?: string;
    placedAt: Date;
    updatedAt: Date;
}
