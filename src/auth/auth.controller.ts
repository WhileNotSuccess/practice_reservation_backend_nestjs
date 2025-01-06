import { Controller, Get, HttpException, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Get('login')
  @UseGuards(AuthGuard('google'))
  loginUser(){
    return 'login'
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  validateUser(@Req() req){
    return this.authService.validateUser(req.user)
  }
  
}
