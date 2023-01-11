let productosDao
let carritosDao

switch ('mongodb') {
    case 'json':
        const { default: productosDaoArchivo } = await import('./productos/productosDaoArchivos.js')
        const { default: carritosDaoArchivo } = await import('./carritos/carritosDaoArchivos.js')

        productosDao = new productosDaoArchivo()
        carritosDao = new carritosDaoArchivo()
        break
    case 'firebase':

        break
    case 'mongodb':
        const { default: productosDaoMongodb } = await import('./productos/productosDaoMongoDb.js')
        const { default: carritosDaoMongodb } = await import('./carritos/carritosDaoMongoDb.js')

        productosDao = new productosDaoMongodb()
        carritosDao = new carritosDaoMongodb()
        break
    case 'mariadb':

        break
    case 'sqlite3':

        break
    default:

        break
}

export { productosDao, carritosDao }