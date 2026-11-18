const Order = require("../models/Order");
const Product = require("../models/Product");

// order ke items ka stock wapas add kar deta hai (rollback / cancel ke time)
const restoreStock = (items) =>
    Promise.all(
        items.map((i) =>
            Product.updateOne({ _id: i.product }, { $inc: { stock: i.qty } })
        )
    );

// POST /api/orders
exports.createOrder = async (req, res) => {
    const reserved = []; // jin items ka stock kaat chuke hain (error aaye to wapas dena hai)

    try {
        const { items, address } = req.body;
        if (!Array.isArray(items) || items.length === 0)
            return res.status(400).json({ message: "Cart is empty" });

        const orderItems = [];
        let totalPrice = 0;

        for (const i of items) {
            const qty = Math.max(1, Math.floor(Number(i.qty)) || 1);

            // Atomic update: stock >= qty ho tabhi stock kam hoga.
            // Do log ek saath last piece khareedein to bhi sirf ek ka order pass hoga.
            const product = await Product.findOneAndUpdate(
                { _id: i.product, stock: { $gte: qty } },
                { $inc: { stock: -qty } },
                { new: true }
            );

            if (!product) {
                await restoreStock(reserved);
                const existing = await Product.findById(i.product);
                if (!existing)
                    return res.status(404).json({ message: "A product no longer exists" });
                const message =
                    existing.stock === 0
                        ? `${existing.name} is out of stock`
                        : `Only ${existing.stock} left for ${existing.name}`;
                return res.status(400).json({ message });
            }

            reserved.push({ product: product._id, qty });
            orderItems.push({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                qty,
            });
            totalPrice += product.price * qty;
        }

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            address,
            totalPrice,
        });

        res.status(201).json(order);
    } catch (err) {
        // koi bhi error (jaise address missing) -> kata hua stock wapas
        await restoreStock(reserved).catch(console.error);
        res.status(400).json({ message: err.message });
    }
};

// GET /api/orders/my
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/orders  (admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT /api/orders/:id/status  (admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (!Order.schema.path("status").enumValues.includes(status))
            return res.status(400).json({ message: "Invalid status" });
        if (order.status === "Cancelled")
            return res.status(400).json({ message: "Cancelled order cannot be changed" });
        if (status === "Cancelled" && order.status === "Delivered")
            return res.status(400).json({ message: "Delivered order cannot be cancelled" });

        // cancel hua to stock wapas
        if (status === "Cancelled") await restoreStock(order.items);

        order.status = status;
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};