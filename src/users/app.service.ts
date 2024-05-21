import { Injectable, Inject } from "@nestjs/common";
import { UserDTO } from "src/dto/user.dto";
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from "src/entities/user.entity";
import { UserModel } from "src/models/user.model";
import { response } from "express";
import { httpStatus } from "src/global/globalEnum";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  // constructor(
  //     @Inject('Cloudinary') private cloudinary,
  //     @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  // async getUser(): Promise<UserEntity[]> {
  //     return this.userRepository.find();
  // }
  // async createUser(userDTO: UserDTO): Promise<UserEntity> {
  //     const user = this.userRepository.create(userDTO)
  //     return this.userRepository.save(user)
  // }
  public users: UserModel[] = [];
  private existUsername(username: string): boolean {
    return this.users.some((user) => user.Username === username);
  }
  getUser(): UserModel[] {
    return this.users;
  }
  constructor(@Inject('Cloudinary') private cloudinary) {}
  async createUser(userDTO: UserDTO): Promise<UserModel> {
    // try{
    //   if (this.existUsername(userDTO.Username)) {
    //   throw new Error('Username is already existed');
    // }
    // }
    // catch(error){
    //   response.status(394).send({
    //     message: httpStatus.Error,
    //     data: null,
    //     success: false,
    //   });
    // }
    if (this.existUsername(userDTO.Username)) {
      throw new Error('Username is already existed');
    }
    const hash = await bcrypt.hash(userDTO.password, 10);
    const user: UserModel = {
      user_ID: Math.random(),
      ...userDTO,
      password: hash,
    };
    this.users.push(user);
    return user;
  }
  updateDetail(user_ID: number, userDTO: UserDTO): UserModel {
    const index = this.users.findIndex(
      (item) => item.user_ID === Number(user_ID),
    );
    this.users[index].Username = userDTO.Username;
    this.users[index].password = userDTO.password;
    this.users[index].Bio = userDTO.Bio;
    return userDTO;
  }
  deleteUser(user_ID: number): boolean {
    const index = this.users.findIndex(
      (item) => item.user_ID === Number(user_ID),
    );
    if (index != -1) {
      this.users.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader
        .upload_stream({ folder: 'uploads' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(file.buffer);
    });
  }
}