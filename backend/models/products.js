const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ReviewsSchema = new Schema({
    name: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, required: true},
    comment: {type: String, required: true, ref: "Users"},
    rating: {type: "Number", required: true}
}, {
    timestamps: true
})

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    reviews: [ReviewsSchema],
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Products", ProductSchema )

