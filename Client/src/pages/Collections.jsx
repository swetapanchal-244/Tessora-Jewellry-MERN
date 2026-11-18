import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import SafeImg from "../components/SafeImg";
import Footer from "../components/Footer";

const collections = [
    {
        name: "Diamond Collection",
        sub: "Certified brilliance for forever moments",
        img: "/images/diamond-necklace.jpg",
        to: "/shop?metal=Diamond",
    },
    {
        name: "Silver Collection",
        sub: "Pure 925 sterling for everyday elegance",
        img: "/images/silver-chain.jpg",
        to: "/shop?metal=Silver",
    },
];

const types = [
    { name: "Rings", img: "/images/diamond-ring.jpg" },
    { name: "Necklace", img: "/images/diamond-necklace.jpg" },
    { name: "Earrings", img: "/images/diamond-earrings.jpg" },
    { name: "Bracelet", img: "/images/silver-bracelet.jpg" },
];

export default function Collections() {
    return (
        <>
            <PageHeader
                small="Browse"
                title="Our Collections"
                text="Two worlds of shine. Pick the one that matches your story."
            />

            <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-6">
                {collections.map((c, i) => (
                    <motion.div
                        key={c.name}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.7 }}
                    >
                        <Link
                            to={c.to}
                            className="group relative block bg-white rounded-3xl h-[460px] overflow-hidden border border-blush"
                        >
                            <SafeImg
                                src={c.img}
                                alt={c.name}
                                className="absolute inset-0 w-full h-full object-contain p-10 pb-32 transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-blush via-blush/90 to-transparent pt-24 pb-8 text-center">
                                <h3 className="font-display text-3xl text-wine">{c.name}</h3>
                                <p className="text-sm text-charcoal/75">{c.sub}</p>
                                <span className="inline-block mt-3 text-[11px] uppercase tracking-[0.25em] text-rosegold">
                                    Shop Now →
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </section>

            <section className="bg-champagne/70 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="font-display text-4xl text-wine text-center mb-12">Shop By Type</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {types.map((t, i) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, scale: 0.85 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link to="/shop" className="group block text-center">
                                    <div className="aspect-square bg-white rounded-full border border-blush overflow-hidden group-hover:shadow-xl group-hover:shadow-rosegold/20 transition-shadow">
                                        <SafeImg
                                            src={t.img}
                                            alt={t.name}
                                            className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <p className="font-display text-xl text-wine mt-3">{t.name}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}