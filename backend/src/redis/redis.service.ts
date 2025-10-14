// src/redis/redis.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;

  onModuleInit() {
    this.redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
  password: process.env.REDIS_PASSWORD,
});

    this.redis.on('connect', () => console.log('Redis connected'));
    this.redis.on('error', (err) => console.error('Redis error', err));
  }

  onModuleDestroy() {
    this.redis.disconnect();
  }

  async set(key: string, value: string, ttl?: number) {
    if (ttl) {
      await this.redis.set(key, value, 'EX', ttl); // ttl in seconds
    } else {
      await this.redis.set(key, value);
    }
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async del(key: string) {
    return this.redis.del(key);
  }
}
