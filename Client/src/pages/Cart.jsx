import { Link } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

export default function Cart() {
    const { items, removeFromCart, changeQty, total } = useCart();

    return (
        <>
            <div className="max-w-5xl mx-auto px-6 pt-36 pb-24 min-h-screen">
                <h1 className="font-display text-5xl text-wine text-center">Your Cart</h1>

                {items.length === 0 ? (
                    <div className="text-center mt-16">
                        <p className="text-charcoal/70">Your cart is empty.</p>
                        <Link to="/" className="btn-gold inline-block mt-6">Continue Shopping</Link>
                    </div>
                ) : (
                    <div className="mt-12 grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((i) => (
                                <div key={i._id} className="flex gap-5 items-center bg-white rounded-2xl p-4 border border-blush">
                                    <img src={i.image} alt={i.name} className="w-24 h-24 object-contain bg-white rounded-xl" />
                                    <div className="flex-1">
                                        <h3 className="font-display text-xl text-wine">{i.name}</h3>
                                        <p className="text-xs uppercase tracking-widest text-softgold">{i.category}</p>
                                        <p className="text-rosegold mt-1">₹{i.price.toLocaleString("en-IN")}</p>
                                    </div>
                                    <div className="flex items-center gap-3 border border-blush rounded-full px-3 py-1">
                                        <button onClick={() => changeQty(i._id, i.qty - 1)}><FiMinus /></button>
                                        <span className="w-5 text-center">{i.qty}</span>
                                        <button onClick={() => changeQty(i._id, i.qty + 1)}><FiPlus /></button>
                                    </div>
                                    <button onClick={() => removeFromCart(i._id)} className="text-rosegold hover:scale-110 transition">
                                        <FiTrash2 />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-2xl p-7 border border-softgold/40 h-fit">
                            <h3 className="font-display text-2xl text-wine">Order Summary</h3>
                            <div className="flex justify-between mt-5 text-sm"><span>Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span></div>
                            <div className="flex justify-between mt-2 text-sm"><span>Shipping</span><span className="text-softgold">Free</span></div>
                            <div className="flex justify-between mt-4 pt-4 border-t border-blush font-medium">
                                <span>Total</span><span className="text-rosegold">₹{total.toLocaleString("en-IN")}</span>
                            </div>
                            <Link to="/checkout" className="btn-gold w-full mt-6 block text-center">Checkout</Link>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}