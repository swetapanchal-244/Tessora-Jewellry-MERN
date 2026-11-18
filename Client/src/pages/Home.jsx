import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import SafeImg from "../components/SafeImg";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../services/api";

const features = [
    { icon: "💎", title: "Certified Diamonds", text: "Every diamond comes with an authenticity certificate." },
    { icon: "✦", title: "Pure 925 Silver", text: "Hallmarked sterling silver, skin-friendly and long lasting." },
    { icon: "🎁", title: "Gift Ready", text: "Premium packaging with every order, free of cost." },
    { icon: "↺", title: "Easy Returns", text: "7-day hassle free returns and lifetime exchange." },
];

const occasions = [
    { name: "Wedding", sub: "Bridal sets & more", icon: "💍" },
    { name: "Anniversary", sub: "Celebrate your love", icon: "💖" },
    { name: "Birthday", sub: "Gifts that sparkle", icon: "🎂" },
    { name: "Daily Wear", sub: "Light & elegant", icon: "✨" },
];

const budgets = [
    { label: "Under ₹5,000", note: "Silver favourites" },
    { label: "₹5,000 - ₹20,000", note: "Diamond studs & pendants" },
    { label: "₹20,000 & above", note: "Statement pieces" },
];

const reviews = [
    { name: "Priya S.", text: "The diamond ring is even prettier in person. Packaging felt so premium!", stars: 5 },
    { name: "Neha P.", text: "Ordered a silver chain for my sister's birthday, she loved it. Fast delivery too.", stars: 5 },
    { name: "Ananya R.", text: "Perfect finish and the certificate gave me full trust. Will order again.", stars: 5 },
];

/* Reusable scroll reveal: dir = up | left | right | zoom */
const reveal = (i = 0, dir = "up") => {
    const from = {
        up: { opacity: 0, y: 50 },
        left: { opacity: 0, x: -60 },
        right: { opacity: 0, x: 60 },
        zoom: { opacity: 0, scale: 0.85 },
    }[dir];
    return {
        initial: from,
        whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
        viewport: { once: true, margin: "-60px" },
        transition: { delay: i * 0.12, duration: 0.8, ease: "easeOut" },
    };
};

const SectionTitle = ({ small, title, text }) => (
    <div className="text-center mb-14">
        <motion.p {...reveal(0)} className="text-xs tracking-[0.5em] text-rosegold uppercase">
            {small}
        </motion.p>
        <motion.h2 {...reveal(1)} className="font-display text-4xl md:text-5xl mt-3 text-wine">
            {title}
        </motion.h2>
        {/* gold line draws from center */}
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="w-20 h-px bg-softgold mx-auto mt-5 origin-center"
        />
        {text && (
            <motion.p {...reveal(2)} className="max-w-xl mx-auto mt-5 text-charcoal/70">
                {text}
            </motion.p>
        )}
    </div>
);

