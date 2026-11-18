import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

const statusColor = {
    Placed: "bg-champagne text-wine",
    Shipped: "bg-blush text-wine",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-700",
};

export default function Orders() {
    const { user } = useAuth();
    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        api
            .get("/orders/my")
            .then((res) => setOrders(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [user]);

    if (!user) return <Navigate to="/login" replace />;

    return (
        <>
            <div className="max-w-4xl mx-auto px-6 pt-36 pb-24 min-h-screen">
                <h1 className="font-display text-5xl text-wine text-center">My Orders</h1>

                {location.state?.placed && (
                    <p className="mt-8 text-center text-wine bg-champagne rounded-2xl px-5 py-3">
                        Order placed successfully! Thank you for shopping with Tessora 💎
                    </p>
                )}

                {loading ? (
                    <p className="text-center mt-12 text-charcoal/60">Loading...</p>
                ) : orders.length === 0 ? (
                    <div className="text-center mt-12">
                        <p className="text-charcoal/70">You haven't placed any orders yet.</p>
                        <Link to="/shop" className="btn-gold inline-block mt-6">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="mt-10 space-y-5">
                        {orders.map((o) => (
                            <div key={o._id} className="bg-white border border-blush rounded-3xl p-6">
                                <div className="flex flex-wrap justify-between gap-3 text-sm">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-charcoal/50">
                                            Order #{o._id.slice(-6).toUpperCase()}
                                        </p>
                                        <p className="text-charcoal/70">
                                            {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                        </p>
                                    </div>
                                    <span className={`self-start px-4 py-1 rounded-full text-xs uppercase tracking-widest ${statusColor[o.status] || "bg-champagne text-wine"}`}>
                                        {o.status}
                                    </span>
                                </div>

                                <div className="mt-4 space-y-3">
                                    {(o.items || []).map((i, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <img src={i.image} alt={i.name} className="w-16 h-16 object-contain bg-white border border-blush rounded-xl" />
                                            <div className="flex-1">
                                                <p className="font-display text-lg text-wine">{i.name}</p>
                                                <p className="text-xs text-charcoal/60">Qty {i.qty}</p>
                                            </div>
                                            <p className="text-rosegold">₹{(i.price * i.qty).toLocaleString("en-IN")}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between mt-5 pt-4 border-t border-blush">
                                    <span className="text-sm text-charcoal/70">
                                        {o.address.city}, {o.address?.state} · {o.paymentMethod}
                                    </span>
                                    <span className="font-medium text-rosegold">₹{(o.totalPrice || 0).toLocaleString("en-IN")}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}