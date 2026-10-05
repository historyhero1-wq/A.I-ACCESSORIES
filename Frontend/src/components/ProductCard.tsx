import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { getProductUrl } from "@/lib/product-url";
import { useFavorites } from "@/context/FavoritesContext";
import { FavoriteHeartButton } from "@/components/FavoriteHeartButton";

const ProductCard = ({
  product,
  index = 0,
  compact = false,
}: {
  product: Product;
  index?: number;
  compact?: boolean;
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.id);
  const rating = Number(product.rating ?? 5);
  const reviewCount = product.reviewCount ?? 17;
  const roundedRating = Math.round(rating);
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
      className="group w-full min-w-0 overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-gray-50">
        {/* Discount badge */}
        {product.isSoldOut || !product.inStock ? (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-gray-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
            {product.isSoldOut ? "Sold Out" : "Out of Stock"}
          </span>
        ) : discountPercent != null ? (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
            -{discountPercent}%
          </span>
        ) : null}

        {/* Favorite button */}
        <FavoriteHeartButton
          favorited={favorited}
          onToggle={() => toggleFavorite(product)}
          size={14}
          className={cn(
            "absolute right-2.5 top-2.5 z-10 h-8 w-8 rounded-full border bg-white/90 backdrop-blur-sm shadow-sm transition-all",
            favorited
              ? "border-red-200 text-red-500"
              : "border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500"
          )}
        />

        {/* Product image */}
        <Link to={getProductUrl(product)} className="block">
          <div
            className={cn(
              "flex w-full items-center justify-center overflow-hidden bg-gray-50",
              compact ? "aspect-square" : "aspect-[4/3]"
            )}
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-108"
              style={{ transform: "scale(1)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            />
          </div>
        </Link>
      </div>

      {/* Info area */}
      <div className="p-3 sm:p-3.5">
        <Link to={getProductUrl(product)}>
          {/* Product name */}
          <h3
            className={cn(
              "font-semibold leading-snug text-gray-900 hover:text-blue-600 transition-colors",
              compact
                ? "mb-1.5 line-clamp-2 text-xs sm:text-sm"
                : "mb-2 text-base sm:text-lg"
            )}
          >
            {product.name}
          </h3>

          {/* Star rating */}
          {reviewCount > 0 && (
            <div className={cn("flex items-center gap-1", compact ? "mb-1.5" : "mb-2")}>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={compact ? 10 : 12}
                    className={
                      i < roundedRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-200 fill-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-400">
                {rating.toFixed(1)} ({reviewCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={cn(
                "font-bold text-gray-900",
                compact ? "text-sm" : "text-base sm:text-lg"
              )}
            >
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span
                className={cn(
                  "text-gray-400 line-through",
                  compact ? "text-xs" : "text-sm"
                )}
              >
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
