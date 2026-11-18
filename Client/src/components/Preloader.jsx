import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Preloader() {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory"
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <Logo size={110} animate />
            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="font-display text-4xl tracking-[0.35em] text-charcoal mt-6"
            >
                TESSORA
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="text-[10px] tracking-[0.5em] text-softgold mt-2"
            >
                JEWELS
            </motion.p>
        </motion.div>
    );
}