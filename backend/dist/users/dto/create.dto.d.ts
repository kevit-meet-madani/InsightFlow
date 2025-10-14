export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'vendor' | 'customer';
    avatarUrl?: string;
    isActive?: boolean;
}
