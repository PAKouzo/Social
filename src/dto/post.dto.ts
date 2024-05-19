import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class PostDTO{

    @IsNotEmpty()
    @IsNumber()
    user_ID?: number;

    @IsNotEmpty()
    @IsString()
    content?: string;

}