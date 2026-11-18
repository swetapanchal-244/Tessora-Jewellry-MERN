import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import SparkleCursor from "./components/SparkleCursor";
import BackToTop from "./components/BackToTop";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import { Toaster } from "react-hot-toast";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";

const Page = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Preloader key="loader" />}</AnimatePresence>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2200,
          style: {
            background: "#fff",
            color: "#5c1a33",
            border: "1px solid #eeb9c4",
            borderRadius: "999px",
            padding: "10px 20px",
            fontSize: "14px",
            boxShadow: "0 10px 30px -10px rgba(166,58,88,0.35)",
          },
          success: { iconTheme: { primary: "#a63a58", secondary: "#fff" } },
        }}
      />

      <ScrollToTop />
      <ScrollProgress />
      <SparkleCursor />
      <BackToTop />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/shop" element={<Page><Shop /></Page>} />
          <Route path="/product/:id" element={<Page><ProductDetails /></Page>} />
          <Route path="/collections" element={<Page><Collections /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="/cart" element={<Page><Cart /></Page>} />
          <Route path="/login" element={<Page><Login /></Page>} />
          <Route path="/register" element={<Page><Register /></Page>} />
          <Route path="/checkout" element={<Page><Checkout /></Page>} />
          <Route path="/orders" element={<Page><Orders /></Page>} />
          <Route path="/wishlist" element={<Page><Wishlist /></Page>} />
          <Route path="/admin" element={<Page><Admin /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}