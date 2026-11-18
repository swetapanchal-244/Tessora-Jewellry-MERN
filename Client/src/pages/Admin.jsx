import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const tabs = ["Overview", "Products", "Orders", "Messages"];
const statuses = ["Placed", "Shipped", "Delivered", "Cancelled"];
const emptyForm = { name: "", category: "", metal: "Diamond", price: "", stock: 10, image: "", tag: "", description: "" };

const input = "w-full px-4 py-2.5 rounded-full border border-blush outline-none focus:border-rosegold bg-white text-sm";

export default function Admin() {
    const { user } = useAuth();
    const [tab, setTab] = useState("Overview");
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [messages, setMessages] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);

    const loadAll = () => {
        api.get("/products").then((r) => setProducts(r.data)).catch(console.error);
        api.get("/orders").then((r) => setOrders(r.data)).catch(console.error);
        api.get("/messages").then((r) => setMessages(r.data)).catch(console.error);
    };

    useEffect(() => {
        if (user?.role === "admin") loadAll();
    }, [user]);

    if (!user || user.role !== "admin") return <Navigate to="/" replace />;

    const revenue = orders
        .filter((o) => o.status !== "Cancelled")
        .reduce((s, o) => s + (o.totalPrice || 0), 0);

    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const saveProduct = async (e) => {
        e.preventDefault();
        const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
        try {
            if (editId) {
                await api.put(`/products/${editId}`, payload);
                toast.success("Product updated");
            } else {
                await api.post("/products", payload);
                toast.success("Product added");
            }
            setForm(emptyForm);
            setEditId(null);
            loadAll();
        } catch (err) {
            toast.error(err.response?.data?.message || "Could not save product");
        }
    };

    const editProduct = (p) => {
        setEditId(p._id);
        setForm({
            name: p.name, category: p.category, metal: p.metal, price: p.price, stock: p.stock ?? 0,
            image: p.image, tag: p.tag || "", description: p.description || "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await api.delete(`/products/${id}`);
            toast.success("Product deleted");
            loadAll();
        } catch {
            toast.error("Could not delete");
        }
    };

    const changeStatus = async (id, status) => {
        try {
            await api.put(`/orders/${id}/status`, { status });
            toast.success(`Order marked ${status}`);
            loadAll();
        } catch (err) {
            toast.error(err.response?.data?.message || "Could not update status");
        }
    };

    const readMessage = async (id) => {
        await api.put(`/messages/${id}/read`).catch(console.error);
        loadAll();
    };

    const stats = [
        ["Products", products.length],
        ["Orders", orders.length],
        ["Messages", messages.filter((m) => !m.isRead).length + " new"],
        ["Revenue", "₹" + revenue.toLocaleString("en-IN")],
        ["Low Stock", products.filter((p) => p.stock <= 3).length],
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 pt-36 pb-24 min-h-screen">
            <h1 className="font-display text-5xl text-wine text-center">Admin Dashboard</h1>

            <div className="flex flex-wrap justify-center gap-2 mt-8">
                {tabs.map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-6 py-2 rounded-full text-xs uppercase tracking-[0.15em] border transition ${tab === t ? "bg-rosegold text-white border-rosegold" : "border-softgold/60 text-wine hover:bg-champagne"
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* OVERVIEW */}
            {tab === "Overview" && (
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mt-10">
                    {stats.map(([label, value]) => (
                        <div key={label} className="bg-white border border-blush rounded-3xl p-7 text-center">
                            <p className="font-display text-4xl text-rosegold">{value}</p>
                            <p className="text-xs uppercase tracking-widest text-charcoal/60 mt-2">{label}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* PRODUCTS */}
            {tab === "Products" && (
                <div className="mt-10">
                    <form onSubmit={saveProduct} className="bg-white border border-blush rounded-3xl p-6">
                        <h2 className="font-display text-2xl text-wine">{editId ? "Edit Product" : "Add Product"}</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                            <input required placeholder="Name" value={form.name} onChange={set("name")} className={input} />
                            <input required placeholder="Category (e.g. Diamond Ring)" value={form.category} onChange={set("category")} className={input} />
                            <select value={form.metal} onChange={set("metal")} className={input}>
                                <option>Diamond</option>
                                <option>Silver</option>
                                <option>Gold</option>
                            </select>
                            <input required type="number" min="0" placeholder="Price" value={form.price} onChange={set("price")} className={input} />
                            <input required type="number" min="0" placeholder="Stock quantity" value={form.stock} onChange={set("stock")} className={input} />
                            <input required placeholder="Image path (/images/x.jpg)" value={form.image} onChange={set("image")} className={input} />
                            <input placeholder="Tag (New, Bestseller)" value={form.tag} onChange={set("tag")} className={input} />
                            <input placeholder="Description" value={form.description} onChange={set("description")} className={`${input} sm:col-span-2 lg:col-span-3`} />
                        </div>
                        <div className="flex gap-3 mt-5">
                            <button className="btn-gold">{editId ? "Update" : "Add Product"}</button>
                            {editId && (
                                <button type="button" className="btn-outline" onClick={() => { setEditId(null); setForm(emptyForm); }}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="mt-8 bg-white border border-blush rounded-3xl overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-champagne/60 text-left text-xs uppercase tracking-widest text-charcoal/60">
                                <tr>
                                    <th className="p-4">Image</th><th className="p-4">Name</th><th className="p-4">Category</th>
                                    <th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p._id} className="border-t border-blush">
                                        <td className="p-4"><img src={p.image} alt="" className="w-12 h-12 object-contain" /></td>
                                        <td className="p-4 text-wine">{p.name}</td>
                                        <td className="p-4">{p.category}</td>
                                        <td className="p-4 text-rosegold">₹{p.price.toLocaleString("en-IN")}</td>
                                        <td className={`p-4 ${p.stock <= 3 ? "text-red-600 font-medium" : ""}`}>
                                            {p.stock}{p.stock === 0 ? " (Out)" : p.stock <= 3 ? " (Low)" : ""}
                                        </td>
                                        <td className="p-4 space-x-4">
                                            <button onClick={() => editProduct(p)} className="text-rosegold hover:underline">Edit</button>
                                            <button onClick={() => deleteProduct(p._id)} className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ORDERS */}
            {tab === "Orders" && (
                <div className="mt-10 space-y-4">
                    {orders.length === 0 && <p className="text-center text-charcoal/60">No orders yet.</p>}
                    {orders.map((o) => (
                        <div key={o._id} className="bg-white border border-blush rounded-3xl p-6">
                            <div className="flex flex-wrap justify-between gap-3">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-charcoal/50">
                                        #{o._id.slice(-6).toUpperCase()} · {new Date(o.createdAt).toLocaleDateString("en-IN")}
                                    </p>
                                    <p className="font-display text-xl text-wine mt-1">{o.user?.name || "Deleted user"}</p>
                                    <p className="text-xs text-charcoal/60">{o.user?.email}</p>
                                </div>
                                <select
                                    value={o.status}
                                    disabled={o.status === "Cancelled"}
                                    onChange={(e) => changeStatus(o._id, e.target.value)}
                                    className="self-start px-4 py-2 rounded-full border border-rosegold text-sm bg-white"
                                >
                                    {statuses.map((s) => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="mt-3 text-sm text-charcoal/75">
                                {(o.items || []).map((i, idx) => (
                                    <p key={idx}>{i.name} × {i.qty}</p>
                                ))}
                            </div>
                            <p className="mt-3 text-xs text-charcoal/60">
                                {o.address?.fullName}, {o.address?.phone} · {o.address?.street}, {o.address?.city}, {o.address?.state} {o.address?.pincode}
                            </p>
                            <p className="mt-2 font-medium text-rosegold">₹{(o.totalPrice || 0).toLocaleString("en-IN")}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* MESSAGES */}
            {tab === "Messages" && (
                <div className="mt-10 space-y-4">
                    {messages.length === 0 && <p className="text-center text-charcoal/60">No messages yet.</p>}
                    {messages.map((m) => (
                        <div key={m._id} className={`rounded-3xl p-6 border ${m.isRead ? "bg-white border-blush" : "bg-champagne/60 border-rosegold/50"}`}>
                            <div className="flex flex-wrap justify-between gap-2">
                                <div>
                                    <p className="font-display text-xl text-wine">{m.name}</p>
                                    <p className="text-xs text-charcoal/60">{m.email} · {new Date(m.createdAt).toLocaleString("en-IN")}</p>
                                </div>
                                {!m.isRead && (
                                    <button onClick={() => readMessage(m._id)} className="text-xs uppercase tracking-widest text-rosegold hover:underline">
                                        Mark as read
                                    </button>
                                )}
                            </div>
                            <p className="mt-3 text-charcoal/80">{m.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}