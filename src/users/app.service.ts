import { Injectable, Inject } from "@nestjs/common";
import { UserDTO } from "src/dto/user.dto";
import { UserModel } from "src/models/user.model";
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class UserService{
    public users: UserModel[] = []
    getUser(): UserModel[] {
        return this.users;
    }
    constructor(@Inject('Cloudinary') private cloudinary) {}
    createUser(userDTO: UserDTO): UserModel {
        const user: UserModel = {
            user_ID: Math.random(),
            ...userDTO
        };
        this.users.push(user)
        return user;
    }
    updateDetail(user_ID: number, userDTO: UserDTO): UserModel {
        const index = this.users.findIndex(item => item.user_ID === Number(user_ID))
        this.users[index].Username = userDTO.Username;
        this.users[index].password = userDTO.password;
        this.users[index].Bio = userDTO.Bio;
        return userDTO;
    }
    deleteUser(user_ID: number): boolean {
        const index = this.users.findIndex(item => item.user_ID === Number(user_ID))
        if(index!=-1){
            this.users.splice(index, 1);
            return true;
        }
        else{
            return false;
        }
    }
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(file.buffer);
    });
  }
}