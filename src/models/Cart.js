import mongoose from "mongoose";

const cartCollection = 'cart'

const CartSchema = mongoose.Schema({
    products: []
});

export const Cart = mongoose.model(cartCollection, CartSchema)