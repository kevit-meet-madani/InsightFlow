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
        user: any;
    }>;
    login(loginDto: Login): Promise<{
        access_token: any;
    }>;
    verifyToken(token: string): Promise<any>;
    refreshAccessToken(userId: number, providedToken: string): Promise<any>;
    logout(body: any): Promise<void>;
}
