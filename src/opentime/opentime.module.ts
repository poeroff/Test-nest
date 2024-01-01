import { Module } from '@nestjs/common';
import { OpentimeService } from './opentime.service';
import { OpentimeController } from './opentime.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opentime } from './entities/opentime.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Opentime])],
  controllers: [OpentimeController],
  providers: [OpentimeService],
})
export class OpentimeModule {}
