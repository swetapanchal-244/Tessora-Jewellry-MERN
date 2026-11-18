import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
    const { items } = useWishlist();
    const { addToCart } = useCart();

    const addAll = () => {
        items.forEach((p) => addToCart(p));
        toast.success(`${items.length} items added to cart`, { icon: "🛍️" });
    };

    return (
        <>
            <PageHeader small="Saved For Later" title="My Wishlist" />

            <div className="max-w-7xl mx-auto px-6 py-16 min-h-[50vh]">
                {items.length === 0 ? (
                    <div className="text-center">
                        <p className="text-5xl">🤍</p>
                        <p className="text-charcoal/70 mt-4">Your wishlist is empty.</p>
                        <Link to="/shop" className="btn-gold inline-block mt-6">Explore Jewellery</Link>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <p className="text-sm text-charcoal/60">{items.length} saved items</p>
                            <button onClick={addAll} className="btn-outline">Add All To Cart</button>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {items.map((p, i) => (
                                <ProductCard key={p._id} product={p} index={i} />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}