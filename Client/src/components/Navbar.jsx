import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

const links = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Collections", to: "/collections" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { count } = useCart();
    const { count: wishCount } = useWishlist();
    const { user, logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => setOpen(false), [location.pathname]);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled || open ? "bg-ivory/90 backdrop-blur-md shadow-sm py-2" : "py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <Logo size={44} />
                    <div className="leading-none">
                        <p className="font-display text-2xl tracking-[0.25em] text-wine">TESSORA</p>
                        <p className="text-[8px] tracking-[0.5em] text-softgold mt-1">JEWELS</p>
                    </div>
                </Link>

                <nav className="hidden md:flex gap-10">
                    {links.map((l) => (
                        <NavLink
                            key={l.label}
                            to={l.to}
                            end={l.to === "/"}
                            className={({ isActive }) =>
                                `relative text-xs uppercase tracking-[0.2em] group ${isActive ? "text-rosegold" : "text-charcoal"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {l.label}
                                    <span
                                        className={`absolute -bottom-1 left-0 h-px bg-softgold transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                                            }`}
                                    />
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-5 text-lg">
                    <Link to="/shop" title="Search">
                        <FiSearch className="hover:text-rosegold transition" />
                    </Link>
                    <Link to="/wishlist" title="Wishlist" className="relative hidden sm:block hover:text-rosegold transition">
                        <FiHeart />
                        {wishCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-rosegold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                                {wishCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <>
                            {user.role === "admin" && (
                                <Link to="/admin" className="hidden sm:block text-xs uppercase tracking-widest text-rosegold font-medium">
                                    Admin
                                </Link>
                            )}
                            <Link
                                to="/orders"
                                className="hidden sm:block text-xs uppercase tracking-widest hover:text-rosegold"
                            >
                                Orders
                            </Link>
                            <button
                                onClick={logout}
                                title="Logout"
                                className="hidden sm:block text-xs uppercase tracking-widest hover:text-rosegold"
                            >
                                {user.name.split(" ")[0]} ✕
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="hidden sm:block">
                            <FiUser className="hover:text-rosegold transition" />
                        </Link>
                    )}

                    <Link to="/cart" className="relative hover:text-rosegold transition">
                        <FiShoppingBag />
                        <span className="absolute -top-2 -right-2 bg-rosegold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                            {count}
                        </span>
                    </Link>

                    <button className="md:hidden" onClick={() => setOpen(!open)}>
                        {open ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden px-6 py-5 flex flex-col gap-4 border-t border-champagne">
                    {links.map((l) => (
                        <NavLink
                            key={l.label}
                            to={l.to}
                            end={l.to === "/"}
                            className={({ isActive }) =>
                                `text-xs uppercase tracking-[0.2em] ${isActive ? "text-rosegold" : ""}`
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                    {user ? (
                        <>
                            <NavLink to="/orders" className="text-xs uppercase tracking-[0.2em]">
                                My Orders
                            </NavLink>
                            <button onClick={logout} className="text-left text-xs uppercase tracking-[0.2em] text-rosegold">
                                Logout ({user.name.split(" ")[0]})
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="text-xs uppercase tracking-[0.2em] text-rosegold">
                            Login
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}