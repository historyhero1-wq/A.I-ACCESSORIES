import React, { createContext, useContext, useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export interface SiteSettingsData {
  store_name: string;
  store_tagline: string;
  contact_phone: string;
  contact_whatsapp: string;
  contact_email: string;
  store_address: string;
  social_facebook: string;
  social_instagram: string;
  social_tiktok: string;
  social_youtube: string;
  shipping_fee: string;
  free_shipping_threshold: string;
  estimated_delivery_days: string;
  delivery_notice: string;
  currency: string;
  currency_symbol: string;
  announcement_enabled: string;
  announcement_text: string;
  announcement_link: string;
  policy_returns: string;
  policy_shipping: string;
  policy_warranty: string;
  policy_privacy: string;
  policy_terms: string;
  [key: string]: string;
}

const DEFAULT_SETTINGS: SiteSettingsData = {
  store_name: "A.I MOBILE ACCESSORIES",
  store_tagline: "Premium Quality Mobile Accessories & Gadgets",
  contact_phone: "+92 317 7219621",
  contact_whatsapp: "+923177219621",
  contact_email: "aimobileaccessories@gmail.com",
  store_address: "Shop #12, Ground Floor, Mobile Market, Lahore, Pakistan",
  social_facebook: "https://www.facebook.com/a.imobileaccessories",
  social_instagram: "https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=c3xugsz",
  social_tiktok: "https://www.tiktok.com/@a.imobileaccessories?_r=1&_t=ZS-9AFBJT504rm",
  social_youtube: "",
  shipping_fee: "0",
  free_shipping_threshold: "2499",
  estimated_delivery_days: "2 - 4 business days",
  delivery_notice: "Free shipping on orders above Rs. 2,499. Cash on Delivery available nationwide.",
  currency: "PKR",
  currency_symbol: "Rs.",
  announcement_enabled: "1",
  announcement_text: "⚡ FREE DELIVERY ON ORDERS OVER RS. 2,499 | CASH ON DELIVERY NATIONWIDE",
  announcement_link: "/products",
  policy_returns: "Defective, damaged, or incorrectly delivered products may be returned or exchanged within 24 hours of delivery. Products must be unused, undamaged, and in original packaging with all accessories included.",
  policy_shipping: "We deliver across Pakistan within 2 to 4 business days via verified courier services. Cash on Delivery (COD) is available nationwide. Tracking details will be shared via SMS and WhatsApp once your order is dispatched.",
  policy_warranty: "Electronic accessories such as chargers, data cables, power banks, and earbuds must be tested immediately upon delivery. Any manufacturing defect must be reported within 24 hours.",
  policy_privacy: "Your privacy is strictly respected. Your name, address, contact numbers, and purchase history are kept secure and confidential.",
  policy_terms: "By placing an order on our store, you confirm the provided contact information and delivery address are accurate. Orders placed via COD must be accepted upon courier arrival.",
};

interface SettingsContextType {
  settings: SiteSettingsData;
  isLoading: boolean;
  calculateShipping: (subtotal: number) => number;
  formatPrice: (amount: number) => string;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  isLoading: true,
  calculateShipping: () => 0,
  formatPrice: (amount: number) => `Rs. ${amount.toLocaleString()}`,
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettingsData>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/index.php?path=settings`)
      .then((res) => res.json())
      .then((data: Record<string, string>) => {
        if (data && typeof data === "object") {
          setSettings((prev) => ({
            ...prev,
            ...data,
          }));
        }
      })
      .catch(() => {
        // Fallback gracefully to default settings
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const calculateShipping = (subtotal: number): number => {
    const fee = parseFloat(settings.shipping_fee) || 0;
    const threshold = parseFloat(settings.free_shipping_threshold) || 0;
    if (threshold > 0 && subtotal >= threshold) {
      return 0;
    }
    return fee;
  };

  const formatPrice = (amount: number): string => {
    const symbol = settings.currency_symbol || "Rs.";
    return `${symbol} ${Math.round(amount).toLocaleString()}`;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isLoading,
        calculateShipping,
        formatPrice,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
