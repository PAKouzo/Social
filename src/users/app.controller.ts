import { Controller, Get, Post, Put, Delete, Param, Body, ValidationPipe } from "@nestjs/common";
import { UserService } from "./app.service";
import { httpMessage, httpStatus } from "src/global/globalEnum";
import { ResponseData } from "src/global/globallClass";
import { UserModel } from "src/models/user.model";
import { UserDTO } from "src/dto/user.dto";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService) {}
    @Get()
    getUser(): ResponseData<UserModel[]> {
        try{
            return new ResponseData<UserModel[]>(this.userService.getUser(), httpStatus.Success, httpMessage.Success)
        }
        catch(Error){
            return new ResponseData<UserModel[]>(null, httpStatus.Error, httpMessage.Error)
        }
    }
    @Post()
    createUser(@Body(new ValidationPipe) userDTO: UserDTO): ResponseData<UserDTO> {
        try{
            return new ResponseData<UserDTO>(this.userService.createUser(userDTO), httpStatus.Success, httpMessage.Success)
        }
        catch(Error){
            return new ResponseData<UserDTO>(null, httpStatus.Error, httpMessage.Error)
        }
    }
    @Put('/:user_ID')
    updateDetail(@Param('user_ID') user_ID: number, @Body(new ValidationPipe) userDTO: UserDTO): ResponseData<UserDTO> {
        try{
            return new ResponseData<UserDTO>(this.userService.updateDetail(user_ID, userDTO), httpStatus.Success, httpMessage.Success)
        }
        catch(Error){
            return new ResponseData<UserDTO>(null, httpStatus.Error, httpMessage.Error)
        }
    }
    @Delete('/:user_ID')
    deleteUser(@Param('user_ID') user_ID: number): ResponseData<boolean> {
        try{
            return new ResponseData<boolean>(this.userService.deleteUser(user_ID), httpStatus.Success, httpMessage.Success)
        }
        catch(Error){
            return new ResponseData<boolean>(null, httpStatus.Error, httpMessage.Error)
        }
    }
}