import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register(form.name, form.email, form.password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const input = "w-full mt-4 px-5 py-3 rounded-full border border-blush outline-none focus:border-rosegold";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory via-champagne to-blush/70 px-6 pt-24">
            <form onSubmit={submit} className="w-full max-w-md bg-white rounded-3xl p-10 shadow-xl shadow-rosegold/15 border border-blush">
                <h1 className="font-display text-4xl text-wine text-center">Create Account</h1>
                <p className="text-center text-sm text-charcoal/60 mt-2">Join Tessora Circle</p>

                {error && <p className="mt-5 text-sm text-rosegold bg-blush/40 rounded-lg px-4 py-2">{error}</p>}

                <input required placeholder="Full name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
                <input type="email" required placeholder="Email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
                <input type="password" required minLength={6} placeholder="Password (min 6)" value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })} className={input} />

                <button disabled={loading} className="btn-gold w-full mt-6">
                    {loading ? "Please wait..." : "Register"}
                </button>
                <p className="text-center text-sm mt-5">
                    Already a member? <Link to="/login" className="text-rosegold underline">Login</Link>
                </p>
            </form>
        </div>
    );
}