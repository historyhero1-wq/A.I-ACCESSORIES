import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Grid2X2, ArrowRight } from "lucide-react";
import { useMegaMenuCategories } from "@/hooks/useMegaMenuCategories";
import { cn } from "@/lib/utils";

/* ─── Context ──────────────────────────────────────────────── */

type CollectionsMenuContextValue = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

const CollectionsMenuContext = createContext<CollectionsMenuContextValue | null>(null);

function useCollectionsMenu() {
  const ctx = useContext(CollectionsMenuContext);
  if (!ctx) throw new Error("Must be used within CollectionsMegaMenuRoot");
  return ctx;
}

export function CollectionsMegaMenuRoot({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  // close when clicking outside
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <CollectionsMenuContext.Provider value={{ open, toggle, close }}>
      <div ref={rootRef} className="relative hidden lg:block">
        {children}
      </div>
    </CollectionsMenuContext.Provider>
  );
}

/* ─── Desktop Nav Trigger ───────────────────────────────────── */

export function CollectionsNavTrigger() {
  const { open, toggle } = useCollectionsMenu();

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "nav-link inline-flex items-center gap-1.5 border-0 bg-transparent p-0 transition-colors",
        open ? "text-foreground" : "text-foreground/80 hover:text-foreground"
      )}
      aria-expanded={open}
      aria-haspopup="true"
    >
      Collections
      {open ? (
        <ChevronUp size={14} className="text-foreground/60 transition-transform" />
      ) : (
        <ChevronDown size={14} className="text-foreground/60 transition-transform" />
      )}
    </button>
  );
}

/* ─── Desktop Mega Panel ────────────────────────────────────── */

export function CollectionsMegaMenuPanel() {
  const { open, close } = useCollectionsMenu();
  const { categories, isLoading } = useMegaMenuCategories();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 right-0 top-full z-50 border-b border-border bg-white shadow-xl"
          style={{ minWidth: "680px", left: "-100px" }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              <Grid2X2 size={13} />
              All Categories
            </div>
            <Link
              to="/products"
              onClick={close}
              className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All Products <ArrowRight size={12} />
            </Link>
          </div>

          {/* Category grid with images */}
          <div className="px-6 py-5">
            {isLoading ? (
              <div className="grid grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                  <div key={`sk-${i}`} className="flex flex-col gap-2">
                    <div className="aspect-square w-full animate-pulse rounded-xl bg-gray-100" />
                    <div className="h-3 w-3/4 animate-pulse rounded bg-gray-100" />
                  </div>
                ))}
              </div>
            ) : categories.length > 0 ? (
              <div className="grid grid-cols-5 gap-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to="/products"
                    state={{ category: cat.name }}
                    onClick={close}
                    className="group flex flex-col gap-2"
                  >
                    {/* Image box */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50 transition-all duration-200 group-hover:border-blue-300 group-hover:shadow-md">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-2xl font-black text-gray-300">
                            {cat.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-blue-600/0 transition-colors duration-200 group-hover:bg-blue-600/10 rounded-xl" />
                    </div>
                    {/* Category name */}
                    <span className="text-center text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors leading-snug">
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-gray-400">
                No categories available.
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Mobile Links (in drawer) ──────────────────────────────── */

export function CollectionsMobileLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { categories, isLoading } = useMegaMenuCategories();
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between font-nav text-lg tracking-wide uppercase text-foreground/80 py-1"
      >
        Collections
        {expanded ? (
          <ChevronUp size={18} className="opacity-60 transition-transform" />
        ) : (
          <ChevronDown size={18} className="opacity-60 transition-transform" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            {/* Mobile: show categories as image grid */}
            <div className="mt-3 mb-1">
              <Link
                to="/products"
                onClick={onNavigate}
                className="mb-3 block rounded-lg bg-gray-900 px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white"
              >
                All Products →
              </Link>

              {isLoading ? (
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-100" />
                      <div className="h-2.5 w-3/4 mx-auto animate-pulse rounded bg-gray-100" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to="/products"
                      state={{ category: cat.name }}
                      onClick={onNavigate}
                      className="group flex flex-col gap-1.5"
                    >
                      <div className="aspect-square w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-50 group-hover:border-blue-300 transition-all">
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="text-lg font-black text-gray-300">
                              {cat.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-center text-[10px] font-semibold text-gray-600 group-hover:text-blue-600 transition-colors leading-tight">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
