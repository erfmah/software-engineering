import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  async createToken(): Promise<any> {
    
  }

  @Get('authorized')
  async findAll(): Promise<any> {
    // this route is restricted
  }
}