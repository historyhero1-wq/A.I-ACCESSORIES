import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Shield, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductUrl } from "@/lib/product-url";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <ShoppingBag size={36} className="text-gray-400" />
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-xs">
          Looks like you haven't added any items yet. Explore our mobile accessories collection!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-none bg-gray-900 text-white font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <nav className="mb-2 text-xs text-gray-400 flex items-center gap-1.5">
            <Link to="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">Cart</span>
          </nav>
          <h1 className="font-display text-3xl font-black text-gray-900">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} item{items.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* LEFT — Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor?.hex ?? "default"}`}
                className="flex gap-4 sm:gap-5 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm"
              >
                {/* Product image */}
                <Link
                  to={getProductUrl(item.product)}
                  className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-gray-50 border border-gray-100"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link to={getProductUrl(item.product)}>
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug hover:text-blue-600 transition-colors line-clamp-2">
                          {item.product.name}
                        </h3>
                      </Link>
                      {item.selectedColor ? (
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                          <span
                            className="inline-block h-3 w-3 rounded-full border border-gray-200"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-500 mt-1">{item.product.material}</p>
                      )}

                      {/* Price — mobile */}
                      <div className="mt-2 sm:hidden">
                        {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                          <span className="text-xs text-gray-400 line-through mr-1.5">
                            Rs. {item.product.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-sm font-bold text-gray-900">
                          Rs. {item.product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Bottom row */}
                  <div className="mt-3 flex items-center justify-between">
                    {/* Qty controls */}
                    <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                        className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-sm font-semibold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                        className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price — desktop */}
                    <div className="hidden sm:block text-right">
                      {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                        <p className="text-xs text-gray-400 line-through">
                          Rs. {(item.product.originalPrice * item.quantity).toLocaleString()}
                        </p>
                      )}
                      <p className="text-base font-bold text-gray-900">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50">
                  <Truck size={15} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">Free Delivery</p>
                  <p className="text-[10px] text-gray-400">All across Pakistan</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <Shield size={15} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">100% Genuine</p>
                  <p className="text-[10px] text-gray-400">Original products only</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="h-fit">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-5 pb-4 border-b border-gray-100">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div
                    key={`sum-${item.product.id}`}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-xs text-gray-500 line-clamp-1 flex-1">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-xs font-medium text-gray-800 shrink-0">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 border-t border-gray-100 pt-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-gray-100 pt-4 mb-6">
                <span className="text-sm font-bold uppercase tracking-wider text-gray-900">Total</span>
                <span className="font-display text-xl font-black text-gray-900">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>

              <Link
                to="/checkout"
                className="block w-full text-center rounded-none bg-gray-900 text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors mb-3"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/products"
                className="block text-center text-xs text-gray-500 hover:text-gray-800 transition-colors font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Accepted payment note */}
            <div className="mt-4 rounded-xl bg-gray-50 border border-gray-100 p-4 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">We Accept</p>
              <div className="flex justify-center gap-3 text-xs text-gray-500 font-medium">
                <span>💵 Cash on Delivery</span>
                <span>🏦 Bank Transfer</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
