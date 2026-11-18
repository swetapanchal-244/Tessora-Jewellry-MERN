const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        category: { type: String, required: true }, // e.g. "Diamond Ring"
        metal: { type: String, enum: ["Diamond", "Silver", "Gold"], required: true },
        price: { type: Number, required: true, min: 0 },
        image: { type: String, required: true }, // "/images/diamond-ring.jpg"
        tag: { type: String, default: "" }, // Bestseller, New, Limited
        description: { type: String, default: "" },
        stock: { type: Number, default: 10, min: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);