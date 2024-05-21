import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class PostDTO{

    @IsNotEmpty()
    @IsString()
    content?: string;

}