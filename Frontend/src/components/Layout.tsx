import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  User,
  X,
  Smartphone,
} from "lucide-react";
import NavSearch from "@/components/NavSearch";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import PurchaseNotificationToast from "@/components/PurchaseNotificationToast";
import WhatsAppButton from "@/components/WhatsAppButton";
import SocialLinks from "@/components/SocialLinks";
import { CONTACT } from "@/lib/contact";
import { useSettings } from "@/context/SettingsContext";
import {
  CollectionsMegaMenuRoot,
  CollectionsNavTrigger,
  CollectionsMegaMenuPanel,
  CollectionsMobileLinks,
} from "@/components/CollectionsMegaMenu";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "LOYALTY", path: "/loyalty" },
  { label: "CONTACT", path: "/contact" },
];

const footerCustomerCareLinks = [
  { label: "Contact Us", path: "/contact" },
  { label: "Shipping & Delivery", path: "/policies#shipping" },
  { label: "Return Policy", path: "/policies" },
  { label: "Warranty Policy", path: "/policies#warranty" },
  { label: "Policies & FAQ", path: "/policies" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const { user, logout } = useAuth();
  const { settings } = useSettings();
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);
  const isNavActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      {/* Top Announcement Bar from Site Settings */}
      {settings.announcement_enabled === "1" && settings.announcement_text && (
        <div className="bg-gray-950 text-white text-[11px] sm:text-xs font-semibold py-1.5 px-4 text-center tracking-wider transition-all z-50">
          {settings.announcement_link ? (
            <Link
              to={settings.announcement_link}
              className="hover:underline flex items-center justify-center gap-1.5"
            >
              <span>{settings.announcement_text}</span>
              <ChevronRight size={13} className="opacity-75 inline" />
            </Link>
          ) : (
            <span>{settings.announcement_text}</span>
          )}
        </div>
      )}

      {/* TOP NAVBAR — exactly like MicroTech */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="border-b border-gray-100">
          {/* CSS GRID: 3 equal columns — no overlap possible */}
          <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">

            {/* COL 1 LEFT: Hamburger (mobile) | Nav links (desktop) */}
            <div className="flex items-center gap-4">
              {/* Hamburger — mobile only */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-gray-700 flex-shrink-0"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>

              {/* Desktop nav — hidden on mobile */}
              <nav className="hidden lg:flex items-center gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`text-[11px] font-bold tracking-wider transition-colors whitespace-nowrap ${
                      isNavActive(link.path)
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {/* Collections dropdown — click to toggle */}
                <CollectionsMegaMenuRoot>
                  <CollectionsNavTrigger />
                  <CollectionsMegaMenuPanel />
                </CollectionsMegaMenuRoot>
                <Link
                  to="/policies"
                  className="flex items-center gap-0.5 text-[11px] font-bold tracking-wider text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
                >
                  POLICIES
                </Link>
              </nav>
            </div>

            {/* COL 2 CENTER: Logo — auto width, always centered */}
            <Link
              to="/"
              onClick={handleLogoClick}
              aria-label="A.I Mobile Accessories home"
              className="flex items-center justify-center gap-2"
            >
              <img
                src="/logo.jpg"
                alt="A.I Accessories"
                className="h-9 w-9 shrink-0 rounded-full object-cover shadow-sm ring-1 ring-gray-200"
              />
              <div className="leading-tight">
                <p className="font-display text-sm sm:text-base font-black tracking-tight text-gray-900 leading-none whitespace-nowrap">
                  A.I ACCESSORIES
                </p>
                <p className="text-[8px] font-medium uppercase tracking-widest text-gray-400 mt-0.5 whitespace-nowrap hidden sm:block">
                  Mobile Accessories & More
                </p>
              </div>
            </Link>

            {/* COL 3 RIGHT: Icons */}
            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <NavSearch className="inline-flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors" />

              {/* Social — desktop only, small */}
              <a
                href={CONTACT.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hidden xl:flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 text-gray-500 hover:border-gray-300 hover:text-gray-800 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
                </svg>
              </a>
              <a
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hidden xl:flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 text-gray-500 hover:border-pink-300 hover:text-pink-500 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={14} height={14}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              <Link
                to="/favorites"
                className="relative hidden text-gray-600 hover:text-gray-900 transition-colors md:inline-flex"
                aria-label="Favorites"
              >
                <Heart size={20} />
                {totalFavorites > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
                    {totalFavorites}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Link>

              {user ? (
                <Link
                  to="/account"
                  aria-label="Account"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LayoutDashboard size={20} />
                </Link>
              ) : (
                <Link
                  to="/login"
                  aria-label="Login"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <User size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={closeMobileMenu}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[min(300px,85vw)] flex-col bg-white shadow-2xl lg:hidden"
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <img
                    src="/logo.jpg"
                    alt="A.I Accessories"
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-gray-200"
                  />
                  <div>
                    <p className="font-display text-sm font-black text-gray-900 leading-none">A.I ACCESSORIES</p>
                    <p className="text-[9px] text-gray-400 tracking-widest uppercase mt-0.5">Mobile Accessories</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-1 flex-col overflow-y-auto">
                {/* Search */}
                <div className="px-5 py-4 border-b border-gray-100">
                  <NavSearch className="inline-flex" onNavigate={closeMobileMenu} />
                </div>

                {/* Cart & Favorites */}
                <div className="grid grid-cols-2 gap-2 px-4 py-3 border-b border-gray-100">
                  <Link to="/cart" onClick={closeMobileMenu}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
                    <ShoppingBag size={16} className="text-gray-500" />
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Cart</p>
                      <p className="text-[10px] text-gray-500">{totalItems > 0 ? `${totalItems} items` : "Empty"}</p>
                    </div>
                  </Link>
                  <Link to="/favorites" onClick={closeMobileMenu}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
                    <Heart size={16} className="text-gray-500" />
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Saved</p>
                      <p className="text-[10px] text-gray-500">{totalFavorites > 0 ? `${totalFavorites}` : "None"}</p>
                    </div>
                  </Link>
                </div>

                {/* Nav links */}
                <nav className="px-3 py-3">
                  <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Menu</p>
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold tracking-wide transition-colors ${
                        isNavActive(link.path)
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {link.label}
                      <ChevronRight size={15} className="text-gray-400" />
                    </Link>
                  ))}

                  {/* Collections with image grid */}
                  <div className="rounded-lg px-3 py-3">
                    <CollectionsMobileLinks onNavigate={closeMobileMenu} />
                  </div>

                  <Link
                    to="/policies"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold tracking-wide text-gray-700 hover:bg-gray-50"
                  >
                    POLICIES
                    <ChevronRight size={15} className="text-gray-400" />
                  </Link>
                </nav>

                {/* Account */}
                <div className="border-t border-gray-100 px-3 py-3">
                  <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Account</p>
                  {user ? (
                    <div className="space-y-1">
                      <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5">
                        <p className="text-[10px] text-gray-400">Signed in as</p>
                        <p className="truncate text-sm font-semibold text-gray-800">{user.name}</p>
                      </div>
                      <Link to="/account" onClick={closeMobileMenu}
                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <LayoutDashboard size={15} /> Dashboard
                      </Link>
                      <button type="button" onClick={() => { logout(); closeMobileMenu(); }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Link to="/login" onClick={closeMobileMenu}
                        className="rounded-lg border border-gray-200 px-3 py-2.5 text-center text-xs font-semibold text-gray-700 hover:bg-gray-50">
                        Login
                      </Link>
                      <Link to="/signup" onClick={closeMobileMenu}
                        className="rounded-lg bg-gray-900 px-3 py-2.5 text-center text-xs font-bold text-white hover:bg-gray-800">
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-5 py-4">
                <a href={CONTACT.whatsapp.url} target="_blank" rel="noopener noreferrer"
                  className="mb-3 flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-xs font-bold text-white">
                  <MessageCircle size={15} /> Chat on WhatsApp
                </a>
                <SocialLinks className="justify-center" size="sm" variant="colored" />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-x-hidden">{children}</main>

      <PurchaseNotificationToast />
      <WhatsAppButton />

      {/* FOOTER — clean & minimal */}
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/logo.jpg"
                  alt="A.I Accessories"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-700"
                />
                <div>
                  <p className="font-display text-lg font-black leading-none text-white">A.I ACCESSORIES</p>
                  <p className="text-[9px] font-medium uppercase tracking-widest text-gray-400 mt-0.5">
                    Mobile Accessories & More
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Quality Products • Honest Service • Customer Satisfaction
              </p>
              <SocialLinks variant="default" size="md" />
              <a href={CONTACT.email.mailto}
                className="mt-3 inline-block text-sm text-gray-400 hover:text-white transition-colors">
                {CONTACT.email.address}
              </a>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-5">Products</h4>
              <div className="flex flex-col gap-2.5">
                {["Phone Covers", "Chargers & Cables", "Earbuds & Headphones", "Power Banks", "Screen Protectors"].map((l) => (
                  <Link key={l} to="/products"
                    className="text-sm text-gray-400 hover:text-white transition-colors">{l}</Link>
                ))}
              </div>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-5">Customer Care</h4>
              <div className="flex flex-col gap-2.5">
                {footerCustomerCareLinks.map(({ label, path }) => (
                  <Link key={label} to={path}
                    className="text-sm text-gray-400 hover:text-white transition-colors">{label}</Link>
                ))}
                <a href={CONTACT.whatsapp.url} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors">
                  WhatsApp: {CONTACT.whatsapp.display}
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-5">Stay Updated</h4>
              <p className="text-sm text-gray-400 mb-4">Get the latest deals and new arrivals.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-l-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
                <button className="rounded-r-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors">
                  Join
                </button>
              </div>

              <div className="mt-5 flex gap-4">
                <a href={CONTACT.social.tiktok} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-white transition-colors">🎵 TikTok</a>
                <a href={CONTACT.social.instagram} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-white transition-colors">📷 Instagram</a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">© 2026 A.I Mobile Accessories. All rights reserved.</p>
            <p className="text-xs text-gray-500">Quality Products • Honest Service • Customer Satisfaction</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
