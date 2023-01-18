import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

import CartRouter from './routes/cart.Router'
import ProductsRouter from './routes/products.Router'

import Daos from './daos/index'

import faker from 'faker'
faker.locale = 'es'

import { normalize, schema } from 'normalizr'
import util from 'util'
function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

//Definimos un esquemas de autores
const authorSchema = new schema.Entity('authors', {}, { idAttribute: "mail" });
const textSchema = new schema.Entity('text');
const mensajeSchema = new schema.Entity('messages', {
  author: authorSchema,
  text: [textSchema]
});

// Creamos esta funcion para listar los mensajes normalizados utilizando los metodos del contenedor 
async function listarMensajesN() {
  const archivoMensajes = await mensajesApi.listarAll()
  const normalizados = normalizarMensajes(archivoMensajes)
  print(normalizados)
  return normalizados
}
const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, [mensajeSchema])


// const { cartDao: cartApi, productsDao: productsApi, messagesDao: messagesApi } = await Daos('json')
const { cartDao: cartApi, productsDao: productsApi, messagesDao: messagesApi } = await Daos('firebase')
// const { cartDao: cartApi, productsDao: productsApi, messagesDao: messagesApi } = await Daos('mongodb')
// const { cartDao: cartApi, productsDao: productsApi, messagesDao: messagesApi } = await Daos('mysql')
// const { cartDao: cartApi, productsDao: productsApi, messagesDao: messagesApi } = await Daos('sqlite3')

const upload = multer();

const app = express()
const httpServer = new HttpServer(app);

const io = new IOServer(httpServer);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para Administrador
const esAdmin = true

const soloAdmins = (req, res, next) => {
  if (!esAdmin) {
    res.status(401).json(crearErrorNoEsAdmin(req.originalUrl, req.method))
  } else {
    next()
  }
}

const crearErrorNoEsAdmin = (ruta, metodo) => {
  const error = {
    error: -1,
  }
  if (ruta && metodo) {
    error.descripcion = `Path: ${ruta}\nMethod: ${metodo}\nStatus: Unauthorized`
  } else {
    error.descripcion = 'Unauthorized'
  }
  return error
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(upload.array());

app.use('/api/products', ProductsRouter(productsApi, soloAdmins))
app.use('/api/cart', CartRouter(cartApi, productsApi))

app.use('/socket.io', express.static(path.join(__dirname, '../node_modules/socket.io/client-dist')))
app.use(express.static(path.join(__dirname, '../public')))

app.set("views", path.join(__dirname, "../public/views"))
app.set('view engine', 'pug')

app.get('/', async (req, res) => {
  res.render('pages/index')
})
app.get('/products', async (req, res) => {
  res.render('pages/products')
})
app.get('/cart', async (req, res) => {
  res.render('pages/cart')
})
app.get('*', function (req, res) {
  res.send({ status: "error", description: `ruta ${req.url} método ${req.method} no implementada` });
})

io.on('connection', async socket => {

  //historial del chat cuando el nuevo cliente se conecte 

  socket.emit('messages', await messagesApi.getAll())

  //escuchamos al cliente
  socket.on('new-message', async data => {
    await messagesApi.save(data)

    //re enviamos por medio de broadcast los msn a todos los clientrs que esten conectados
    io.sockets.emit('messages', await messagesApi.getAll())
  })
})

export default httpServer
