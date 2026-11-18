import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiShoppingBag, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import SafeImg from "./SafeImg";

export default function ProductCard({ product, index = 0 }) {
    const { addToCart } = useCart();
    const { isWished, toggleWishlist } = useWishlist();
    const wished = isWished(product._id);
    const outOfStock = (product.stock ?? 1) <= 0;
    const lowStock = product.stock > 0 && product.stock <= 5;

    const ref = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
    const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
        mx.set(0);
        my.set(0);
    };

    const handleAdd = () => {
        if (outOfStock) return;
        if (addToCart(product)) toast.success(`${product.name} added to cart`, { icon: "🛍️" });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="group"
            style={{ perspective: 900 }}
        >
            <motion.div
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
                className="shine-card relative overflow-hidden rounded-2xl bg-white aspect-square border border-blush/60 transition-shadow duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(166,58,88,0.4)]"
            >
                <Link to={`/product/${product._id}`}>
                    <SafeImg
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {product.tag && (
                    <span className="absolute top-3 left-3 bg-rosegold text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full z-10">
                        {product.tag}
                    </span>
                )}

                {outOfStock && (
                    <div className="absolute inset-0 z-[5] bg-white/60 flex items-center justify-center pointer-events-none">
                        <span className="bg-wine text-white text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full">
                            Out of Stock
                        </span>
                    </div>
                )}

                <motion.button
                    onClick={() => toggleWishlist(product)}
                    whileTap={{ scale: 0.7 }}
                    whileHover={{ scale: 1.15 }}
                    title={wished ? "Remove from wishlist" : "Add to wishlist"}
                    className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${wished ? "bg-rosegold text-white" : "bg-champagne text-rosegold hover:bg-rosegold hover:text-white"
                        }`}
                >
                    {wished ? <FaHeart /> : <FiHeart />}
                </motion.button>

                {!outOfStock && <button
                    onClick={handleAdd}
                    className="absolute inset-x-4 bottom-4 z-10 translate-y-16 group-hover:translate-y-0 transition-transform duration-500 bg-wine text-white text-xs uppercase tracking-[0.2em] py-3 rounded-full flex items-center justify-center gap-2"
                >
                    <FiShoppingBag /> Add to Cart
                </button>}
            </motion.div>

            <div className="mt-4 text-center">
                <p className="text-[11px] uppercase tracking-widest text-softgold">{product.category}</p>
                <Link to={`/product/${product._id}`}>
                    <h3 className="font-display text-xl mt-1 text-wine hover:text-rosegold transition">{product.name}</h3>
                </Link>
                <p className="text-rosegold font-medium mt-1">₹{product.price.toLocaleString("en-IN")}</p>
                {lowStock && <p className="text-[11px] text-red-600 mt-1">Only {product.stock} left</p>}
            </div>
        </motion.div>
    );
}