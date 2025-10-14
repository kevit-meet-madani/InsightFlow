import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
import { CreateUserDto } from 'src/users/dto/create.dto';
import { Login } from 'src/users/dto/login.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private redisService;
    constructor(usersService: UsersService, jwtService: JwtService, redisService: RedisService);
    register(userDto: CreateUserDto): Promise<{
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            avatarUrl?: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(loginDto: Login): Promise<{
        access_token: string;
    }>;
    verifyToken(token: string): Promise<any>;
    refreshAccessToken(userId: number, providedToken: string): Promise<string>;
    logout(body: any): Promise<void>;
}
