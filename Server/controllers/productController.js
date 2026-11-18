const Product = require("../models/Product");

// user ke text me special characters (. * + ? etc.) ko safe bana deta hai
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// query param hamesha string hi ho (array/object aaye to ignore)
const str = (v) => (typeof v === "string" ? v.trim() : "");

// GET /api/products?metal=Diamond&category=Ring&search=ring&sort=price-asc
// Pagination (optional): &page=1&limit=8
//   - page diya  -> { products, page, pages, total }
//   - page nahi  -> sirf array (Home, Admin, ProductDetails ke liye)
exports.getProducts = async (req, res) => {
    try {
        const metal = str(req.query.metal);
        const category = str(req.query.category);
        const search = str(req.query.search);
        const sort = str(req.query.sort);
        const filter = {};

        if (metal) filter.metal = metal;
        if (category) filter.category = new RegExp(escapeRegex(category), "i");
        if (search) filter.name = new RegExp(escapeRegex(search), "i");

        const sortMap = {
            "price-asc": { price: 1 },
            "price-desc": { price: -1 },
            newest: { createdAt: -1 },
        };
        // _id extra isliye ki same price/date wale products ka order page-to-page na badle
        const sortBy = { ...(sortMap[sort] || { createdAt: 1 }), _id: 1 };

        if (req.query.page !== undefined) {
            const page = Math.max(1, parseInt(req.query.page, 10) || 1);
            const perPage = Math.min(48, Math.max(1, parseInt(req.query.limit, 10) || 8));

            const total = await Product.countDocuments(filter);
            const pages = Math.max(1, Math.ceil(total / perPage));
            const products = await Product.find(filter)
                .sort(sortBy)
                .skip((page - 1) * perPage)
                .limit(perPage);

            return res.json({ products, page, pages, total });
        }

        const products = await Product.find(filter).sort(sortBy);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch {
        res.status(404).json({ message: "Product not found" });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};