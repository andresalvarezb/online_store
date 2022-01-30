
const faker = require('faker');
const boom = require('@hapi/boom');

// here is the logic to CRUD
class ProductsService {
    constructor() {
        this.products = [];
        this.generate();
    }

    async generate() {
        const limit = 100;
        for (let product = 0; product < limit; product++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                img: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean(),
            })
        }
    }

    async create(product) {
        const newProduct = {
            id: faker.datatype.uuid(),
            ...product
        }
        this.products.push(newProduct);
        return newProduct;
    }

    async find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products)
            }, 5000)
        })
    }

    async findOne(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) {
            throw boom.notFound('product not found')
        }
        if(product.isBlock) {
            throw boom.conflict('product is block')
        }
        return product
    }

    async update(id, changes) {
        const index = this.products.findIndex(item => item.id === id);
        if (index !== -1) {
            let product = this.products[index]
            this.products[index] = {
                ...product,
                ...changes
            }
        } else {
            throw boom.notFound('product not found')
        }
        return this.products[index];
    }

    async delete(id) {
        const index = this.products.findIndex(item => item.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
        } else {
            throw boom.notFound('product not found')
        }
        return { id }
    }
}

module.exports = ProductsService;
