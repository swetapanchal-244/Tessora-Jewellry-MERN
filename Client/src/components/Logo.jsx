import { motion } from "framer-motion";

export default function Logo({ size = 60, animate = false }) {
    const draw = (delay) =>
        animate
            ? {
                initial: { pathLength: 0, opacity: 0 },
                animate: { pathLength: 1, opacity: 1 },
                transition: { duration: 1.4, delay, ease: "easeInOut" },
            }
            : {};

    return (
        <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
            <defs>
                <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#E6C98F" />
                    <stop offset="50%" stopColor="#C9A66B" />
                    <stop offset="100%" stopColor="#B76E79" />
                </linearGradient>
            </defs>
            <motion.path
                d="M60 8 L112 60 L60 112 L8 60 Z"
                stroke="url(#gold)"
                strokeWidth="2.5"
                {...draw(0)}
            />
            <motion.path
                d="M38 38 H82 M60 38 V86"
                stroke="url(#gold)"
                strokeWidth="5"
                strokeLinecap="round"
                {...draw(0.6)}
            />
            <motion.path
                d="M77 52 C77 43 63 43 57 48 C49 54 52 61 60 63 C69 65 71 73 63 77 C55 81 45 77 44 70"
                stroke="url(#gold)"
                strokeWidth="4"
                strokeLinecap="round"
                {...draw(1)}
            />
        </svg>
    );
}