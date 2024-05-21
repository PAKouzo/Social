import { Controller, Get, Post, Put, Delete, Param, Body, ValidationPipe } from "@nestjs/common";
import { PostService } from "./app.service";
import { ResponseData } from "src/global/globallClass";
import { PostModel } from "src/models/post.model";
import { httpMessage, httpStatus } from "src/global/globalEnum";
import { PostDTO } from "src/dto/post.dto";

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  getPosts(): ResponseData<PostModel[]> {
    try {
      return new ResponseData<PostModel[]>(
        this.postService.getPosts(),
        httpStatus.Success,
        httpMessage.Success,
      );
    } catch (Error) {
      return new ResponseData<PostModel[]>(
        null,
        httpStatus.Error,
        httpMessage.Error,
      );
    }
  }
  @Post('/:user_ID')
  createPost(
    @Param('user_ID') user_ID: number,
    @Body(new ValidationPipe()) postDTO: PostDTO,
  ): ResponseData<PostDTO> {
    try {
      return new ResponseData<PostDTO>(
        this.postService.createPost(user_ID, postDTO),
        httpStatus.Success,
        httpMessage.Success,
      );
    } catch (Error) {
      return new ResponseData<PostDTO>(
        null,
        httpStatus.Error,
        httpMessage.Error,
      );
    }
  }
  @Put('/:post_ID')
  updatePost(
    @Param('post_ID') post_ID: number,
    @Body(new ValidationPipe()) postDTO: PostDTO,
  ): ResponseData<PostDTO> {
    try {
      return new ResponseData<PostDTO>(
        this.postService.updatePost(post_ID, postDTO),
        httpStatus.Success,
        httpMessage.Success,
      );
    } catch (Error) {
      return new ResponseData<PostDTO>(
        null,
        httpStatus.Error,
        httpMessage.Error,
      );
    }
  }
  @Delete('/:post_ID')
  deletePost(@Param('post_ID') post_ID: number): ResponseData<boolean> {
    try {
      return new ResponseData<boolean>(
        this.postService.deletePost(post_ID),
        httpStatus.Success,
        httpMessage.Success,
      );
    } catch (Error) {
      return new ResponseData<boolean>(
        null,
        httpStatus.Error,
        httpMessage.Error,
      );
    }
  }
}