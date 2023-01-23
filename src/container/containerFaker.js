import { faker } from '@faker-js/faker'


class ContainerFaker {

    async getByQuantity(qty) {
        try {

            const products = [];

            for (let index = 0; index < qty; index++) {
                products.push({
                    id: faker.datatype.uuid(),
                    title: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: faker.commerce.price(),
                    stock: faker.datatype.number(1, 100),
                    thumbnail: faker.image.imageUrl(1234, 2345, 'product', true),
                    timestamp: faker.datatype.datetime()
                })
            }

            const data = products
            return data
        } catch (e) {
            console.log(e)
        }
    }
}

export default ContainerFaker
