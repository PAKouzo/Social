import { Controller, Post, Get, Put, Delete, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ResponseData } from "src/global/globallClass";
import { httpMessage, httpStatus } from "src/global/globalEnum";
import { Product } from "src/models/product.model";
import { Param } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { ProductDTO } from "src/dto/product.dto";
@Controller('products')
export class ProductController {

    
    constructor(private readonly productService: ProductService) {}
    @Get()
    getProducts(): ResponseData<Product[]> {
        try{
            return new ResponseData<Product[]>(this.productService.getProducts(), httpStatus.Success, httpMessage.Success)
        }
        catch(Error){
            return new ResponseData<Product[]>(null, httpStatus.Error, httpMessage.Error)
        }
    }
    @Post()
    createProducts(@Body(new ValidationPipe) productDTO: ProductDTO): ResponseData<ProductDTO> {
        try{
            return new ResponseData<ProductDTO>(this.productService.createProducts(productDTO), httpStatus.Success, httpMessage.Success)
        }
        catch(Error){
            return new ResponseData<ProductDTO>(null, httpStatus.Error, httpMessage.Error)
        }
    }
    @Get('/:id')
    detailProducts(@Param('id') id: number): ResponseData<Product> {
        try{
            return new ResponseData<Product>(this.productService.detailProducts(id), httpStatus.Success, httpMessage.Success)
        }
        catch(Error){
            return new ResponseData<Product>(null, httpStatus.Error, httpMessage.Error)
        }
    }
    @Put('/:id')
    updateProducts(@Param('id') id: number, @Body(new ValidationPipe) productDTO: ProductDTO): ResponseData<ProductDTO>{
        try{
            return new ResponseData<ProductDTO>(this.productService.updateProducts(id, productDTO), httpStatus.Success, httpMessage.Success)
        }
        catch(Error){
            return new ResponseData<ProductDTO>(null, httpStatus.Error, httpMessage.Error)
        }
    }
    @Delete('/:id')
    deleteProducts(@Param('id') id: number): ResponseData<boolean> {
        try{
            return new ResponseData<boolean>(this.productService.deleteProducts(id), httpStatus.Success, httpMessage.Success)
        }
        catch(Error){
            return new ResponseData<boolean>(null, httpStatus.Error, httpMessage.Error)
        }
    }
}