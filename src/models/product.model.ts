export class Product {
    id?: number;
    categoryID?: number;
    name?: string;
    price?: number;

    constructor({id, categoryID, name, price}) {
        if(id!==null) this.id = id;
        if(categoryID!==null) this.categoryID = categoryID;
        if(name!==null) this.name = name;
        if(price!==null) this.price = price;
    }
}