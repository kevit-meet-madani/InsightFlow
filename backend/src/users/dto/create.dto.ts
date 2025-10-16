import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['admin', 'vendor', 'customer'])
  @IsNotEmpty()
  role?: 'admin' | 'vendor' | 'customer';

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
