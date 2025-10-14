import { IsNotEmpty } from "class-validator";

export class User{

    @IsNotEmpty()
    id:number;

    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    password:string;
}