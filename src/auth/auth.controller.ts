import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './auth-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Авторизация' })
  @ApiBody({ type: AuthDto, description: 'Авторизация' })
  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body);
  }
}
