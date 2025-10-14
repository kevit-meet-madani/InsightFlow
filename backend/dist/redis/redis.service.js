"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
let RedisService = class RedisService {
    redis;
    onModuleInit() {
        this.redis = new ioredis_1.default({
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
    async set(key, value, ttl) {
        if (ttl) {
            await this.redis.set(key, value, 'EX', ttl);
        }
        else {
            await this.redis.set(key, value);
        }
    }
    async get(key) {
        return this.redis.get(key);
    }
    async del(key) {
        return this.redis.del(key);
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)()
], RedisService);
//# sourceMappingURL=redis.service.js.map