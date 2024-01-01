import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule , TypeOrmModuleOptions} from '@nestjs/typeorm';
import { Auth } from './auth/entities/auth.entity';
import Joi from "joi"
import { ConfigService ,ConfigModule} from '@nestjs/config';
import { UserinfoModule } from './userinfo/userinfo.module';
import { PostModule } from './post/post.module';
import { JwtModule } from '@nestjs/jwt';
import { Post } from './post/entities/post.entity';
import { Opentime } from './opentime/entities/opentime.entity';
import { EventsModule } from './events/events.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import {join} from "path"
import { OpentimeModule } from './opentime/opentime.module';
import { ReservationModule } from './reservation/reservation.module';
import { SeatModule } from './seat/seat.module';

import { Seat } from './seat/entities/seat.entity';
import { Reservation } from './reservation/entities/reservation.entity';


const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,   //ConfigServgice : 환경변수 , 설정파일 등의 소스로부터 설정 값을 읽어온다
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [Auth,Post,Opentime ,Seat, Reservation],
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};


@Module({
  imports: [ConfigModule.forRoot({  //forRoot : TypeORM을 초기화하고 설정하기 위해서  데이터베이스 연결 정보, 엔터티들의 위치, 동기화 여부, 로깅 옵션 등과 같은 TypeORM에 필요한 전반적인 설정을 제공
    isGlobal: true, //전역에서 사용할수 있도록 도와준다
    validationSchema: Joi.object({
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),
      DB_SYNC: Joi.boolean().required(),
     }),
  }),
  TypeOrmModule.forRootAsync(typeOrmModuleOptions),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'upload'),
    serveRoot: '/upload',
  }),
  
  AuthModule, UserinfoModule, PostModule, EventsModule, OpentimeModule, ReservationModule, SeatModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
