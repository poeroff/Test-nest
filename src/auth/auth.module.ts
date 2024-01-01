import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports : [TypeOrmModule.forFeature([Auth]), JwtModule.registerAsync({ useFactory: (config: ConfigService) => ({
    // .env 파일에 JWT_SECRET_KEY라는 키로 비밀키를 저장해두고 사용합니다.
    secret: config.get<string>('JWT_SECRET_KEY'),
  }),
  inject: [ConfigService],})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
