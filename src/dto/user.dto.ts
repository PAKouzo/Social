import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class UserDTO{

    @IsNotEmpty()
    @IsString()
    Username?: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsString()
    Bio?: string
}