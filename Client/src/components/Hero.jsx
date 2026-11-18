import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "./CountUp";
import { Link } from "react-router-dom";

const MotionLink = motion.create(Link);

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: "easeOut" },
});

/* Word by word heading reveal */
const Words = ({ text, className = "", start = 0.4 }) =>
    text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
                className={`inline-block ${className}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: start + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
                {w}&nbsp;
            </motion.span>
        </span>
    ));

const gems = [
    { s: "◆", pos: "top-28 left-[45%]", size: "text-2xl", d: "0s" },
    { s: "✦", pos: "top-1/3 right-[6%]", size: "text-3xl", d: "1s" },
    { s: "◇", pos: "bottom-24 left-[8%]", size: "text-3xl", d: "2s" },
    { s: "✧", pos: "bottom-32 right-[30%]", size: "text-2xl", d: "3s" },
];

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-ivory via-champagne to-blush/70"
        >
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-blush/60 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-rosegold/15 rounded-full blur-3xl" />

            {/* floating gems */}
            {gems.map((g, i) => (
                <span
                    key={i}
                    className={`floaty absolute ${g.pos} ${g.size} text-softgold/80`}
                    style={{ animationDelay: g.d }}
                >
                    {g.s}
                </span>
            ))}

            {/* twinkle sparkles */}
            {["top-32 left-[12%]", "top-1/2 left-[6%]", "top-40 right-[10%]", "bottom-28 right-[42%]"].map((pos, i) => (
                <span
                    key={i}
                    className={`sparkle absolute ${pos} text-softgold text-2xl`}
                    style={{ animationDelay: `${i * 0.7}s` }}
                >
                    ✦
                </span>
            ))}

            <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16 grid md:grid-cols-2 gap-12 items-center">
                {/* Text */}
                <motion.div style={{ y: textY }}>
                    <motion.p {...fadeUp(0.2)} className="text-xs tracking-[0.5em] text-rosegold uppercase mb-5">
                        Welcome to Tessora Jewels
                    </motion.p>

                    <h1 className="font-display text-5xl md:text-7xl leading-[1.1] font-medium text-wine">
                        <Words text="Diamonds & Silver," start={0.4} />
                        <br />
                        <Words text="Crafted" className="italic text-shine" start={0.9} />
                        <Words text="To Shine." start={1.05} />
                    </h1>

                    <motion.p {...fadeUp(1.3)} className="mt-6 max-w-md text-charcoal/75 leading-relaxed">
                        Tessora is a fine jewellery house for certified diamonds and pure 925
                        sterling silver. Every piece is designed to be worn daily and
                        remembered forever.
                    </motion.p>

                    <motion.div {...fadeUp(1.5)} className="mt-10 flex flex-wrap gap-4">
                        <MotionLink
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            to="/shop"
                            className="btn-gold inline-block"
                        >
                            Shop Now
                        </MotionLink>
                        <MotionLink
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            to="/shop?metal=Diamond"
                            className="btn-outline inline-block"
                        >
                            Explore Collections
                        </MotionLink>
                    </motion.div>

                    <motion.div {...fadeUp(1.7)} className="mt-12 flex gap-10">
                        {[
                            [10000, "+", "Happy Customers"],
                            [500, "+", "Unique Designs"],
                            [925, "", "Pure Silver"],
                        ].map(([n, suf, t]) => (
                            <div key={t}>
                                <p className="font-display text-3xl text-rosegold">
                                    <CountUp to={n} suffix={suf} />
                                </p>
                                <p className="text-[10px] uppercase tracking-widest text-charcoal/60">{t}</p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Model image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.1, delay: 0.5 }}
                    style={{ y: imgY }}
                    className="relative flex justify-center"
                >
                    {/* outline arch draws in */}
                    <motion.div
                        initial={{ opacity: 0, x: 0, y: 0 }}
                        animate={{ opacity: 1, x: 16, y: 16 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="absolute w-[300px] sm:w-[360px] md:w-[400px] aspect-[3/4] rounded-t-full border border-softgold/70"
                    />

                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-[300px] sm:w-[360px] md:w-[400px] aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl shadow-rosegold/30 bg-champagne"
                    >
                        <motion.img
                            initial={{ scale: 1.5 }}
                            animate={{ scale: 1.15 }}
                            transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
                            src="/images/hero-model.jpg"
                            alt="Model wearing Tessora jewellery"
                            className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.8 }}
                        className="absolute bottom-10 left-2 md:left-0 bg-white/90 backdrop-blur px-5 py-3 rounded-2xl shadow-lg border border-softgold/30"
                    >
                        <p className="text-[10px] uppercase tracking-widest text-charcoal/60">Starting from</p>
                        <p className="font-display text-2xl text-rosegold">₹1,999</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}