-- RCA storefront and admin schema plus safe, repeatable migrations.
-- Target database: RCA (the database configured by backend/config/database.php).
-- Compatible with XAMPP MariaDB 10.4+.
-- Does not delete or replace existing table data and does not seed demo products/categories.
CREATE DATABASE IF NOT EXISTS `RCA` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `RCA`;

SET FOREIGN_KEY_CHECKS = 0;


CREATE TABLE IF NOT EXISTS `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','manager') DEFAULT 'manager',
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `show_on_home` tinyint(1) NOT NULL DEFAULT 0,
  `home_sort_order` int(11) NOT NULL DEFAULT 0,
  `image` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `checkout_drafts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `draft_token` varchar(64) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `full_name` varchar(150) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `referral_code` varchar(40) DEFAULT NULL,
  `cart_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cart_json`)),
  `cart_total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` enum('abandoned','converted') NOT NULL DEFAULT 'abandoned',
  `converted_order_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_checkout_drafts_token` (`draft_token`),
  KEY `idx_checkout_drafts_phone` (`phone`),
  KEY `idx_checkout_drafts_status_updated` (`status`,`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `hero_banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(200) NOT NULL DEFAULT '',
  `title` varchar(200) NOT NULL DEFAULT '',
  `title_line2` varchar(200) NOT NULL DEFAULT '',
  `subtitle` text DEFAULT NULL,
  `subtitle_highlight` text DEFAULT NULL,
  `primary_btn_text` varchar(100) NOT NULL DEFAULT 'SHOP NOW',
  `primary_btn_link` varchar(255) NOT NULL DEFAULT '/products',
  `secondary_btn_text` varchar(100) NOT NULL DEFAULT 'VIEW ALL',
  `secondary_btn_link` varchar(255) NOT NULL DEFAULT '/products',
  `image_url` varchar(500) NOT NULL DEFAULT '',
  `bg_color` varchar(50) NOT NULL DEFAULT '#f8f9fa',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `live_traffic` (
  `session_id` int(11) NOT NULL,
  `last_ping_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `current_page` varchar(255) DEFAULT NULL,
  `current_page_title` varchar(200) DEFAULT NULL,
  `current_page_view_id` int(11) DEFAULT NULL,
  `is_logged_in` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`session_id`),
  CONSTRAINT `live_traffic_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `visitor_sessions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(200) NOT NULL,
  `color_name` varchar(100) DEFAULT NULL,
  `color_hex` varchar(20) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `order_number` varchar(30) NOT NULL,
  `status` enum('pending','paid','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `subtotal` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL,
  `shipping_address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`shipping_address`)),
  `referred_by_code` varchar(20) DEFAULT NULL,
  `commission_earned` decimal(10,2) DEFAULT 0.00,
  `resale_credited` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `page_views` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `page_path` varchar(255) NOT NULL,
  `page_url` text DEFAULT NULL,
  `page_title` varchar(200) DEFAULT NULL,
  `referrer_url` text DEFAULT NULL,
  `stay_duration` int(11) DEFAULT 0,
  `entered_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_ping_at` timestamp NULL DEFAULT NULL,
  `exited_at` timestamp NULL DEFAULT NULL,
  `exit_type` enum('navigation','close','timeout') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_page_views_session` (`session_id`),
  KEY `idx_page_views_user` (`user_id`),
  CONSTRAINT `page_views_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `visitor_sessions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `page_views_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `method` enum('card','bank_transfer','cod','resale_balance') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
  `transaction_id` varchar(100) DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `product_categories` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_categories_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS `product_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `reviewer` varchar(100) NOT NULL,
  `reviewer_email` varchar(150) NOT NULL,
  `review` text NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `status` enum('approved','pending') DEFAULT 'approved',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `long_description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `original_price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `video` varchar(500) DEFAULT NULL,
  `video_position` int(11) NOT NULL DEFAULT 2,
  `colors` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`colors`)),
  `is_active` tinyint(1) DEFAULT 1,
  `is_sold_out` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `resale_ledger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `type` enum('credit','debit') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `resale_ledger_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `resale_ledger_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(50) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `resale_code` varchar(20) NOT NULL,
  `resale_balance` decimal(10,2) DEFAULT 0.00,
  `referred_by_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `resale_code` (`resale_code`),
  KEY `referred_by_id` (`referred_by_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`referred_by_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `visitor_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` int(11) DEFAULT NULL,
  `page_view_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `event_type` varchar(50) NOT NULL,
  `event_name` varchar(100) DEFAULT NULL,
  `page_path` varchar(255) DEFAULT NULL,
  `event_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`event_data`)),
  `occurred_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idx_visitor_events_session` (`session_id`),
  KEY `idx_visitor_events_page_view` (`page_view_id`),
  CONSTRAINT `visitor_events_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `visitor_sessions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `visitor_events_ibfk_2` FOREIGN KEY (`page_view_id`) REFERENCES `page_views` (`id`) ON DELETE SET NULL,
  CONSTRAINT `visitor_events_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `visitor_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_uuid` varchar(100) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `referer_url` text DEFAULT NULL,
  `resale_code_used` varchar(20) DEFAULT NULL,
  `landing_page` varchar(255) DEFAULT NULL,
  `device_type` varchar(50) DEFAULT NULL,
  `browser` varchar(100) DEFAULT NULL,
  `os` varchar(100) DEFAULT NULL,
  `screen_resolution` varchar(50) DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `timezone` varchar(100) DEFAULT NULL,
  `utm_source` varchar(100) DEFAULT NULL,
  `utm_medium` varchar(100) DEFAULT NULL,
  `utm_campaign` varchar(100) DEFAULT NULL,
  `page_count` int(11) DEFAULT 0,
  `total_duration` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `first_seen` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_seen` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ended_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_uuid` (`session_uuid`),
  KEY `idx_visitor_sessions_user` (`user_id`),
  KEY `idx_visitor_sessions_active` (`is_active`,`last_seen`),
  CONSTRAINT `visitor_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



SET FOREIGN_KEY_CHECKS = 1;

-- Apply safe column migrations to existing installs.
ALTER TABLE `categories`
  ADD COLUMN IF NOT EXISTS `show_on_home` TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `home_sort_order` INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `image` VARCHAR(500) NULL DEFAULT NULL;

ALTER TABLE `products`
  ADD COLUMN IF NOT EXISTS `long_description` TEXT NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `original_price` DECIMAL(10,2) NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `colors` JSON NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `is_sold_out` TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `video` VARCHAR(500) NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `video_position` INT NOT NULL DEFAULT 2;

ALTER TABLE `users`
  ADD COLUMN IF NOT EXISTS `resale_code` VARCHAR(20) NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `resale_balance` DECIMAL(10,2) NULL DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS `referred_by_id` INT NULL DEFAULT NULL;

ALTER TABLE `orders`
  ADD COLUMN IF NOT EXISTS `referred_by_code` VARCHAR(20) NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `commission_earned` DECIMAL(10,2) NULL DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS `resale_credited` TINYINT(1) NULL DEFAULT 0;

ALTER TABLE `order_items`
  ADD COLUMN IF NOT EXISTS `color_name` VARCHAR(100) NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `color_hex` VARCHAR(20) NULL DEFAULT NULL;

ALTER TABLE `orders`
  ADD COLUMN IF NOT EXISTS `referrer_user_id` INT NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `resale_discount_percent` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS `resale_discount_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS `resale_commission_percent` DECIMAL(5,2) NOT NULL DEFAULT 0.00;

ALTER TABLE `visitor_sessions`
  ADD COLUMN IF NOT EXISTS `resale_code_used` VARCHAR(20) NULL DEFAULT NULL;

ALTER TABLE `payments`
  MODIFY COLUMN `method` ENUM('card','bank_transfer','cod','resale_balance') NOT NULL;

ALTER TABLE `users`
  ADD COLUMN IF NOT EXISTS `resale_discount_percent` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS `resale_commission_percent` DECIMAL(5,2) NOT NULL DEFAULT 5.00,
  ADD COLUMN IF NOT EXISTS `resale_code_active` TINYINT(1) NOT NULL DEFAULT 1;

-- Backfill legacy product.category_id links without replacing existing links.
INSERT IGNORE INTO `product_categories` (`product_id`, `category_id`)
SELECT `id`, `category_id`
FROM `products`
WHERE `category_id` IS NOT NULL;

-- Insert defaults only when absent; keep any existing store settings.
INSERT IGNORE INTO `settings` (`setting_key`, `setting_value`) VALUES
  ('currency', 'PKR'),
  ('sale_countdown_enabled', '0'),
  ('sale_countdown_ends_at', '');
