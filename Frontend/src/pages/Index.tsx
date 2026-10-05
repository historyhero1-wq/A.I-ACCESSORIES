import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSlider from "@/components/HeroSlider";
import HomeCategoryProductGrid from "@/components/HomeCategoryProductGrid";
import TestimonialSlider from "@/components/TestimonialSlider";
import { useHomeCategorySections } from "@/hooks/useHomeCategorySections";
import { useStoreCategories } from "@/hooks/useStoreCategories";
import { CONTACT } from "@/lib/contact";
import { ArrowRight, Shield, Truck, RotateCcw, Star } from "lucide-react";

// MicroTech-style categories with REAL images
const categoryItems = [
  {
    title: "Under 999",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&q=80",
  },
  {
    title: "Smart Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
  },
  {
    title: "Chargers",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&q=80",
  },
  {
    title: "Earbuds",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&q=80",
  },
  {
    title: "Phone Covers",
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=200&q=80",
  },
  {
    title: "Cables",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=80",
  },
  {
    title: "Power Banks",
    image: "https://images.unsplash.com/photo-1609592424216-2ea3f4e14cd9?w=200&q=80",
  },
  {
    title: "Screen Guard",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80",
  },
  {
    title: "Under 1499",
    image: "https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=200&q=80",
  },
  {
    title: "Hands-free",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&q=80",
  },
  {
    title: "Under 2999",
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=200&q=80",
  },
  {
    title: "All Tech",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200&q=80",
  },
];

const loopItems = [...categoryItems, ...categoryItems, ...categoryItems];

const features = [
  { icon: <Shield size={20} />, title: "100% Genuine", desc: "Original products only", color: "bg-green-50 text-green-600" },
  { icon: <Truck size={20} />, title: "Fast Delivery", desc: "Across Pakistan", color: "bg-blue-50 text-blue-600" },
  { icon: <RotateCcw size={20} />, title: "Easy Returns", desc: "24-hour policy", color: "bg-orange-50 text-orange-600" },
  { icon: <Star size={20} />, title: "Best Prices", desc: "Unbeatable deals", color: "bg-purple-50 text-purple-600" },
];

const Index = () => {
  const { sections: homeSections, isLoading: homeSectionsLoading } = useHomeCategorySections();
  const { categories: shopCategories } = useStoreCategories(20);

  const displayCategories =
    shopCategories && shopCategories.length > 0
      ? shopCategories.map((c) => ({
          title: c.name,
          slug: c.slug,
          image:
            c.image ||
            "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&q=80",
        }))
      : categoryItems;

  const loopItems = [
    ...displayCategories,
    ...displayCategories,
    ...displayCategories,
  ];

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* CATEGORY CIRCLES — connected to Admin categories with real images */}
      <section className="border-b border-gray-100 bg-white overflow-hidden">
        <div className="overflow-x-hidden py-6 sm:py-8">
          <div
            className="category-marquee flex w-max items-end gap-5 sm:gap-7 px-4"
            style={{ willChange: "transform" }}
          >
            {loopItems.map((cat, i) => {
              const catSlug = cat.slug || cat.title.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link
                  key={`${cat.title}-${i}`}
                  to={`/products?category=${encodeURIComponent(catSlug)}`}
                  className="group flex w-20 sm:w-24 shrink-0 flex-col items-center gap-2 text-center"
                >
                  {/* Circle image */}
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full border-2 border-transparent bg-gray-100 transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-lg group-hover:scale-105">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors leading-tight">
                    {cat.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-gray-100 bg-gray-50 py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-xl bg-white p-3 sm:p-4 shadow-sm border border-gray-100"
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${f.color}`}>
                  {f.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900">{f.title}</p>
                  <p className="text-[10px] text-gray-400 truncate">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SECTIONS (from backend — existing data stays) */}
      <div className="w-full min-w-0 overflow-x-clip divide-y divide-gray-100">
        {homeSectionsLoading ? (
          <HomeCategoryProductGrid title="Loading..." categoryName="" products={[]} isLoading />
        ) : (
          homeSections.map((section) => (
            <HomeCategoryProductGrid
              key={section.id}
              title={section.name}
              categoryName={section.name}
              products={section.products}
            />
          ))
        )}
      </div>

      {/* SHOP BY CATEGORY */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Browse All</p>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900">Shop by Category</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {shopCategoriesLoading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-200" />
              ))
            ) : shopCategories.length > 0 ? (
              shopCategories.map((cat, i) => {
                const catImages = categoryItems.find(c =>
                  c.title.toLowerCase().includes(cat.name.toLowerCase().split(" ")[0]) ||
                  cat.name.toLowerCase().includes(c.title.toLowerCase().split(" ")[0])
                );
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      to="/products"
                      state={{ category: cat.name }}
                      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white aspect-square flex flex-col items-center justify-center p-4 text-center transition-all duration-300 hover:border-blue-300 hover:shadow-md"
                    >
                      {catImages && (
                        <div className="absolute inset-0 overflow-hidden">
                          <img
                            src={catImages.image}
                            alt={cat.name}
                            className="h-full w-full object-cover opacity-10 group-hover:opacity-15 transition-opacity duration-300"
                          />
                        </div>
                      )}
                      <div className="relative z-10">
                        <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-snug">
                          {cat.name}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1 group-hover:text-blue-400 transition-colors">
                          Explore →
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <p className="col-span-full py-8 text-center text-sm text-gray-400">
                No categories found. Add categories in admin panel.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialSlider />

      {/* CTA SECTION */}
      <section className="bg-gray-900 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              A.I Mobile Accessories
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-4">
              Quality Products.{" "}
              <span className="text-blue-400">Honest Service.</span>
            </h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto mb-8">
              All mobile accessories for every brand — iPhone, Samsung, Vivo, Oppo, Tecno & more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-xs font-bold tracking-widest text-gray-900 uppercase hover:bg-gray-100 transition-colors"
              >
                SHOP ALL PRODUCTS <ArrowRight size={14} />
              </Link>
              <a
                href={CONTACT.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gray-600 px-8 py-4 text-xs font-bold tracking-widest text-gray-300 uppercase hover:border-gray-400 hover:text-white transition-all"
              >
                💬 WHATSAPP US
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
