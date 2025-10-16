import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/redis/redis.service';
import { CreateUserDto } from 'src/users/dto/create.dto';
import { Login } from 'src/users/dto/login.dto';

import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService:RedisService
  ) {}

  async register(userDto: CreateUserDto) {
  // 1️⃣ Hash the password
  const hashedPassword = await bcrypt.hash(userDto.password, 10);

  // 2️⃣ Create user object to pass to service
  const newUserData = {
    ...userDto,
    password: hashedPassword,
    role: userDto.role || 'customer', // default role if not provided
    isActive: userDto.isActive ?? true, // default true
  };

  // 3️⃣ Call UserService to create the user
  const newUser = await this.usersService.createUser(newUserData);

  // 4️⃣ Return response without password
  const { password, ...userWithoutPassword } = newUser;

  return {
    message: 'User registered successfully',
    user: userWithoutPassword,
  };
}


  async login(loginDto: Login) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('User not found');
    
    console.log(loginDto.password+"---`"+user.password);
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { id: user.id, role: user.role };

    const access_token = this.jwtService.sign(payload ,{secret:process.env.JWT_SECRET,expiresIn:'15m'});
    const refresh_token = this.jwtService.sign(payload ,{secret:process.env.JWT_SECRET,expiresIn:'7d'});

    await this.redisService.set(`refresh:${user.id}`, refresh_token, 7 * 24 * 3600);
    return { access_token };
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

    async refreshAccessToken(userId: number, providedToken: string) {
    const storedToken = await this.redisService.get(`refresh:${userId}`);

    if (!storedToken || storedToken !== providedToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Optionally rotate refresh token here

    const newAccessToken = this.jwtService.sign(
      { userId },
      { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '15m' },
    );

    return newAccessToken;
  }

  async logout(body:any){
    await this.redisService.del(`refresh:${body.userId}`);
  }
}
