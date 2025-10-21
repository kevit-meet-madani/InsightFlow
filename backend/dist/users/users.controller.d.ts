import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAllUseres(): any;
    getUserById(id: number): any;
    updateUserById(id: number, data: User): any;
    createUser(data: CreateUserDto): any;
    deleteUser(id: number): any;
}
