import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { resolveProductImageUrl } from "@/services/api";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

interface Banner {
  id: number;
  label: string;
  title: string;
  title_line2: string;
  subtitle: string;
  subtitle_highlight: string;
  primary_btn_text: string;
  primary_btn_link: string;
  secondary_btn_text: string;
  secondary_btn_link: string;
  image_url: string;
  bg_color: string;
  sort_order: number;
  is_active: number;
}

// Fallback slides used when API is unavailable
const FALLBACK_SLIDES: Banner[] = [
  {
    id: 1,
    label: "A.I MOBILE ACCESSORIES",
    title: "Premium Mobile",
    title_line2: "Accessories",
    subtitle: "Chargers, covers, cables, earbuds & more —",
    subtitle_highlight: "best quality at unbeatable prices.",
    primary_btn_text: "SHOP NOW",
    primary_btn_link: "/products",
    secondary_btn_text: "VIEW ALL",
    secondary_btn_link: "/products",
    image_url: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80",
    bg_color: "#f8f9fa",
    sort_order: 1,
    is_active: 1,
  },
  {
    id: 2,
    label: "FAST CHARGING COLLECTION",
    title: "Power Up",
    title_line2: "Faster Than Ever",
    subtitle: "High-speed chargers & cables —",
    subtitle_highlight: "compatible with all iPhone and Android devices.",
    primary_btn_text: "SHOP NOW",
    primary_btn_link: "/products",
    secondary_btn_text: "EXPLORE",
    secondary_btn_link: "/products",
    image_url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    bg_color: "#f0f4ff",
    sort_order: 2,
    is_active: 1,
  },
  {
    id: 3,
    label: "PHONE PROTECTION",
    title: "Protect Your",
    title_line2: "Phone In Style",
    subtitle: "Premium covers & screen guards —",
    subtitle_highlight: "for iPhone, Samsung, Vivo, Oppo & all brands.",
    primary_btn_text: "SHOP NOW",
    primary_btn_link: "/products",
    secondary_btn_text: "EXPLORE",
    secondary_btn_link: "/products",
    image_url: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80",
    bg_color: "#f8f9fa",
    sort_order: 3,
    is_active: 1,
  },
  {
    id: 4,
    label: "TRUE WIRELESS EARBUDS",
    title: "Sound Like",
    title_line2: "Never Before",
    subtitle: "Premium earbuds & hands-free —",
    subtitle_highlight: "crystal clear sound with deep bass.",
    primary_btn_text: "SHOP NOW",
    primary_btn_link: "/products",
    secondary_btn_text: "VIEW ALL",
    secondary_btn_link: "/products",
    image_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    bg_color: "#fff8f0",
    sort_order: 4,
    is_active: 1,
  },
];

const HeroSlider = () => {
  const [slides, setSlides] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch banners from API
  useEffect(() => {
    fetch(`${API_BASE}/index.php?path=banners&active=1`)
      .then((r) => r.json())
      .then((data: Banner[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setSlides(data);
        } else {
          setSlides(FALLBACK_SLIDES);
        }
      })
      .catch(() => setSlides(FALLBACK_SLIDES));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, slides.length]);

  if (slides.length === 0) {
    return (
      <section className="flex min-h-[460px] items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </section>
    );
  }

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "460px", height: "auto", background: slide.bg_color, transition: "background 0.5s ease" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex min-h-[460px] items-center justify-between">

          {/* LEFT — Text Content */}
          <div className="flex-1 py-12 pr-6 lg:pr-16 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current}`}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  {slide.label}
                </p>

                <h1
                  className="font-display font-black leading-tight text-gray-900 mb-5"
                  style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)" }}
                >
                  {slide.title}
                  <br />
                  {slide.title_line2}
                </h1>

                <p className="mb-8 text-sm sm:text-base leading-relaxed text-gray-500 max-w-sm">
                  {slide.subtitle}{" "}
                  <span className="text-blue-600 font-medium">{slide.subtitle_highlight}</span>
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to={slide.primary_btn_link}
                    className="inline-flex items-center bg-gray-900 text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-200"
                  >
                    {slide.primary_btn_text}
                  </Link>
                  <Link
                    to={slide.secondary_btn_link}
                    className="inline-flex items-center gap-2 border border-gray-300 bg-white text-gray-700 px-7 py-3.5 text-xs font-bold tracking-widest uppercase hover:border-gray-800 hover:text-gray-900 transition-all duration-200"
                  >
                    <Search size={12} />
                    {slide.secondary_btn_text}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — Product Image */}
          <div className="hidden md:flex flex-1 items-center justify-center py-8 pl-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${current}`}
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-8 blur-xl opacity-20 rounded-full"
                  style={{ background: "#000" }}
                />
                <img
                  src={resolveProductImageUrl(slide.image_url)}
                  alt={slide.title_line2}
                  className="relative z-10 h-64 w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96 object-contain drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.15))",
                    animation: "float-bob 4s ease-in-out infinite",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-400"
            style={{
              width: i === current ? "32px" : "8px",
              height: "4px",
              background: i === current ? "#111" : "#d1d5db",
            }}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:shadow-md hover:text-gray-900 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:shadow-md hover:text-gray-900 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </section>
  );
};

export default HeroSlider;
