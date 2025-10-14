import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAllUseres(): Promise<User[]>;
    getUserById(id: number): Promise<User | null>;
    updateUserById(id: number, data: User): Promise<import("typeorm").UpdateResult>;
    createUser(data: CreateUserDto): Promise<User>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
