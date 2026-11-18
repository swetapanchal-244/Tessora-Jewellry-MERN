import { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import api from "../services/api";

const info = [
    [FiMapPin, "Visit Us", "Surat, Gujarat, India"],
    [FiPhone, "Call Us", "+91 98765 43210"],
    [FiMail, "Email Us", "hello@tessora.com"],
    [FiClock, "Hours", "Mon - Sat, 10am - 8pm"],
];

const input =
    "w-full px-5 py-3 rounded-full border border-blush outline-none focus:border-rosegold bg-white";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/messages", form);
            setSent(true);
            toast.success("Message sent! We'll get back to you soon.", { icon: "💌" });
            setForm({ name: "", email: "", message: "" });
            setTimeout(() => setSent(false), 4000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Could not send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageHeader
                small="Get In Touch"
                title="Contact Us"
                text="Questions about an order or a custom design? We'd love to hear from you."
            />

            <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12">
                <div className="grid sm:grid-cols-2 gap-5 content-start">
                    {info.map(([Icon, title, text], i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border border-blush rounded-3xl p-7 text-center hover:shadow-xl hover:shadow-rosegold/15 transition-shadow"
                        >
                            <div className="w-12 h-12 mx-auto rounded-full bg-champagne flex items-center justify-center text-rosegold text-xl">
                                <Icon />
                            </div>
                            <h3 className="font-display text-xl text-wine mt-3">{title}</h3>
                            <p className="text-sm text-charcoal/70 mt-1">{text}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.form
                    onSubmit={submit}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white border border-blush rounded-3xl p-8 shadow-xl shadow-rosegold/10"
                >
                    <h2 className="font-display text-3xl text-wine">Send a Message</h2>

                    {sent && (
                        <p className="mt-4 text-sm text-wine bg-champagne rounded-lg px-4 py-2">
                            Thank you! We'll get back to you soon. 💎
                        </p>
                    )}

                    <div className="space-y-4 mt-6">
                        <input required placeholder="Your name" value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
                        <input required type="email" placeholder="Email" value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
                        <textarea required rows={5} placeholder="Your message" value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="w-full px-5 py-3 rounded-3xl border border-blush outline-none focus:border-rosegold bg-white resize-none" />
                    </div>
                    <button disabled={loading} className="btn-gold w-full mt-6">
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </motion.form>
            </section>
            <Footer />
        </>
    );
}