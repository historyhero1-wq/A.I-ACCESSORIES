import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Charger ekdum original hai, sasti price mein mila. Delivery 3 din mein aa gayi. Bohot khush hoon!",
    name: "Bilal Ahmed",
    city: "Lahore",
    rating: 5,
    product: "Fast Charger",
  },
  {
    quote: "Phone cover bilkul fit hai, quality zabardast. iPhone 15 ke liye perfect. Again order karunga.",
    name: "Fatima Raza",
    city: "Karachi",
    rating: 5,
    product: "Phone Cover",
  },
  {
    quote: "Earbuds ka sound quality surprising thi is price mein. Mic bhi clear hai. 100% recommended!",
    name: "Usman Khan",
    city: "Islamabad",
    rating: 5,
    product: "Earbuds",
  },
  {
    quote: "WhatsApp pe quickly respond kiya, order confirm hua. Delivery fast thi. Trusted seller hai!",
    name: "Ayesha Malik",
    city: "Faisalabad",
    rating: 5,
    product: "USB Cable",
  },
  {
    quote: "Power bank genuine nikla, charge hold karta hai properly. Packing bhi achi thi. 5 star!",
    name: "Hassan Ali",
    city: "Multan",
    rating: 5,
    product: "Power Bank",
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % testimonials.length),
      4500
    );
    return () => clearInterval(timer);
  }, [isPaused]);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const active = testimonials[current];

  return (
    <section
      className="py-16 sm:py-20"
      style={{ background: "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">
            Customer Reviews
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900">
            What Our Customers Say
          </h2>
        </motion.div>

        {/* Review card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative bg-white rounded-3xl shadow-sm border border-gray-100 px-8 sm:px-12 py-10 mx-2"
            >
              {/* Quote icon */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 shadow-lg">
                <Quote size={18} className="text-white" />
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                "{active.quote}"
              </blockquote>

              {/* Author */}
              <div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold text-sm">
                    {active.name.charAt(0)}
                  </span>
                </div>
                <p className="font-bold text-sm text-gray-900">{active.name}</p>
                <p className="text-xs text-gray-400">{active.city} · {active.product}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrow buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm text-gray-500 hover:text-gray-900 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm text-gray-500 hover:text-gray-900 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
                background: i === current ? "#2563eb" : "#d1d5db",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
