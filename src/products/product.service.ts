import {Injectable} from '@nestjs/common'
import { ProductDTO } from 'src/dto/product.dto';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductService{
    public products: Product[] = [
        {id: 1, categoryID: 1, name: 'Keyboard',price: 140000},
        {id: 2, categoryID: 2, name: 'Dareu',price: 140000},
        {id: 3, categoryID: 1, name: 'Logitech Mouse',price: 780000}
    ]
    getProducts(): Product[] {
        return this.products;
    }

    createProducts(productDto: ProductDTO): Product {
        const product: Product = {
            id: Math.random(),
            ...productDto
        };
        this.products.push(product)
        return product;
    }

    detailProducts(id: number): Product {
        return this.products.find(item => item.id === Number(id));
    }

    updateProducts(id: number, productDTO: ProductDTO): Product{
        const index = this.products.findIndex(item => item.id === Number(id));
        this.products[index].categoryID = productDTO.categoryID;
        this.products[index].name = productDTO.name; 
        this.products[index].price = productDTO.price; 
        return productDTO
    }

    deleteProducts(id: number): boolean {
        const index = this.products.findIndex(item => item.id === Number(id));
        if(index!=-1){
            this.products.splice(index, 1);
            return true;
        }
        else{
            return false;
        }
    }
}