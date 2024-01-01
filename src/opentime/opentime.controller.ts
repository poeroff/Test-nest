import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpentimeService } from './opentime.service';
import { CreateOpentimeDto } from './dto/create-opentime.dto';


@Controller('opentime')
export class OpentimeController {
  constructor(private readonly opentimeService: OpentimeService) {}

  @Post()
  create(@Body() createOpentimeDto: CreateOpentimeDto) {
  
   return this.opentimeService.create(createOpentimeDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.opentimeService.findAll(+id);
  }



 
}
