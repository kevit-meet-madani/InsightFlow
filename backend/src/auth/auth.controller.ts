import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { User } from 'src/users/dto/user.dto';
import { CreateUserDto } from 'src/users/dto/create.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() userdto: CreateUserDto) {
    return this.authService.register(userdto);
  }

  @Post('login')
  login(@Body() dto: any) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return { message: 'Protected route accessed', user: req.user };
  }

   @Post('refresh')
  async refresh(@Body('userId') userId: number, @Body('refreshToken') refreshToken: string) {
    // Validate and generate new access token
    const newAccessToken = await this.authService.refreshAccessToken(userId, refreshToken);
    return { accessToken: newAccessToken };
  }

  @Post('logout')
  logout(@Body() dto: any) {
    return this.authService.logout(dto);
  }
}
