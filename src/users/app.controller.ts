import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './app.service';
import { httpMessage, httpStatus } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globallClass';
import { UserDTO } from 'src/dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from 'src/entities/user.entity';
import { UserModel } from 'src/models/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  // getUser(): Promise<UserEntity[]> {
  //   try {
  //     return new Promise<UserEntity[]>(
  //       this.userService.getUser(),
  //       httpStatus.Success,
  //       httpMessage.Success,
  //     );
  //   } catch (Error) {
  //     return new ResponseData<UserEntity[]>(
  //       null,
  //       httpStatus.Error,
  //       httpMessage.Error,
  //     );
  //   }
  // }
  // @Post()
  // async createUser(
  //   @Body(new ValidationPipe())
  //   userDTO: UserDTO,
  // ): Promise<UserEntity> {
  //   try {
  //     return await this.userService.createUser(userDTO);
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     throw new HttpException('User creation failed', HttpStatus.BAD_REQUEST);
  //   }
  // }
  @Get()
  getUser(): ResponseData<UserModel[]> {
    try {
      return new ResponseData<UserModel[]>(
        this.userService.getUser(),
        httpStatus.Success,
        httpMessage.Success,
      );
    } catch (Error) {
      return new ResponseData<UserModel[]>(
        null,
        httpStatus.Error,
        httpMessage.Error,
      );
    }
  }
  @Post()
  async createUser(
    @Body(new ValidationPipe()) userDTO: UserDTO,
  ): Promise<ResponseData<UserDTO>> {
    try {
      return new ResponseData<UserDTO>(
        await this.userService.createUser(userDTO),
        httpStatus.Success,
        httpMessage.Success,
      );
    } catch (Error) {
      return new ResponseData<UserDTO>(
        null,
        httpStatus.Error,
        httpMessage.Error,
      );
    }
  }
  @Post('/avatar/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.userService.uploadImage(file);
    return result;
  }
  @Put('/:user_ID')
  updateDetail(
    @Param('user_ID') user_ID: number,
    @Body(new ValidationPipe()) userDTO: UserDTO,
  ): ResponseData<UserDTO> {
    try {
      return new ResponseData<UserDTO>(
        this.userService.updateDetail(user_ID, userDTO),
        httpStatus.Success,
        httpMessage.Success,
      );
    } catch (Error) {
      return new ResponseData<UserDTO>(
        null,
        httpStatus.Error,
        httpMessage.Error,
      );
    }
  }
  @Delete('/:user_ID')
  deleteUser(@Param('user_ID') user_ID: number): ResponseData<boolean> {
    try {
      return new ResponseData<boolean>(
        this.userService.deleteUser(user_ID),
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
