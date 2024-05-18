import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class ProductDTO{
    @IsNotEmpty()
    @IsNumber()
    categoryID?: number;

    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsNumber()
    price?: number;
}