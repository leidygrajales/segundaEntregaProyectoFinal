import ContainerMongoDB from "../../container/containerMongoDB.js";

class productosDaoMongoDb extends ContainerMongoDB {

    constructor() {
        super('productos', {
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
        })
    }
}

export default productosDaoMongoDb