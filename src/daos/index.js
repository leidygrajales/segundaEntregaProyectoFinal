

import admin from 'firebase-admin'
import mongoose from 'mongoose'
import knex from 'knex'

import configs from '../config/index'

import ContainerMongoDB from '../container/containerMongoDB'
import ContainerFileSystem from '../container/containerFileSystem'
import ContainerKnex from '../container/containerKnex'

import { Product } from '../models/Product'
import { Message } from '../models/Message'
import { Cart } from '../models/Cart'

import initializeDB from '../script/initializeDB'
import ContainerFirebase from '../container/ContainerFirebase'

const Daos = async (type) => {
    let cartDao
    let productsDao
    let messagesDao

    switch (type) {
        case 'json':
            cartDao = new ContainerFileSystem("./src/DB/cart.json")
            productsDao = new ContainerFileSystem("./src/DB/products.json")
            messagesDao = new ContainerFileSystem("./src/DB/messages.json")
            break
        case 'firebase':

            try {
                admin.initializeApp({
                    credential: admin.credential.cert(configs.firebase)
                })

                const db = admin.firestore();

                cartDao = new ContainerFirebase('cart', db)
                productsDao = new ContainerFirebase('products', db)
                messagesDao = new ContainerFirebase('messages', db)
            } catch (error) {
                console.log('error', error);
            }

            break
        case 'mongodb':
            await mongoose.connect(configs.mongodb.connectionString);

            cartDao = new ContainerMongoDB(Cart)
            productsDao = new ContainerMongoDB(Product)
            messagesDao = new ContainerMongoDB(Message)
            break
        case 'mysql':
            const mySQLConnection = knex(configs.mysql)
            await initializeDB(mySQLConnection)

            cartDao = new ContainerKnex(mySQLConnection, 'cart')
            productsDao = new ContainerKnex(mySQLConnection, 'products')
            messagesDao = new ContainerKnex(mySQLConnection, 'messages')
            break
        case 'sqlite3':
            const sqlite3Connection = knex(configs.sqlite3)
            await initializeDB(sqlite3Connection)

            cartDao = new ContainerKnex(sqlite3Connection, 'cart')
            productsDao = new ContainerKnex(sqlite3Connection, 'products')
            messagesDao = new ContainerKnex(sqlite3Connection, 'messages')
            break
        default:

            break
    }

    return { cartDao, productsDao, messagesDao }
}

export default Daos

