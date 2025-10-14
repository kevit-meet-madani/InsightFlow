import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(userdto: CreateUserDto): Promise<{
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
    login(dto: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): {
        message: string;
        user: any;
    };
    refresh(userId: number, refreshToken: string): Promise<{
        accessToken: string;
    }>;
    logout(dto: any): Promise<void>;
}
