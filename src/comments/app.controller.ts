import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { CommentService } from "./app.service";
import { ResponseData } from "src/global/globallClass";
import { CommentDTO } from "src/dto/comment.dto";
import { httpMessage, httpStatus } from "src/global/globalEnum";

@Controller('comment')
export class CommentController{
    constructor(private readonly commentService: CommentService) {}
    @Post()
    createCMT(@Body(new ValidationPipe) cmtDTO: CommentDTO): ResponseData<CommentDTO> {
       try{
            return new ResponseData<CommentDTO>(this.commentService.createCMT(cmtDTO), httpStatus.Success, httpMessage.Success)
        }
        catch(Error){
            return new ResponseData<CommentDTO>(null, httpStatus.Error, httpMessage.Error)
        } 
    }
}