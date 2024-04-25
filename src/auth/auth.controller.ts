import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: any): Promise<{ access_token: string }> {
    return this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: any): Promise<{ access_token: string }> {
    return this.authService.login(userDto);
  }
}
