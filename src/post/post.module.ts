import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { Auth } from "../auth/entities/auth.entity"
import { EventsGateway } from 'src/events/events.gateway';
import { MulterModule } from '@nestjs/platform-express';



@Module({
  imports : [MulterModule.register({dest :"./upload"}), AuthModule, TypeOrmModule.forFeature([Post,Auth]),JwtModule.registerAsync({ useFactory: (config: ConfigService) => ({secret: config.get<string>('JWT_SECRET_KEY')}), inject: [ConfigService],})],
  controllers: [PostController],
  providers: [PostService,EventsGateway],
})
export class PostModule {}
