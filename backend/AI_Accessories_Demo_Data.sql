-- ============================================
-- A.I Mobile Accessories — Demo Data
-- Database: RCA (XAMPP Local)
-- Import: phpmyadmin > RCA > Import > Choose File
-- ============================================

SET FOREIGN_KEY_CHECKS = 0;

-- Purana data clear
DELETE FROM `product_categories`;
DELETE FROM `products`;
DELETE FROM `categories`;

-- Reset auto increment
ALTER TABLE `products` AUTO_INCREMENT = 1;
ALTER TABLE `categories` AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- CATEGORIES (10) — columns: id, name, slug, parent_id, show_on_home, home_sort_order, image
-- ============================================

INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `show_on_home`, `home_sort_order`, `image`) VALUES
(1,  'Phone Covers',      'phone-covers',      NULL, 1, 1,  'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400&q=80'),
(2,  'Chargers',          'chargers',          NULL, 1, 2,  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80'),
(3,  'USB Cables',        'usb-cables',        NULL, 1, 3,  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80'),
(4,  'Earbuds',           'earbuds',           NULL, 1, 4,  'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80'),
(5,  'Power Banks',       'power-banks',       NULL, 1, 5,  'https://images.unsplash.com/photo-1609592424216-2ea3f4e14cd9?w=400&q=80'),
(6,  'Screen Protectors', 'screen-protectors', NULL, 1, 6,  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80'),
(7,  'Hands-free',        'hands-free',        NULL, 0, 7,  'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80'),
(8,  'Car Accessories',   'car-accessories',   NULL, 0, 8,  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80'),
(9,  'New Arrivals',      'new-arrivals',      NULL, 1, 9,  NULL),
(10, 'Best Sellers',      'best-sellers',      NULL, 1, 10, NULL);

-- ============================================
-- PRODUCTS (20)
-- Columns: id, name, slug, description, long_description,
--          price, original_price, stock, images,
--          is_active, category_id, created_at
-- ============================================

INSERT INTO `products`
  (`id`, `category_id`, `name`, `slug`, `description`, `long_description`,
   `price`, `original_price`, `stock`, `images`, `is_active`, `created_at`)
VALUES

-- ===== PHONE COVERS (cat 1) =====
(1, 1, 'iPhone 15 Pro Matte Black Cover', 'iphone-15-pro-matte-black',
 'Premium matte silicone cover for iPhone 15 Pro.',
 'Premium matte silicone back cover for iPhone 15 Pro. Full camera protection, anti-fingerprint coating. Slim and lightweight design.',
 450, 599, 50,
 '["https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80"]',
 1, NOW()),

(2, 1, 'Samsung Galaxy S24 Clear Cover', 'samsung-s24-clear-cover',
 'Crystal clear TPU cover for Samsung Galaxy S24.',
 'Crystal clear transparent TPU cover for Samsung Galaxy S24. Show your phone original color while keeping it fully protected from scratches and drops.',
 350, 499, 80,
 '["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80"]',
 1, NOW()),

(3, 1, 'Vivo V30 Leather Flip Cover', 'vivo-v30-leather-flip',
 'Stylish PU leather flip cover for Vivo V30.',
 'Stylish PU leather flip cover for Vivo V30. Built-in card slot, kickstand function. Full 360 degree body protection.',
 650, 899, 30,
 '["https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&q=80"]',
 1, NOW()),

(4, 1, 'Oppo A78 Shockproof Armor Cover', 'oppo-a78-armor-cover',
 'Military grade shockproof cover for Oppo A78.',
 'Military grade shockproof armor cover for Oppo A78. Triple layer protection against drops and heavy impact. Raised edges protect camera and screen.',
 550, 699, 40,
 '["https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=600&q=80"]',
 1, NOW()),

-- ===== CHARGERS (cat 2) =====
(5, 2, '65W GaN Fast Charger Type-C', 'gan-65w-fast-charger',
 '65W GaN technology fast charger with Type-C port.',
 '65W GaN technology fast charger. Smart IC chip prevents overheating and overcharging. Compatible with iPhone 15, Samsung, Oppo, Vivo, Xiaomi and all Type-C devices.',
 1299, 1799, 25,
 '["https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80"]',
 1, NOW()),

(6, 2, '33W Android Fast Charger', '33w-android-fast-charger',
 '33W fast charger for Oppo, Vivo, Samsung, Tecno, Infinix.',
 '33W fast charger compatible with Oppo VOOC, Vivo FlashCharge, Samsung SuperFast, Tecno and Infinix. Universal USB-A port.',
 799, 999, 60,
 '["https://images.unsplash.com/photo-1609592424216-2ea3f4e14cd9?w=600&q=80"]',
 1, NOW()),

(7, 2, 'iPhone 20W PD Fast Charger', 'iphone-20w-pd-charger',
 '20W Power Delivery charger for iPhone 12/13/14/15.',
 '20W Power Delivery fast charger for iPhone 12, 13, 14, 15 series. Certified safe charging with overcharge protection. Compact design.',
 899, 1199, 35,
 '["https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80"]',
 1, NOW()),

-- ===== USB CABLES (cat 3) =====
(8, 3, 'USB-C Braided Cable 1M 65W', 'usbc-braided-cable-1m',
 'Premium braided USB-C cable 65W fast charging 1 meter.',
 'Premium braided nylon USB-C to USB-C cable. Supports 65W fast charging and high speed data transfer. 10000+ bend lifespan. Tangle-free design.',
 499, 699, 100,
 '["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80"]',
 1, NOW()),

(9, 3, 'Lightning to USB-C Cable 1M', 'lightning-usbc-cable-1m',
 'Fast charging Lightning cable for all iPhones 1 meter.',
 'Fast charging Lightning to USB-C cable. Compatible with all iPhone models from iPhone 5 to 15. Durable and tangle-free braided design.',
 599, 799, 75,
 '["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80"]',
 1, NOW()),

(10, 3, '3-in-1 Universal Cable 2M', '3in1-universal-cable-2m',
 '3-in-1 Type-C Micro USB Lightning cable 2 meter.',
 'Universal 3-in-1 charging cable. Type-C + Micro USB + Lightning connectors. 2 meter length. One cable charges all your devices.',
 699, 999, 55,
 '["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80"]',
 1, NOW()),

-- ===== EARBUDS (cat 4) =====
(11, 4, 'A6 Pro TWS Earbuds ANC', 'a6-pro-tws-anc-earbuds',
 'True wireless earbuds with Active Noise Cancellation 30hr battery.',
 'True wireless earbuds with Active Noise Cancellation and Environmental Noise Cancellation. 30 hour total battery with case. AAC audio codec for Hi-Fi sound.',
 2499, 3499, 20,
 '["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80"]',
 1, NOW()),

(12, 4, 'Basic TWS Earbuds 24hr Battery', 'basic-tws-earbuds-24hr',
 'Affordable TWS earbuds 6hr playtime IPX4 water resistant.',
 'Affordable true wireless earbuds with clear sound and deep bass. 6 hours playtime + 18 hours charging case. IPX4 water and sweat resistant. Perfect for daily use.',
 999, 1499, 90,
 '["https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80"]',
 1, NOW()),

(13, 4, 'Premium Wireless Earbuds Pro', 'premium-wireless-earbuds-pro',
 'Premium wireless earbuds touch controls 20hr total playback.',
 'Premium wireless earbuds with touch controls. 20 hour total playback time. Crystal clear microphone for hands-free calls. Stylish compact charging case.',
 1799, 2499, 30,
 '["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80"]',
 1, NOW()),

-- ===== POWER BANKS (cat 5) =====
(14, 5, '20000mAh Fast Power Bank 22.5W', '20000mah-fast-power-bank',
 '20000mAh power bank 22.5W fast charging dual output.',
 '20000mAh high capacity power bank with 22.5W fast charging output. Dual USB-A and USB-C ports. LED battery percentage indicator. Charges 3 devices simultaneously.',
 2999, 3999, 15,
 '["https://images.unsplash.com/photo-1609592424216-2ea3f4e14cd9?w=600&q=80"]',
 1, NOW()),

(15, 5, '10000mAh Slim Power Bank PD 20W', '10000mah-slim-power-bank-pd',
 'Ultra slim 10000mAh power bank PD 20W LED display.',
 'Ultra slim design 10000mAh power bank with PD 20W fast charging. Digital LED display shows exact battery percentage. Slim enough to fit in any pocket or bag.',
 1799, 2399, 25,
 '["https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=600&q=80"]',
 1, NOW()),

-- ===== SCREEN PROTECTORS (cat 6) =====
(16, 6, 'iPhone 15 Pro Tempered Glass 9H', 'iphone-15-pro-tempered-glass',
 '9H hardness tempered glass for iPhone 15 Pro with kit.',
 '9H hardness certified tempered glass for iPhone 15 Pro. Oleophobic anti-fingerprint coating. Complete bubble-free installation kit included with alignment frame.',
 349, 499, 120,
 '["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"]',
 1, NOW()),

(17, 6, 'Samsung S24 Ultra Full Glue Glass', 'samsung-s24-ultra-full-glue-glass',
 'Full glue tempered glass for Samsung S24 Ultra curved.',
 'Full glue tempered glass covers the entire curved Samsung S24 Ultra screen. Auto-alignment installation frame for perfect application every time.',
 449, 599, 70,
 '["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"]',
 1, NOW()),

-- ===== HANDS-FREE (cat 7) =====
(18, 7, 'Type-C Wired Hands-free HD Mic', 'type-c-handsfree-hd-mic',
 'Type-C wired earphones HD mic deep bass for Android.',
 'Wired hands-free with Type-C connector. HD microphone for crystal clear calls. Deep bass and clear treble sound. Compatible with Samsung, Oppo, Vivo, Xiaomi Type-C phones.',
 599, 799, 45,
 '["https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80"]',
 1, NOW()),

(19, 7, 'iPhone Lightning Wired Earphones', 'iphone-lightning-wired-earphones',
 'Lightning wired earphones with mic for all iPhones.',
 'Wired earphones with Lightning connector for all iPhones. Built-in inline microphone and volume control buttons. Clear sound quality.',
 699, 999, 35,
 '["https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80"]',
 1, NOW()),

-- ===== CAR ACCESSORIES (cat 8) =====
(20, 8, '360 Magnetic Car Phone Holder', '360-magnetic-car-phone-holder',
 '360 degree rotating magnetic car phone holder dashboard.',
 '360 degree rotating magnetic car phone holder. Extra strong magnet holds all phone sizes securely. Dashboard and windshield suction cup mount included. One hand operation.',
 799, 1099, 40,
 '["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80"]',
 1, NOW());

-- ============================================
-- PRODUCT TO CATEGORY LINKS
-- ============================================

INSERT INTO `product_categories` (`product_id`, `category_id`) VALUES
-- Phone Covers (cat 1)
(1,1),(2,1),(3,1),(4,1),
-- Chargers (cat 2)
(5,2),(6,2),(7,2),
-- USB Cables (cat 3)
(8,3),(9,3),(10,3),
-- Earbuds (cat 4)
(11,4),(12,4),(13,4),
-- Power Banks (cat 5)
(14,5),(15,5),
-- Screen Protectors (cat 6)
(16,6),(17,6),
-- Hands-free (cat 7)
(18,7),(19,7),
-- Car Accessories (cat 8)
(20,8),
-- New Arrivals (cat 9)
(11,9),(5,9),(15,9),(1,9),(16,9),
-- Best Sellers (cat 10)
(12,10),(8,10),(14,10),(6,10),(18,10);

-- ============================================
SELECT 'SUCCESS! A.I Accessories demo data imported!' AS Result;
-- ============================================
