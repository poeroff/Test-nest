import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { WebSocketGateway , WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventsGateway } from 'src/events/events.gateway';


@Injectable()
@WebSocketGateway()
export class PostService {
  @WebSocketServer() server : Server;
  constructor(@InjectRepository(Post) private postRepository : Repository<Post> , @InjectRepository(Auth) private authRepository : Repository<Auth> , private Test : EventsGateway){}
  async create(filepath :string ,createPostDto: CreatePostDto , id : number) {
    const user = await this.authRepository.findOne({where : {id : +id}})
    if(user.privilege === false){
      throw new NotAcceptableException("관리자 권한이 없습니다")
    }
  
  
    createPostDto.Image = filepath
    // this.Test.handleMessage("create")
    const post = this.postRepository.create(createPostDto)
    return this.postRepository.save(post)
  }

  async findAll() {
    
   
    const post =  await this.postRepository.find()
    if(!post){
      throw new NotFoundException("정보가 없습니다")
    }
    return post
    
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({where : {id : id}})
    if(!post){
      throw new NotFoundException("정보가 없습니다")
    }
    return post
  }
  async search(query : string){
    const post = await this.postRepository.find({where : {Name : query}})
    if(!post){
      throw new NotFoundException("정보가 없습니다")
    }
    return post

  }

}
