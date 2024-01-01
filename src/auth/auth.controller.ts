import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthDto } from './dto/auth.dto';
import { Serialze } from '../interceptors/serialize.interceptor';

@Controller('auth')


export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/signup")
  @Serialze(AuthDto)
  create(@Body() body: CreateAuthDto) {
    return this.authService.create(body);
  }
  @Post("/login")
 async login(@Body() body : LoginAuthDto){
   const token = await this.authService.login(body.email, body.Password)
   return token
  
  }
}
