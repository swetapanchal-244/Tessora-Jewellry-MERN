require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get("/", (req, res) => res.send("Tessora API running 💎"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    // Express 5 me listen fail ho to error callback me aata hai
    app.listen(PORT, (err) => {
        if (err) {
            console.error(`Server start nahi hua: ${err.message}`);
            process.exit(1);
        }
        console.log(`Server running on port ${PORT}`);
    });
});