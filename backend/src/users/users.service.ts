import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UsersService {
  
    constructor(@InjectRepository(User) private userRepo:Repository<User>) {}

    createUser(data:CreateUserDto){
      const res = this.userRepo.create(data);
      return this.userRepo.save(res);
    }

    findByUserName(username:string){
        return this.userRepo.findOneBy({});
    }

    getUserById(id:number){
        return this.userRepo.findOneBy({});
    }

    findAll(){
        return this.userRepo.find();
    }

    updateUser(id:number,data:User){
        return this.userRepo.update(id,data);
    }

    deleteUser(id:number){
        return this.userRepo.delete(id);
    }
}
