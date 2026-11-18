import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

const input =
    "w-full px-5 py-3 rounded-full border border-blush outline-none focus:border-rosegold bg-white";

export default function Checkout() {
    const { items, total, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: user?.name || "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (!user) return <Navigate to="/login" replace />;
    if (items.length === 0) return <Navigate to="/cart" replace />;

    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const { data } = await api.post("/orders", {
                items: items.map((i) => ({ product: i._id, qty: i.qty })),
                address: form,
            });
            clearCart();
            navigate("/orders", { state: { placed: data._id } });
        } catch (err) {
            setError(err.response?.data?.message || "Could not place order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="max-w-6xl mx-auto px-6 pt-36 pb-24 min-h-screen">
                <h1 className="font-display text-5xl text-wine text-center">Checkout</h1>

                <form onSubmit={submit} className="mt-12 grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white border border-blush rounded-3xl p-8">
                        <h2 className="font-display text-2xl text-wine">Delivery Address</h2>

                        {error && (
                            <p className="mt-4 text-sm text-rosegold bg-blush/40 rounded-lg px-4 py-2">{error}</p>
                        )}

                        <div className="grid sm:grid-cols-2 gap-4 mt-6">
                            <input required placeholder="Full name" value={form.fullName} onChange={set("fullName")} className={input} />
                            <input required placeholder="Phone number" value={form.phone} onChange={set("phone")} className={input} />
                            <input required placeholder="Address (house, street)" value={form.street} onChange={set("street")} className={`${input} sm:col-span-2`} />
                            <input required placeholder="City" value={form.city} onChange={set("city")} className={input} />
                            <input required placeholder="State" value={form.state} onChange={set("state")} className={input} />
                            <input required placeholder="Pincode" value={form.pincode} onChange={set("pincode")} className={input} />
                        </div>

                        <h2 className="font-display text-2xl text-wine mt-8">Payment</h2>
                        <label className="mt-4 flex items-center gap-3 border border-rosegold rounded-2xl px-5 py-4 bg-champagne/50">
                            <input type="radio" checked readOnly className="accent-rosegold" />
                            <span>Cash on Delivery</span>
                        </label>
                    </div>

                    <div className="bg-white border border-softgold/40 rounded-3xl p-7 h-fit">
                        <h3 className="font-display text-2xl text-wine">Order Summary</h3>
                        <div className="mt-5 space-y-3 text-sm">
                            {items.map((i) => (
                                <div key={i._id} className="flex justify-between gap-3">
                                    <span>{i.name} × {i.qty}</span>
                                    <span>₹{(i.price * i.qty).toLocaleString("en-IN")}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-5 text-sm"><span>Shipping</span><span className="text-softgold">Free</span></div>
                        <div className="flex justify-between mt-4 pt-4 border-t border-blush font-medium">
                            <span>Total</span>
                            <span className="text-rosegold">₹{total.toLocaleString("en-IN")}</span>
                        </div>
                        <button disabled={loading} className="btn-gold w-full mt-6">
                            {loading ? "Placing order..." : "Place Order"}
                        </button>
                        <Link to="/cart" className="block text-center text-xs mt-4 text-charcoal/60 hover:text-rosegold">
                            ← Back to cart
                        </Link>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}