import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import CountUp from "../components/CountUp";
import Footer from "../components/Footer";

const values = [
    { icon: "💎", title: "Certified Quality", text: "Every diamond and silver piece is certified and hallmarked before it reaches you." },
    { icon: "🤍", title: "Honest Pricing", text: "Transparent prices with no hidden making charges." },
    { icon: "🎁", title: "Made For Moments", text: "Gift-ready packaging for birthdays, weddings and everything between." },
];

const stats = [
    [10000, "+", "Happy Customers"],
    [500, "+", "Unique Designs"],
    [25, "+", "Years of Craft"],
    [100, "%", "Certified"],
];

const reveal = (i = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: i * 0.12, duration: 0.7 },
});

export default function About() {
    return (
        <>
            <PageHeader
                small="Our Story"
                title="About Tessora"
                text="Timeless. Sparkling. Yours."
            />

            <section className="max-w-4xl mx-auto px-6 py-20 text-center">
                <motion.p {...reveal()} className="font-display text-2xl md:text-3xl text-wine leading-relaxed">
                    Tessora was born from a simple idea: jewellery should feel personal, not
                    intimidating.
                </motion.p>
                <motion.p {...reveal(1)} className="mt-6 text-charcoal/75 leading-relaxed">
                    We are a fine jewellery house for certified diamonds and pure 925
                    sterling silver. Our designers blend modern minimalism with classic
                    craftsmanship, so every piece works for daily wear and still feels
                    special enough to be remembered forever.
                </motion.p>
            </section>

            <section className="bg-champagne/70 py-16">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map(([n, s, t]) => (
                        <div key={t}>
                            <p className="font-display text-5xl text-rosegold">
                                <CountUp to={n} suffix={s} />
                            </p>
                            <p className="text-xs uppercase tracking-widest text-charcoal/60 mt-2">{t}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="font-display text-4xl text-wine text-center mb-12">What We Believe</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            {...reveal(i)}
                            whileHover={{ y: -8 }}
                            className="bg-white border border-blush rounded-3xl p-8 text-center hover:shadow-xl hover:shadow-rosegold/15 transition-shadow"
                        >
                            <div className="w-14 h-14 mx-auto rounded-full bg-champagne flex items-center justify-center text-2xl">
                                {v.icon}
                            </div>
                            <h3 className="font-display text-2xl text-wine mt-4">{v.title}</h3>
                            <p className="text-sm text-charcoal/70 mt-2">{v.text}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-14">
                    <Link to="/shop" className="btn-gold inline-block">Explore The Collection</Link>
                </div>
            </section>
            <Footer />
        </>
    );
}