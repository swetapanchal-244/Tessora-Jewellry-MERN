import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(form.email, form.password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory via-champagne to-blush/70 px-6 pt-24">
            <form onSubmit={submit} className="w-full max-w-md bg-white rounded-3xl p-10 shadow-xl shadow-rosegold/15 border border-blush">
                <h1 className="font-display text-4xl text-wine text-center">Welcome Back</h1>
                <p className="text-center text-sm text-charcoal/60 mt-2">Login to your Tessora account</p>

                {error && <p className="mt-5 text-sm text-rosegold bg-blush/40 rounded-lg px-4 py-2">{error}</p>}

                <input
                    type="email" required placeholder="Email"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full mt-6 px-5 py-3 rounded-full border border-blush outline-none focus:border-rosegold"
                />
                <input
                    type="password" required placeholder="Password"
                    value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full mt-4 px-5 py-3 rounded-full border border-blush outline-none focus:border-rosegold"
                />
                <button disabled={loading} className="btn-gold w-full mt-6">
                    {loading ? "Please wait..." : "Login"}
                </button>
                <p className="text-center text-sm mt-5">
                    New here? <Link to="/register" className="text-rosegold underline">Create account</Link>
                </p>
            </form>
        </div>
    );
}