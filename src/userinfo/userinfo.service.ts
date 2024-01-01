import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserinfoDto } from './dto/create-userinfo.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import _ from "lodash"

@Injectable()
export class UserinfoService {
  constructor(@InjectRepository(Auth) private  authRepository : Repository<Auth>){}
 

  async findOne(id: number) {
    const user = await this.authRepository.findOne({where : {id : id}})
    if(!user){
      throw new NotFoundException("일치하는 유저를 찾지 못했습니다")
    }
    return user
  }

}
