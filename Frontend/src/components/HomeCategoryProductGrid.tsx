import { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";
import type { Product } from "@/data/products";

type HomeCategoryProductGridProps = {
  title: string;
  categoryName: string;
  products: Product[];
  isLoading?: boolean;
};

const DISPLAY_COUNT = 8;

const mobileSlideClass =
  "w-[42vw] max-w-[175px] shrink-0 snap-start sm:w-[36vw] sm:max-w-[185px]";

const HomeCategoryProductGrid = ({
  title,
  categoryName,
  products,
  isLoading = false,
}: HomeCategoryProductGridProps) => {
  const displayProducts = products.slice(0, DISPLAY_COUNT);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = isLoading ? DISPLAY_COUNT : displayProducts.length;

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const firstSlide = el.querySelector<HTMLElement>("[data-product-slide]");
    if (!firstSlide) return;
    const step = firstSlide.offsetWidth + 10;
    if (step <= 0) return;
    const index = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(index, slideCount - 1)));
  }, [slideCount]);

  const scrollToSlide = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>(`[data-product-slide="${index}"]`);
    if (!slide) return;
    el.scrollTo({ left: slide.offsetLeft - 12, behavior: "smooth" });
    setActiveIndex(index);
  };

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 200;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const mobileSlider = isLoading
    ? [...Array(DISPLAY_COUNT)].map((_, i) => (
        <div key={i} data-product-slide={i} className={mobileSlideClass}>
          <ProductCardSkeleton compact />
        </div>
      ))
    : displayProducts.map((product, i) => (
        <div key={product.id} data-product-slide={i} className={mobileSlideClass}>
          <ProductCard product={product} index={i} compact />
        </div>
      ));

  const desktopGrid = isLoading
    ? [...Array(DISPLAY_COUNT)].map((_, i) => <ProductCardSkeleton key={i} compact />)
    : displayProducts.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} compact />
      ));

  return (
    <section className="w-full min-w-0 overflow-x-clip py-8 md:py-10">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-5 flex items-center justify-between px-4 sm:px-5 lg:px-6"
      >
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-black text-gray-900">{title}</h2>
          <div className="mt-1 h-[3px] w-10 rounded-full bg-blue-600" />
        </div>
        {!isLoading && displayProducts.length > 0 && (
          <Link
            to="/products"
            state={{ category: categoryName }}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View all <ArrowRight size={13} />
          </Link>
        )}
      </motion.div>

      <div className="w-full px-2 sm:px-3 lg:px-4">
        {isLoading || displayProducts.length > 0 ? (
          <>
            {/* MOBILE — horizontal scroll */}
            <div className="relative min-w-0 lg:hidden">
              <div
                ref={scrollRef}
                onScroll={updateActiveIndex}
                className="-mx-1 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex w-max gap-2.5 px-2">{mobileSlider}</div>
              </div>

              {/* Scroll arrows — mobile */}
              {slideCount > 2 && (
                <>
                  <button
                    onClick={() => scrollBy("left")}
                    className="absolute -left-1 top-1/3 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md text-gray-500 hover:text-gray-900 z-10"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => scrollBy("right")}
                    className="absolute -right-1 top-1/3 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md text-gray-500 hover:text-gray-900 z-10"
                  >
                    <ChevronRight size={14} />
                  </button>
                </>
              )}

              {/* Dots */}
              {slideCount > 0 && (
                <div className="mt-3 flex justify-center gap-1.5">
                  {[...Array(slideCount)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => scrollToSlide(i)}
                      className="rounded-full transition-all duration-400"
                      style={{
                        width: i === activeIndex ? "24px" : "6px",
                        height: "6px",
                        background: i === activeIndex ? "#2563eb" : "#d1d5db",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* DESKTOP — grid */}
            <div className="hidden w-full gap-3 lg:grid lg:grid-cols-5">
              {desktopGrid}
            </div>
          </>
        ) : (
          <p className="py-12 text-center text-sm text-gray-400">
            No products in this category yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default HomeCategoryProductGrid;
