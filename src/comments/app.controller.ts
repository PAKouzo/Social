import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { CommentService } from "./app.service";
import { ResponseData } from "src/global/globallClass";
import { CommentDTO } from "src/dto/comment.dto";
import { httpMessage, httpStatus } from "src/global/globalEnum";

@Controller('comments')
export class CommentController{
    constructor(private readonly commentService: CommentService) {}
    @Post('/:post_ID')
    createCMT(@Param('post_ID') post_ID: number ,@Body(new ValidationPipe) cmtDTO: CommentDTO): ResponseData<CommentDTO> {
       try{
            return new ResponseData<CommentDTO>(
              this.commentService.createCMT(post_ID, cmtDTO),
              httpStatus.Success,
              httpMessage.Success,
            );
        }
        catch(Error){
            return new ResponseData<CommentDTO>(null, httpStatus.Error, httpMessage.Error)
        } 
    }
}