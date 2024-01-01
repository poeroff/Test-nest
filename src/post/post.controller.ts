import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode, HttpStatus, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

import { AuthGuard } from 'src/guard/auth.guard';
import { request } from 'http';
import { PostDto } from './dto/post.dto';
import { Serialze } from '../interceptors/serialize.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import sharp from 'sharp';
import fs from "fs"
import multer from 'multer';
import slugify from 'slugify';

@Controller('post')


export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file",{ storage: multer.memoryStorage() }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() createPostDto: CreatePostDto, @Req() request) {
    const pngBuffer = await sharp(file.buffer).toFormat('png').toBuffer();
    const safeFileName = slugify(file.originalname, { lower: true });
    // PNG로 변환된 이미지를 파일에 저장 (예: uploads 폴더에 저장)
    const imagePath = `upload/${safeFileName.replace(/\.[^/.]+$/, '')}.png`;
    fs.writeFileSync(imagePath, pngBuffer);
    return this.postService.create(imagePath , createPostDto , request.user.id) ;
  }

  @Get("/Allpost")
  @Serialze(PostDto)
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @Serialze(PostDto)
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Get()
  @Serialze(PostDto)
  search(@Query() query){
    return this.postService.search(query.search)
   

  }
}
