import { useState } from "react";
import { Link } from "react-router-dom";
import { ImageIcon } from "lucide-react";

type BannerSlot = {
  id: string;
  label: string;
  href: string;
  imageSrc: string;
  width: number;
  height: number;
};

const TOP_BANNERS: BannerSlot[] = [
  {
    id: "top-fast-chargers",
    label: "Super Fast Chargers & 65W GaN Adapters",
    href: "/products",
    imageSrc: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80",
    width: 1200,
    height: 600,
  },
  {
    id: "top-premium-covers",
    label: "Premium iPhone & Android Covers",
    href: "/products",
    imageSrc: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=1200&q=80",
    width: 1200,
    height: 600,
  },
];

const BOTTOM_BANNERS: BannerSlot[] = [
  {
    id: "bottom-wireless-earbuds",
    label: "TWS Wireless Earbuds & ANC",
    href: "/products",
    imageSrc: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&q=80",
    width: 1200,
    height: 600,
  },
  {
    id: "bottom-power-banks",
    label: "High Capacity Fast Power Banks",
    href: "/products",
    imageSrc: "https://images.unsplash.com/photo-1609592424216-2ea3f4e14cd9?w=800&q=80",
    width: 800,
    height: 600,
  },
  {
    id: "bottom-screen-protectors",
    label: "9H Tempered Glass & Car Mounts",
    href: "/products",
    imageSrc: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    width: 800,
    height: 600,
  },
];

function BannerTile({ slot }: { slot: BannerSlot }) {
  const [hasImage, setHasImage] = useState(true);

  return (
    <Link
      to={slot.href}
      className="group relative block min-w-0 w-full overflow-hidden rounded-md bg-secondary/60 leading-none shadow-sm transition-shadow hover:shadow-md"
    >
      {hasImage ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <img
            src={slot.imageSrc}
            alt={slot.label}
            width={slot.width}
            height={slot.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setHasImage(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
            <span className="inline-block rounded-full bg-background/90 px-3 py-1 text-xs font-semibold tracking-wide text-foreground backdrop-blur-sm">
              {slot.label}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[140px] w-full flex-col items-center justify-center gap-2 bg-muted/80 p-4 text-center">
          <ImageIcon className="h-8 w-8 text-muted-foreground/50" strokeWidth={1.5} />
          <span className="font-body text-sm font-medium text-muted-foreground">{slot.label}</span>
        </div>
      )}
    </Link>
  );
}

const HomePromoBanners = () => {
  return (
    <section className="w-full overflow-x-hidden bg-background py-4 md:py-6">
      <div className="w-full space-y-3 px-3 sm:space-y-4 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {TOP_BANNERS.map((slot) => (
            <BannerTile key={slot.id} slot={slot} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {BOTTOM_BANNERS.map((slot) => (
            <div key={slot.id}>
              <BannerTile slot={slot} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePromoBanners;
