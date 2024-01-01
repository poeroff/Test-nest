import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { CreateUserinfoDto } from './dto/create-userinfo.dto';

import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { request } from 'http';
import { Serialze } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Controller('userinfo')
@Serialze(UserDto)
@UseGuards(AuthGuard)
export class UserinfoController {
  constructor(private readonly userinfoService: UserinfoService) {}

  @Get()
  findOne(@Req() request) {
    return this.userinfoService.findOne(request.user.id)
    
  }

}
