import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Inject,
  UploadedFile,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Response } from 'src/common/response/response';
import { Paging } from 'src/common/Paging/paging';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { findPostDto } from './dto/find-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Queue } from 'bull';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Post()
  async create(@Body() data: CreatePostDto) {
    try {
      return new Response(200, 'success', await this.postService.create(data));
    } catch (e) {
      return new Response(401, 'Fail', null);
    }
  }

  // @Get()
  // findAll() {
  //   return this.postService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  @Get()
  async getlistsPost() {
    try {
      // const paging = {
      //   page: 1,
      //   page_size: 10
      // }
      // const response = await this.postService.getlistsPost();
      // const pagingRes = new Paging(paging.page, paging.page_size, );
      return new Response(
        200,
        'Success',
        await this.postService.getlistsPost(),
      );
    } catch (e) {
      return new Response(401, 'Fail', null);
    }
  }

  // @Get(':id/get-with-cache')
  // @UseInterceptors(CacheInterceptor)
  // async findById(@Param('id') findpost: findPostDto) {
  //   console.log('Run here!');
  //   return await this.postService.findById(findpost);
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File){
    this.postService.uploadImage(file);
    return {
      status: 200,
      message: "Uploading Successfull!"
    }
  }
}
