import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './auth-dto';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.stratetgy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @ApiOperation({ summary: 'Авторизация' })
  @ApiBody({ type: AuthDto, description: 'Авторизация' })
  @UseGuards(LocalStrategy)
  @Post('login')
  async login(@Request() req, @Body() body) {
    // console.log('udasdas', req);
    return this.authService.login(body);
  }
}
