import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(userdto: CreateUserDto): Promise<{
        message: string;
        user: any;
    }>;
    login(dto: any): Promise<{
        access_token: any;
    }>;
    getProfile(req: any): {
        message: string;
        user: any;
    };
    refresh(userId: number, refreshToken: string): Promise<{
        accessToken: any;
    }>;
    logout(dto: any): Promise<void>;
}
