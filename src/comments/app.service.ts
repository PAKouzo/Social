import { Injectable } from "@nestjs/common";
import { CommentDTO } from "src/dto/comment.dto";
import { CommentModel } from "src/models/comment.model";

@Injectable()
export class CommentService{
    public comments: CommentModel[] = []
    createCMT(post_ID: number, cmtDTO: CommentDTO): CommentModel {
        const cmt: CommentModel = {
            cmt_ID: Math.random(),
            ...cmtDTO
        };
        this.comments.push(cmt)
        return cmt;
    }
}