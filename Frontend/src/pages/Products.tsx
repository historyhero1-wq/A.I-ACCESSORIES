import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, Search, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";
import { trackGASearch } from "@/lib/google-analytics";

const Products = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // category can come from ?category= URL param OR from navigation state
  const searchQuery = (searchParams.get("q") ?? "").trim();
  const categoryFromUrl = searchParams.get("category") ?? "";
  const categoryFromNav = (location.state as { category?: string } | null)?.category ?? "";

  // prefer URL param, then navigation state, then default to "All"
  const initialCategory = categoryFromUrl || categoryFromNav || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const { products, categories, isLoading, error } = useProducts();

  // sync whenever URL param changes (e.g. browser back/forward)
  useEffect(() => {
    const cat = searchParams.get("category") ?? "";
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  // when navigating via state (from home page category cards)
  useEffect(() => {
    if (categoryFromNav) {
      setActiveCategory(categoryFromNav);
    }
  }, [categoryFromNav]);

  useEffect(() => {
    if (searchQuery) {
      trackGASearch(searchQuery);
    }
  }, [searchQuery]);

  // update URL ?category= when user clicks a filter tab
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filtered = useMemo(() => {
    const byCategory =
      activeCategory === "All"
        ? products
        : products.filter((product) =>
            (product.categories ?? [product.category]).some(
              (c) => c.toLowerCase() === activeCategory.toLowerCase()
            )
          );

    if (!searchQuery) return byCategory;

    const term = searchQuery.toLowerCase();
    return byCategory.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.categories ?? [p.category]).some((category) =>
          category.toLowerCase().includes(term)
        ) ||
        (p.description?.toLowerCase().includes(term) ?? false) ||
        (p.shortDescription?.toLowerCase().includes(term) ?? false)
    );
  }, [products, activeCategory, searchQuery]);

  const pageTitle = searchQuery
    ? <>Search: <span className="text-blue-600">"{searchQuery}"</span></>
    : activeCategory === "All"
    ? "All Products"
    : activeCategory;

  return (
    <div className="min-h-screen bg-white">
      {/* PAGE HEADER */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
              {activeCategory === "All" ? "Our Collections" : "Category"}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3">
              {pageTitle}
            </h1>
            {filtered.length > 0 && !isLoading && (
              <p className="text-sm text-gray-400">
                Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* FILTER TABS — pill style */}
      <div className="sticky top-[57px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
            <span className="shrink-0 text-gray-400 mr-1">
              <SlidersHorizontal size={14} />
            </span>
            {isLoading ? (
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-gray-100" />
                ))}
              </div>
            ) : (
              categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-gray-900 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {cat}
                </button>
              ))
            )}
            {activeCategory !== "All" && (
              <button
                onClick={() => handleCategoryChange("All")}
                className="shrink-0 ml-1 flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={11} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-8 md:py-10">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[...Array(10)].map((_, i) => (
              <ProductCardSkeleton key={i} compact />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <X size={24} className="text-red-400" />
            </div>
            <p className="text-sm font-semibold text-gray-700">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-base font-bold text-gray-700 mb-1">No Products Found</h3>
            <p className="text-sm text-gray-400">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : `No products in "${activeCategory}" category yet.`}
            </p>
            <button
              onClick={() => handleCategoryChange("All")}
              className="mt-6 rounded-full bg-gray-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-gray-800 transition-colors"
            >
              View All Products
            </button>
          </div>
        ) : (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} compact />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;

