require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");

const products = [
    { name: "Aurelia Solitaire Ring", category: "Diamond Ring", metal: "Diamond", price: 24999, tag: "Bestseller", image: "/images/diamond-ring.jpg" },
    { name: "Lumière Necklace", category: "Diamond Necklace", metal: "Diamond", price: 38499, tag: "New", image: "/images/diamond-necklace.jpg" },
    { name: "Stellar Studs", category: "Diamond Earrings", metal: "Diamond", price: 19999, image: "/images/diamond-earrings.jpg" },
    { name: "Eterna Pendant", category: "Diamond Pendant", metal: "Diamond", price: 15999, image: "/images/diamond-pendant.jpg" },
    { name: "Luna Silver Ring", category: "Silver Ring", metal: "Silver", price: 2499, tag: "New", image: "/images/silver-ring.jpg" },
    { name: "Argent Chain", category: "Silver Chain", metal: "Silver", price: 3999, tag: "Bestseller", image: "/images/silver-chain.jpg" },
    { name: "Celeste Bracelet", category: "Silver Bracelet", metal: "Silver", price: 4499, image: "/images/silver-bracelet.jpg" },
    { name: "Nova Anklet", category: "Silver Anklet", metal: "Silver", price: 1999, image: "/images/silver-anklet.jpg" },
];

(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();
    await Product.insertMany(products);

    const adminEmail = "admin@tessora.com";
    if (!(await User.findOne({ email: adminEmail }))) {
        await User.create({ name: "Admin", email: adminEmail, password: "admin123", role: "admin" });
    }

    console.log("Seeded: 8 products + admin (admin@tessora.com / admin123)");
    process.exit();
})();