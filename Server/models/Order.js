const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                name: String,
                image: String,
                price: Number,
                qty: { type: Number, required: true, min: 1 },
            },
        ],
        address: {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
        },
        paymentMethod: { type: String, default: "COD" },
        totalPrice: { type: Number, required: true },
        status: {
            type: String,
            enum: ["Placed", "Shipped", "Delivered", "Cancelled"],
            default: "Placed",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);