import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CommentDTO{
    @IsNotEmpty()
    @IsNumber()
    cmt_ID?: number;

    @IsNotEmpty()
    @IsNumber()
    user_ID?: number;

    @IsNotEmpty()
    @IsNumber()
    post_ID?: number;

    @IsNotEmpty()
    @IsString()
    content?: string;

}