const ProductGrid = ({ items }) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((p, i) => (
            <ProductCard key={p._id} product={p} index={i} />
        ))}
    </div>
);

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/products").then((res) => setProducts(res.data)).catch(console.error);
    }, []);

    const diamond = products.filter((p) => p.metal === "Diamond");
    const silver = products.filter((p) => p.metal === "Silver");
    return (
        <>
            <Hero />

            {/* About / Intro */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <SectionTitle
                    small="Our Story"
                    title="Jewellery That Tells Your Story"
                    text="At Tessora we believe jewellery should feel personal. We bring you brilliant diamonds and elegant silver designs at honest prices, made with care and finished to perfection."
                />
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            {...reveal(i, "up")}
                            whileHover={{ y: -8 }}
                            className="bg-white border border-blush/70 rounded-2xl p-7 text-center hover:shadow-xl hover:shadow-rosegold/15 transition-shadow duration-300"
                        >
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.7 }}
                                className="w-14 h-14 mx-auto rounded-full bg-champagne flex items-center justify-center text-2xl text-rosegold"
                            >
                                {f.icon}
                            </motion.div>
                            <h3 className="font-display text-xl mt-4 text-wine">{f.title}</h3>
                            <p className="text-sm text-charcoal/70 mt-2">{f.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Collections */}
            <section id="categories" className="bg-champagne/70 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionTitle small="Browse" title="Shop By Collection" />
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { name: "Diamond Collection", sub: "Brilliance for forever moments", img: "/images/diamond-necklace.jpg", dir: "left" },
                            { name: "Silver Collection", sub: "Everyday elegance, 925 sterling", img: "/images/silver-chain.jpg", dir: "right" },
                        ].map((c) => (
                            <motion.div
                                key={c.name}
                                {...reveal(0, c.dir)}
                                className="group relative bg-white rounded-3xl h-[400px] overflow-hidden border border-blush cursor-pointer"
                            >
                                <SafeImg
                                    src={c.img}
                                    alt={c.name}
                                    className="absolute inset-0 w-full h-full object-contain p-10 pb-28 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                                />
                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-blush via-blush/90 to-transparent pt-20 pb-6 text-center">
                                    <h3 className="font-display text-3xl text-wine">{c.name}</h3>
                                    <p className="text-sm text-charcoal/75">{c.sub}</p>
                                    <span className="inline-block mt-2 text-[11px] uppercase tracking-[0.25em] text-rosegold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                        Explore →
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Diamond products */}
            <section id="products" className="max-w-7xl mx-auto px-6 pt-24">
                <SectionTitle small="Diamond" title="Diamond Jewellery" text="Certified stones, flawless finish." />
                <ProductGrid items={diamond} />
            </section>

            {/* Occasions */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <SectionTitle small="Gifting" title="Shop By Occasion" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {occasions.map((o, i) => (
                        <motion.div
                            key={o.name}
                            {...reveal(i, "zoom")}
                            whileHover={{ y: -8 }}
                            className="group rounded-3xl bg-gradient-to-br from-champagne to-blush/70 border border-blush p-8 text-center cursor-pointer hover:shadow-xl hover:shadow-rosegold/20 transition-shadow duration-300"
                        >
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                                className="text-4xl"
                            >
                                {o.icon}
                            </motion.div>
                            <h3 className="font-display text-2xl mt-4 text-wine">{o.name}</h3>
                            <p className="text-sm text-charcoal/70 mt-1">{o.sub}</p>
                            <span className="inline-block mt-4 text-[11px] uppercase tracking-[0.25em] text-rosegold group-hover:tracking-[0.35em] transition-all">
                                Explore →
                            </span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Silver products */}
            <section className="bg-champagne/70 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionTitle small="Silver" title="Silver Jewellery" text="Light, modern and made for everyday wear." />
                    <ProductGrid items={silver} />
                </div>
            </section>

            {/* Budget */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <SectionTitle small="Budget" title="Gift By Budget" />
                <div className="grid md:grid-cols-3 gap-6">
                    {budgets.map((b, i) => (
                        <motion.div
                            key={b.label}
                            {...reveal(i, i === 0 ? "left" : i === 2 ? "right" : "up")}
                            whileHover={{ y: -8 }}
                            className="rounded-3xl bg-white border border-softgold/50 p-10 text-center hover:shadow-xl hover:shadow-softgold/25 transition-shadow"
                        >
                            <p className="font-display text-3xl text-rosegold">{b.label}</p>
                            <p className="text-sm text-charcoal/70 mt-2">{b.note}</p>
                            <button className="btn-outline mt-6">Shop Now</button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-champagne/70 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionTitle small="Reviews" title="Loved By Our Customers" />
                    <div className="grid md:grid-cols-3 gap-6">
                        {reviews.map((r, i) => (
                            <motion.div
                                key={r.name}
                                {...reveal(i)}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-3xl p-8 border border-blush/70 shadow-sm hover:shadow-xl hover:shadow-rosegold/15 transition-shadow"
                            >
                                <p className="text-softgold text-lg tracking-widest">
                                    {[...Array(r.stars)].map((_, s) => (
                                        <motion.span
                                            key={s}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + s * 0.12, type: "spring" }}
                                            className="inline-block"
                                        >
                                            ★
                                        </motion.span>
                                    ))}
                                </p>
                                <p className="mt-4 text-charcoal/80 leading-relaxed italic font-display text-xl">
                                    “{r.text}”
                                </p>
                                <p className="mt-5 text-xs uppercase tracking-[0.3em] text-rosegold">{r.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bridal banner */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <motion.div
                    {...reveal(0, "zoom")}
                    className="bg-animate relative overflow-hidden rounded-3xl bg-gradient-to-br from-wine via-rosegold to-wine text-center py-20 px-6 border border-softgold/60"
                >
                    <span className="sparkle absolute top-8 left-10 text-softgold text-3xl">✦</span>
                    <span className="sparkle absolute bottom-10 right-12 text-softgold text-3xl" style={{ animationDelay: "1s" }}>✦</span>
                    <span className="floaty absolute top-1/2 right-[15%] text-softgold/60 text-2xl">◆</span>
                    <span className="floaty absolute bottom-1/3 left-[14%] text-softgold/60 text-2xl" style={{ animationDelay: "2s" }}>◇</span>

                    <p className="text-xs tracking-[0.5em] text-softgold uppercase">Bridal Edit</p>
                    <h2 className="font-display text-4xl md:text-6xl mt-4 text-white">
                        Your Forever Begins <span className="italic text-shine">Here</span>
                    </h2>
                    <p className="max-w-lg mx-auto mt-5 text-white/80">
                        Discover our wedding collection with up to 20% off on making charges.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-gold mt-8 !bg-none !bg-softgold"
                    >
                        View Bridal Collection
                    </motion.button>
                </motion.div>
            </section>

            <Footer />
        </>
    );
}