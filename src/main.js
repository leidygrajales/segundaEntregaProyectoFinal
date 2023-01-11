
import httpServer from './server.js'

const PORT = 8080

const server = httpServer.listen(PORT, () => console.log(`servidor corriendo en el puerto ${server.address().port}`))

server.on('error', error => console.log(`Error en servidor ${error}`))