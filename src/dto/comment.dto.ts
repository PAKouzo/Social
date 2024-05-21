import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CommentDTO{

    @IsNotEmpty()
    @IsString()
    content?: string;

}