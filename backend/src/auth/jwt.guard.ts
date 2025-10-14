import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('Missing Authorization header');

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token)
      throw new UnauthorizedException('Invalid token format');

    const payload = await this.authService.verifyToken(token);
    request.user = payload; // attach user info to request object
    return true;
  }
}
