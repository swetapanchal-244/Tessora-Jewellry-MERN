import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiShoppingBag, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import SafeImg from "../components/SafeImg";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { isWished, toggleWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        setProduct(null);
        setQty(1);
        setError("");
        api
            .get(`/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                return api.get("/products", { params: { metal: res.data.metal } });
            })
            .then((res) => setRelated(res.data.filter((p) => p._id !== id).slice(0, 4)))
            .catch(() => setError("Product not found"));
    }, [id]);

    const add = () => {
        if (addToCart(product, qty)) {
            setAdded(true);
            toast.success(`${product.name} added to cart`, { icon: "🛍️" });
            setTimeout(() => setAdded(false), 1800);
        }
    };

    if (error)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-charcoal/70">{error}</p>
                <Link to="/shop" className="btn-gold mt-6 inline-block">Back to Shop</Link>
            </div>
        );

    if (!product) return <div className="min-h-screen flex items-center justify-center text-charcoal/60">Loading...</div>;

    const stock = product.stock ?? 0;

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 pt-36 pb-20">
                <p className="text-xs uppercase tracking-widest text-charcoal/50 mb-8">
                    <Link to="/" className="hover:text-rosegold">Home</Link> /{" "}
                    <Link to="/shop" className="hover:text-rosegold">Shop</Link> / {product.name}
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white rounded-3xl border border-blush aspect-square overflow-hidden">
                        <SafeImg src={product.image} alt={product.name} className="w-full h-full object-contain p-8" />
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-softgold">{product.category}</p>
                        <h1 className="font-display text-4xl md:text-5xl text-wine mt-2">{product.name}</h1>
                        <p className="font-display text-3xl text-rosegold mt-4">₹{product.price.toLocaleString("en-IN")}</p>
                        <p className="text-xs text-charcoal/50 mt-1">Inclusive of all taxes</p>

                        <p className="mt-6 text-charcoal/75 leading-relaxed">
                            {product.description ||
                                `A beautifully crafted ${product.category.toLowerCase()} from our ${product.metal.toLowerCase()} collection, finished to perfection and made to be treasured.`}
                        </p>

                        {stock > 0 ? (
                            <p className={`mt-6 text-sm ${stock <= 5 ? "text-red-600" : "text-green-700"}`}>
                                {stock <= 5 ? `Only ${stock} left in stock` : "In stock"}
                            </p>
                        ) : (
                            <p className="mt-6 text-sm text-red-600">Out of stock</p>
                        )}

                        <div className="mt-4 flex items-center gap-5">
                            {stock > 0 && (
                                <div className="flex items-center gap-4 border border-blush rounded-full px-5 py-3">
                                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-lg">−</button>
                                    <span className="w-6 text-center">{qty}</span>
                                    <button onClick={() => setQty(Math.min(stock, qty + 1))} className="text-lg">+</button>
                                </div>
                            )}

                            <button
                                onClick={add}
                                disabled={stock <= 0}
                                className="btn-gold flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiShoppingBag /> {stock <= 0 ? "Out of Stock" : added ? "Added ✓" : "Add to Cart"}
                            </button>

                            <button
                                onClick={() => toggleWishlist(product)}
                                title="Wishlist"
                                className={`w-12 h-12 rounded-full border flex items-center justify-center text-lg transition ${isWished(product._id)
                                    ? "bg-rosegold text-white border-rosegold"
                                    : "border-rosegold text-rosegold hover:bg-rosegold hover:text-white"
                                    }`}
                            >
                                {isWished(product._id) ? <FaHeart /> : <FiHeart />}
                            </button>
                        </div>

                        <div className="mt-10 grid grid-cols-3 gap-4 text-center text-xs text-charcoal/70">
                            {[
                                [FiShield, "Certified & Hallmarked"],
                                [FiTruck, "Free Shipping"],
                                [FiRefreshCw, "7-day Returns"],
                            ].map(([Icon, t]) => (
                                <div key={t} className="bg-champagne/60 rounded-2xl py-4">
                                    <Icon className="mx-auto text-rosegold text-xl mb-2" />
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {related.length > 0 && (
                    <div className="mt-24">
                        <h2 className="font-display text-3xl text-wine text-center mb-10">You May Also Like</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {related.map((p, i) => (
                                <ProductCard key={p._id} product={p} index={i} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}