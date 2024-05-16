import {Injectable} from '@nestjs/common'

@Injectable()
export class ProductService{

    getProducts(): string {
        return 'Get list products!';
    }

    creatProduct(): string {
        return 'Post products!';
    }

    detailProduct(): string {
        return 'Detail products!';
    }

    updateProduct(): string{
        return 'Update products!'
    }

    deleteProduct(): string {
        return 'Delete products!'
    }
}