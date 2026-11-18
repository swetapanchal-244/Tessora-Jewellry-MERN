import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const PER_PAGE = 8;
const metals = ["All", "Diamond", "Silver"];
const types = ["All", "Ring", "Necklace", "Earrings", "Pendant", "Chain", "Bracelet", "Anklet"];
const sorts = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
];

const chip = (active) =>
    `px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] border transition ${active
        ? "bg-rosegold text-white border-rosegold"
        : "border-softgold/60 text-wine hover:bg-champagne"
    }`;

const pageBtn = (active) =>
    `w-10 h-10 rounded-full text-sm border transition ${active
        ? "bg-rosegold text-white border-rosegold"
        : "border-softgold/60 text-wine hover:bg-champagne"
    }`;

export default function Shop() {
    const [params, setParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const metal = params.get("metal") || "All";
    const [type, setType] = useState("All");
    const [sort, setSort] = useState("newest");
    const [search, setSearch] = useState("");

    // filter badalte hi page 1 pe wapas
    const setMetal = (m) => {
        setPage(1);
        setParams(m === "All" ? {} : { metal: m });
    };
    const changeType = (t) => { setPage(1); setType(t); };
    const changeSort = (s) => { setPage(1); setSort(s); };
    const changeSearch = (s) => { setPage(1); setSearch(s); };

    const goToPage = (p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        setLoading(true);
        let ignore = false; // purana (late aaya) response ignore karne ke liye

        const q = { page, limit: PER_PAGE, sort };
        if (metal !== "All") q.metal = metal;
        if (type !== "All") q.category = type;
        if (search.trim()) q.search = search.trim();

        const t = setTimeout(() => {
            api
                .get("/products", { params: q })
                .then((res) => {
                    if (ignore) return;
                    setProducts(res.data.products);
                    setPages(res.data.pages);
                    setTotal(res.data.total);
                })
                .catch(console.error)
                .finally(() => !ignore && setLoading(false));
        }, 300); // search ke liye thoda wait

        return () => {
            ignore = true;
            clearTimeout(t);
        };
    }, [metal, type, sort, search, page]);

    return (
        <>
            <section className="bg-gradient-to-br from-ivory via-champagne to-blush/70 pt-36 pb-14 text-center">
                <p className="text-xs tracking-[0.5em] text-rosegold uppercase">Tessora</p>
                <h1 className="font-display text-5xl md:text-6xl text-wine mt-3">Shop All Jewellery</h1>
                <div className="w-20 h-px bg-softgold mx-auto mt-5" />
            </section>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Filters */}
                <div className="bg-white border border-blush rounded-3xl p-6 space-y-5">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                        <input
                            value={search}
                            onChange={(e) => changeSearch(e.target.value)}
                            placeholder="Search jewellery..."
                            className="w-full md:w-80 px-5 py-3 rounded-full border border-blush outline-none focus:border-rosegold"
                        />
                        <select
                            value={sort}
                            onChange={(e) => changeSort(e.target.value)}
                            className="px-5 py-3 rounded-full border border-blush outline-none bg-white"
                        >
                            {sorts.map((s) => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs uppercase tracking-widest text-charcoal/50 self-center mr-2">Metal</span>
                        {metals.map((m) => (
                            <button key={m} onClick={() => setMetal(m)} className={chip(metal === m)}>{m}</button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs uppercase tracking-widest text-charcoal/50 self-center mr-2">Type</span>
                        {types.map((t) => (
                            <button key={t} onClick={() => changeType(t)} className={chip(type === t)}>{t}</button>
                        ))}
                    </div>
                </div>

                {/* Results */}
                <p className="mt-8 mb-6 text-sm text-charcoal/60">
                    {loading ? "Loading..." : `${total} products found`}
                </p>

                {!loading && products.length === 0 ? (
                    <p className="text-center py-20 text-charcoal/60">No products match your filters.</p>
                ) : (
                    <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((p, i) => (
                            <ProductCard key={p._id} product={p} index={i} />
                        ))}
                    </motion.div>
                )}

                {/* Pagination */}
                {pages > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-14">
                        <button
                            onClick={() => goToPage(page - 1)}
                            disabled={page === 1}
                            className="px-5 h-10 rounded-full text-xs uppercase tracking-widest border border-softgold/60 text-wine hover:bg-champagne transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Prev
                        </button>

                        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                            <button key={p} onClick={() => goToPage(p)} className={pageBtn(page === p)}>
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => goToPage(page + 1)}
                            disabled={page === pages}
                            className="px-5 h-10 rounded-full text-xs uppercase tracking-widest border border-softgold/60 text-wine hover:bg-champagne transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}