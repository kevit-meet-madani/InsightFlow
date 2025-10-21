import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class RedisService implements OnModuleInit, OnModuleDestroy {
    private redis;
    onModuleInit(): void;
    onModuleDestroy(): void;
    set(key: string, value: string, ttl?: number): Promise<void>;
    get(key: string): Promise<any>;
    del(key: string): Promise<any>;
}
