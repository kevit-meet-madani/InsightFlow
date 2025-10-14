import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create.dto";

@Controller('users')
export class UsersController{
    constructor(private usersService:UsersService){}

    @Get()
    getAllUseres(){
        return this.usersService.findAll();
    }

    @Get(':id')
    getUserById(@Param('id') id:number){
        return this.usersService.getUserById(id);
    }

    @Patch(':id')
    updateUserById(@Param('id') id:number, @Body() data: User){
      return this.usersService.updateUser(id, data);
    }

    @Post('/create')
    createUser(@Body() data:CreateUserDto){
        return this.usersService.createUser(data);
    }

    @Delete(':id')
    deleteUser(@Param('id') id:number){
        return this.usersService.deleteUser(id);
    }
} 