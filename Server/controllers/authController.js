const jwt = require("jsonwebtoken");
const User = require("../models/User");

const makeToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const userData = (u) => ({
    _id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    token: makeToken(u._id),
});

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });
        if (password.length < 6)
            return res.status(400).json({ message: "Password must be at least 6 characters" });

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already registered" });

        const user = await User.create({ name, email, password });
        res.status(201).json(userData(user));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password)))
            return res.status(401).json({ message: "Invalid email or password" });

        res.json(userData(user));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMe = async (req, res) => {
    res.json(req.user);
};