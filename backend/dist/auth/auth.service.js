"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const redis_service_1 = require("../redis/redis.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    usersService;
    jwtService;
    redisService;
    constructor(usersService, jwtService, redisService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.redisService = redisService;
    }
    async register(userDto) {
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const newUserData = {
            ...userDto,
            password: hashedPassword,
            role: userDto.role || 'customer',
            isActive: userDto.isActive ?? true,
        };
        const newUser = await this.usersService.createUser(newUserData);
        const { password, ...userWithoutPassword } = newUser;
        return {
            message: 'User registered successfully',
            user: userWithoutPassword,
        };
    }
    async login(loginDto) {
        const user = await this.usersService.findByUserName(loginDto.email);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = { sub: user.id, username: user.name };
        const access_token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '15m' });
        const refresh_token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '7d' });
        await this.redisService.set(`refresh:${user.id}`, refresh_token, 7 * 24 * 3600);
        return { access_token };
    }
    async verifyToken(token) {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    async refreshAccessToken(userId, providedToken) {
        const storedToken = await this.redisService.get(`refresh:${userId}`);
        if (!storedToken || storedToken !== providedToken) {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        const newAccessToken = this.jwtService.sign({ userId }, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '15m' });
        return newAccessToken;
    }
    async logout(body) {
        await this.redisService.del(`refresh:${body.userId}`);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        redis_service_1.RedisService])
], AuthService);
//# sourceMappingURL=auth.service.js.map