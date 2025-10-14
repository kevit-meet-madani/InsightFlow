export declare enum ShipmentStatus {
    PENDING = "pending",
    DISPATCHED = "dispatched",
    IN_TRANSIT = "in_transit",
    DELIVERED = "delivered",
    FAILED = "failed"
}
export declare class Shipment {
    id: string;
    orderId: string;
    vendorId?: string;
    trackingNumber?: string;
    carrier?: string;
    status: ShipmentStatus;
    dispatchedAt?: Date;
    deliveredAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
