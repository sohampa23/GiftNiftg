import mongoose from "mongoose";
// models/Cart.js
const cartSchema = new mongoose.Schema({
    userId: String,
    items: [{ productId: String, quantity: Number }]
});


const Cartmodel = mongoose.model.Cart || mongoose.model('Cart',cartSchema)
export default Cartmodel
