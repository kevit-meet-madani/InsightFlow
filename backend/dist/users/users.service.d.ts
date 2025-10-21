import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create.dto';
export declare class UsersService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    createUser(data: CreateUserDto): any;
    findByEmail(email: string): any;
    getUserById(id: number): any;
    findAll(): any;
    updateUser(id: number, data: User): any;
    deleteUser(id: number): any;
}
