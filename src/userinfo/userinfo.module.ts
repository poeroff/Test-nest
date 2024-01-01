import { Module } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { UserinfoController } from './userinfo.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Auth]),JwtModule.registerAsync({ useFactory: (config: ConfigService) => ({secret: config.get<string>('JWT_SECRET_KEY')}), inject: [ConfigService],})],
  controllers: [UserinfoController],
  providers: [UserinfoService],
})
export class UserinfoModule {}
