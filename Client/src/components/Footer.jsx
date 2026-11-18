import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Logo from "./Logo";

const columns = [
    ["Shop", ["Diamond Rings", "Diamond Necklaces", "Diamond Earrings", "Silver Chains", "Silver Rings"]],
    ["Help", ["Shipping", "Returns & Exchange", "Size Guide", "Jewellery Care", "FAQ"]],
    ["Company", ["Our Story", "Certification", "Store Locator", "Contact Us"]],
];

export default function Footer() {
    return (
        <footer className="relative">
            {/* Newsletter strip */}
            <div className="bg-gradient-to-r from-wine via-rosegold to-wine">
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-xs tracking-[0.4em] text-softgold uppercase">Join Tessora Circle</p>
                        <h3 className="font-display text-3xl md:text-4xl text-white mt-2">
                            Get 10% off your first order
                        </h3>
                    </div>
                    <div className="flex w-full md:w-auto bg-white rounded-full p-1.5 shadow-lg">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 md:w-72 px-5 text-sm bg-transparent outline-none text-charcoal placeholder:text-charcoal/40"
                        />
                        <button className="btn-gold">Subscribe</button>
                    </div>
                </div>
            </div>

            {/* Main footer (royal light pink) */}
            <div className="bg-gradient-to-b from-champagne to-blush/60 border-t-2 border-softgold/60">
                <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3">
                            <Logo size={48} />
                            <div className="leading-none">
                                <p className="font-display text-3xl tracking-[0.25em] text-wine">TESSORA</p>
                                <p className="text-[9px] tracking-[0.5em] text-softgold mt-1">JEWELS</p>
                            </div>
                        </div>
                        <p className="mt-5 text-sm text-charcoal/75 max-w-sm leading-relaxed">
                            Timeless. Sparkling. Yours. Certified diamonds and pure 925 silver
                            jewellery, crafted with love for every special moment.
                        </p>

                        <ul className="mt-6 space-y-3 text-sm text-charcoal/80">
                            <li className="flex items-center gap-3"><FiMapPin className="text-rosegold" /> Surat, Gujarat, India</li>
                            <li className="flex items-center gap-3"><FiPhone className="text-rosegold" /> +91 98765 43210</li>
                            <li className="flex items-center gap-3"><FiMail className="text-rosegold" /> hello@tessora.com</li>
                        </ul>

                        <div className="flex gap-3 mt-6">
                            {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-rosegold/50 text-rosegold flex items-center justify-center hover:bg-rosegold hover:text-white transition"
                                >
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {columns.map(([title, items]) => (
                        <div key={title}>
                            <h4 className="font-display text-2xl text-wine mb-2">{title}</h4>
                            <div className="w-8 h-px bg-softgold mb-4" />
                            <ul className="space-y-3 text-sm text-charcoal/75">
                                {items.map((item) => (
                                    <li key={item} className="hover:text-rosegold hover:translate-x-1 cursor-pointer transition-all">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Trust row */}
                <div className="border-t border-softgold/40">
                    <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-x-10 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-wine">
                        {["Certified Diamonds", "925 Hallmarked Silver", "Free Shipping", "Secure Payments"].map((t) => (
                            <span key={t}>✦ {t}</span>
                        ))}
                    </div>
                </div>

                <p className="text-center text-xs text-charcoal/60 pb-6 tracking-widest">
                    © 2026 TESSORA JEWELS. ALL RIGHTS RESERVED.
                </p>
            </div>
        </footer>
    );
}