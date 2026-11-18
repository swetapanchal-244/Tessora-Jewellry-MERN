import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// Har user ka apna cart. Login/logout par `key` badalta hai,
// isliye CartStore naye sire se (us user ke cart se) load hota hai.
export function CartProvider({ children }) {
    const { user } = useAuth();
    const id = user?._id || "guest";
    return (
        <CartStore key={id} storageKey={`tessora_cart_${id}`}>
            {children}
        </CartStore>
    );
}

function CartStore({ storageKey, children }) {
    const [items, setItems] = useState(() =>
        JSON.parse(localStorage.getItem(storageKey) || "[]")
    );

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(items));
    }, [items, storageKey]);

    // true return karta hai agar kuch cart me add hua, false agar stock ki wajah se add nahi hua
    const addToCart = (product, qty = 1) => {
        const max = product.stock ?? Infinity;
        const existing = items.find((i) => i._id === product._id);
        const current = existing ? existing.qty : 0;
        const canAdd = Math.min(qty, max - current);

        if (canAdd <= 0) {
            toast.error(
                max <= 0
                    ? `${product.name} is out of stock`
                    : `Only ${max} available for ${product.name}`
            );
            return false;
        }
        if (canAdd < qty) toast.error(`Only ${max} available for ${product.name}`);

        setItems((prev) => {
            const found = prev.find((i) => i._id === product._id);
            if (found)
                return prev.map((i) =>
                    i._id === product._id ? { ...i, qty: i.qty + canAdd } : i
                );
            return [...prev, { ...product, qty: canAdd }];
        });
        return true;
    };

    const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i._id !== id));
    const clearCart = () => setItems([]);

    const changeQty = (id, qty) => {
        const item = items.find((i) => i._id === id);
        if (!item) return;

        const max = item.stock ?? Infinity;
        if (qty > max) {
            toast.error(`Only ${max} available for ${item.name}`);
            return;
        }
        setItems((prev) =>
            prev.map((i) => (i._id === id ? { ...i, qty: Math.max(1, qty) } : i))
        );
    };

    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.qty * i.price, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, changeQty, clearCart, count, total }}>
            {children}
        </CartContext.Provider>
    );
}