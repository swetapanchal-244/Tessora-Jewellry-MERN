import { motion } from "framer-motion";

export default function PageHeader({ small, title, text }) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-ivory via-champagne to-blush/70 pt-36 pb-16 text-center">
            <span className="floaty absolute top-32 left-[10%] text-softgold/70 text-2xl">◆</span>
            <span className="sparkle absolute top-44 right-[12%] text-softgold text-2xl">✦</span>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs tracking-[0.5em] text-rosegold uppercase"
            >
                {small}
            </motion.p>
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="font-display text-5xl md:text-6xl text-wine mt-3"
            >
                {title}
            </motion.h1>
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-20 h-px bg-softgold mx-auto mt-5"
            />
            {text && <p className="max-w-xl mx-auto mt-5 px-6 text-charcoal/70">{text}</p>}
        </section>
    );
}