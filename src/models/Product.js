import mongoose from "mongoose";

const productsCollection = 'products'

const ProductSchema = mongoose.Schema({
    timestamp: Number,
    title: String,
    price: String,
    stock: String,
    thumbnail: String,
    description: String
});

export const Product = mongoose.model(productsCollection, ProductSchema)