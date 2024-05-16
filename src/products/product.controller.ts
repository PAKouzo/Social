import { Controller, Post, Get, Put, Delete } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    @Get()
    getProducts(): string {
        return this.productService.getProducts();
    }
    @Post()
    creatProduct(): string {
        return 'Post products!';
    }
    @Get('/:id')
    detailProduct(): string {
        return 'Detail products!';
    }
    @Put()
    updateProduct(): string{
        return 'Update products!'
    }
    @Delete('/:id')
    deleteProduct(): string {
        return 'Delete products!'
    }
}