import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { findPostDto } from './dto/find-post.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectQueue('fileUpload')
    private readonly fileUpload: Queue,
    private readonly cloudinaryService: CloudinaryService
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
    const post = this.postRepository.findOne({ where: { id: data.id } });
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  async getlistsPost() {
    return await this.postRepository.find();
  }

  // getPostDetailWithCache(id: string){
  //   const post = this.postRepository.findOne(id)
  // }

  async uploadImage(file: Express.Multer.File) {
    try{
      const image = await this.cloudinaryService.uploadFile(file)
      await this.fileUpload.add(image);
      console.log("Job added to queue!")
    }
    catch(e){
      throw new BadRequestException(
        'Error uploading image'
      )
    }
  }
}
