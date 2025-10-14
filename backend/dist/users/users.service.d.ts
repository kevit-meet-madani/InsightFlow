import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create.dto';
export declare class UsersService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    createUser(data: CreateUserDto): Promise<User>;
    findByUserName(username: string): Promise<User | null>;
    getUserById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    updateUser(id: number, data: User): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
