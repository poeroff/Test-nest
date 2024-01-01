import { Injectable } from '@nestjs/common';
import { CreateOpentimeDto } from './dto/create-opentime.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opentime } from './entities/opentime.entity';

@Injectable()
export class OpentimeService {
  constructor(@InjectRepository(Opentime) private timeRepository : Repository<Opentime>){}
  async create(createOpentimeDto: CreateOpentimeDto) {
    console.log(createOpentimeDto)
    const Time = await this.timeRepository.create({OpenDate : createOpentimeDto.OpenDate , OpenTime : createOpentimeDto.OpenTime , postId : +createOpentimeDto.postId })
    return this.timeRepository.save(Time)
  }

  async findAll(id : number) {
  
    const Time =  await this.timeRepository.find({where : {postId : id}})
    return Time;
  }

 
}
