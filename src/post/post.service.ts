import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { findPostDto } from './dto/find-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity> 
  ) {}

  async create(data: CreatePostDto) {
    const newPost = await this.postRepository.create(data);
    await this.postRepository.save(newPost);
    return await newPost;
  }

  findAll() {
    return `This action returns all post`;
  }

  findById(data: findPostDto) {
    const post= this.postRepository.findOne({where: {id: data.id},});
    return post
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  async getlistsPost()
  {
    return await this.postRepository.find();
  }

  // getPostDetailWithCache(id: string){
  //   const post = this.postRepository.findOne(id)
  // }
}
