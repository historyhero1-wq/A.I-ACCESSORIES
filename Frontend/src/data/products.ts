export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  video?: string | null;
  videoPosition?: number;
  category: string;
  categories?: string[];
  categoryId?: number;
  categoryIds?: number[];
  description: string;
  shortDescription?: string;
  longDescription?: string;
  details: string[];
  material: string;
  inStock: boolean;
  isSoldOut?: boolean;
  badge?: string;
  variations?: { id: number; name: string }[];
  colors?: { name: string; hex: string }[];
  rating?: string;
  reviewCount?: number;
  stockQuantity?: number;
}

export interface ProductReview {
  id: number;
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
  date_created: string;
}

export const products: Product[] = [
  {
    id: "iphone-15-pro-matte-black-cover",
    slug: "iphone-15-pro-matte-black-cover",
    name: "iPhone 15 Pro Matte Black Cover",
    price: 450,
    originalPrice: 650,
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80"],
    category: "Phone Covers",
    categories: ["Phone Covers", "Best Sellers"],
    categoryId: 1,
    categoryIds: [1, 10],
    description: "Ultra-slim matte finish shockproof back cover for iPhone 15 Pro.",
    shortDescription: "Ultra-slim matte finish shockproof back cover.",
    longDescription: "Ultra-slim matte finish shockproof back cover with camera bump protector. Soft-touch grip, anti-fingerprint coating.",
    details: ["Matte Soft Touch", "Full Camera Protection", "Shockproof Airbag Corners", "Anti-fingerprint"],
    material: "High Grade TPU",
    inStock: true,
    badge: "Bestseller",
  },
  {
    id: "65w-gan-fast-charger",
    slug: "65w-gan-fast-charger",
    name: "65W GaN Fast Charger Type-C",
    price: 1299,
    originalPrice: 1799,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80"],
    category: "Chargers",
    categories: ["Chargers", "Best Sellers"],
    categoryId: 2,
    categoryIds: [2, 10],
    description: "65W GaN ultra-fast charging adapter with dual Type-C and USB-A ports.",
    shortDescription: "65W GaN fast charger with dual Type-C ports.",
    longDescription: "65W Gallium Nitride (GaN) fast charger. Charges laptops, tablets, iPhone 15/16, Samsung and Android devices at blazing speeds.",
    details: ["65W Max Output", "GaN Technology (Low Heat)", "Dual Type-C + USB-A", "Overheat Protection"],
    material: "Fireproof PC Shell",
    inStock: true,
    badge: "Hot Deal",
  },
  {
    id: "a6-pro-tws-anc-earbuds",
    slug: "a6-pro-tws-anc-earbuds",
    name: "A6 Pro TWS Earbuds ANC",
    price: 2499,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80"],
    category: "Earbuds",
    categories: ["Earbuds", "New Arrivals"],
    categoryId: 4,
    categoryIds: [4, 9],
    description: "True wireless earbuds with Active Noise Cancellation & 30hr battery.",
    shortDescription: "ANC Wireless Earbuds with 30hr total battery.",
    longDescription: "A6 Pro TWS with ANC, Environmental Noise Cancellation, 30 hours battery backup with case, touch controls and deep bass sound.",
    details: ["Active Noise Cancellation", "30-Hour Total Playtime", "Type-C Fast Charging", "IPX5 Sweat Resistant"],
    material: "Ergonomic Polymer",
    inStock: true,
    badge: "New",
  },
  {
    id: "20000mah-fast-power-bank",
    slug: "20000mah-fast-power-bank",
    name: "20000mAh Fast Power Bank 22.5W",
    price: 2999,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1609592424216-2ea3f4e14cd9?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1609592424216-2ea3f4e14cd9?w=600&q=80"],
    category: "Power Banks",
    categories: ["Power Banks", "Best Sellers"],
    categoryId: 5,
    categoryIds: [5, 10],
    description: "20000mAh power bank 22.5W fast charging dual output LED display.",
    shortDescription: "20000mAh 22.5W fast power bank dual output.",
    longDescription: "High capacity 20000mAh power bank with digital LED battery percentage indicator, 22.5W fast charge dual output.",
    details: ["20000mAh Real Capacity", "22.5W Quick Charge 3.0", "Dual USB + Type-C Input/Output", "LED Percentage Screen"],
    material: "Matte Metal Body",
    inStock: true,
    badge: "Bestseller",
  },
  {
    id: "usbc-braided-cable-1m",
    slug: "usbc-braided-cable-1m",
    name: "USB-C Braided Cable 1M 65W",
    price: 499,
    originalPrice: 699,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80"],
    category: "USB Cables",
    categories: ["USB Cables", "Best Sellers"],
    categoryId: 3,
    categoryIds: [3, 10],
    description: "Heavy duty braided nylon USB-C to USB-C cable 65W fast charge.",
    shortDescription: "Heavy duty braided 65W fast cable.",
    longDescription: "Braided nylon cord with aluminum connectors. Supports up to 65W high speed charging and 480Mbps data transfer.",
    details: ["65W Fast Charge Support", "Nylon Braided 10,000+ Bends", "Reinforced Connectors", "1 Meter Length"],
    material: "Braided Nylon & Aluminum",
    inStock: true,
  },
  {
    id: "360-magnetic-car-phone-holder",
    slug: "360-magnetic-car-phone-holder",
    name: "360 Magnetic Car Phone Holder",
    price: 799,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80"],
    category: "Car Accessories",
    categories: ["Car Accessories"],
    categoryId: 8,
    categoryIds: [8],
    description: "360 degree rotating magnetic dashboard phone holder.",
    shortDescription: "Magnetic 360 rotating car mount.",
    longDescription: "Extra strong neodymium magnets ensure phone stability even on bumpy roads. 360 degree rotation for optimal viewing angles.",
    details: ["6x Strong Magnets", "360 Degree Ball Joint", "Dashboard & Windshield Adhesive", "Universal Compatibility"],
    material: "Alloy & Silicone",
    inStock: true,
  },
];

export const categories = [
  "All",
  "Phone Covers",
  "Chargers",
  "USB Cables",
  "Earbuds",
  "Power Banks",
  "Screen Protectors",
  "Hands-free",
  "Car Accessories",
];
