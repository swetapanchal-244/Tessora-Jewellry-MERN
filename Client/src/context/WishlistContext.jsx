import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

// Har user ki apni wishlist. Login/logout par key badalti hai aur store naye sire se load hota hai.
export function WishlistProvider({ children }) {
    const { user } = useAuth();
    const id = user?._id || "guest";
    return (
        <WishlistStore key={id} storageKey={`tessora_wishlist_${id}`}>
            {children}
        </WishlistStore>
    );
}

function WishlistStore({ storageKey, children }) {
    const [items, setItems] = useState(() =>
        JSON.parse(localStorage.getItem(storageKey) || "[]")
    );

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(items));
    }, [items, storageKey]);

    const isWished = (id) => items.some((i) => i._id === id);

    const toggleWishlist = (product) => {
        if (isWished(product._id)) {
            setItems((prev) => prev.filter((i) => i._id !== product._id));
            toast("Removed from wishlist", { icon: "💔" });
        } else {
            setItems((prev) => [...prev, product]);
            toast.success(`${product.name} added to wishlist`, { icon: "❤️" });
        }
    };

    return (
        <WishlistContext.Provider
            value={{ items, isWished, toggleWishlist, count: items.length }}
        >
            {children}
        </WishlistContext.Provider>
    );
}