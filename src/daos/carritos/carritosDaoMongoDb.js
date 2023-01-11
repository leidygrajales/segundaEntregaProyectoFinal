import ContainerMongoDB from "../../container/containerMongoDB.js";


class CarritosDaoMongoDb extends ContainerMongoDB {

    constructor() {
        super('carritos', {
            productos: { type: [], required: true }
        })
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default CarritosDaoMongoDb