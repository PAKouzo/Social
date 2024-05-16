import { Controller, Post, Get, Put, Delete } from "@nestjs/common";

@Controller('product')
export class ProductController {
    @Get()
    getProducts(): string {
        return 'Get list products!';
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