import { Controller, Get, UseGuards, Body, Headers, Req, Render } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  async createToken(): Promise<any> {
    
  }

  @Get('authorized')
  async findAll(@Req() data): Promise<any> {
    // this route is restricted
  }
}