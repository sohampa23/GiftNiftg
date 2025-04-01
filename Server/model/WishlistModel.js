import mongoose from "mongoose";


// models/Wishlist.js
const wishlistSchema = new mongoose.Schema({
    userId: String,
    items: [{ productId: String }]
});

const Wishlistmodel = mongoose.model.Wishlist || mongoose.model('Wishlist',wishlistSchema)
export default Wishlistmodel