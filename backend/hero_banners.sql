-- Hero Banners Table
-- Run this in phpMyAdmin on the RCA database

CREATE TABLE IF NOT EXISTS `hero_banners` (
  `id`                INT(11) NOT NULL AUTO_INCREMENT,
  `label`             VARCHAR(200) NOT NULL DEFAULT '',
  `title`             VARCHAR(200) NOT NULL DEFAULT '',
  `title_line2`       VARCHAR(200) NOT NULL DEFAULT '',
  `subtitle`          VARCHAR(400) NOT NULL DEFAULT '',
  `subtitle_highlight` VARCHAR(400) NOT NULL DEFAULT '',
  `primary_btn_text`  VARCHAR(100) NOT NULL DEFAULT 'SHOP NOW',
  `primary_btn_link`  VARCHAR(300) NOT NULL DEFAULT '/products',
  `secondary_btn_text` VARCHAR(100) NOT NULL DEFAULT 'VIEW ALL',
  `secondary_btn_link` VARCHAR(300) NOT NULL DEFAULT '/products',
  `image_url`         VARCHAR(500) NOT NULL DEFAULT '',
  `bg_color`          VARCHAR(30)  NOT NULL DEFAULT '#f8f9fa',
  `sort_order`        INT(11) NOT NULL DEFAULT 0,
  `is_active`         TINYINT(1) NOT NULL DEFAULT 1,
  `created_at`        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at`        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed default banners
INSERT INTO `hero_banners` (`label`, `title`, `title_line2`, `subtitle`, `subtitle_highlight`, `primary_btn_text`, `primary_btn_link`, `secondary_btn_text`, `secondary_btn_link`, `image_url`, `bg_color`, `sort_order`, `is_active`) VALUES
('A.I MOBILE ACCESSORIES', 'Premium Mobile', 'Accessories', 'Chargers, covers, cables, earbuds & more —', 'best quality at unbeatable prices.', 'SHOP NOW', '/products', 'VIEW ALL', '/products', 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80', '#f8f9fa', 1, 1),
('FAST CHARGING COLLECTION', 'Power Up', 'Faster Than Ever', 'High-speed chargers & cables —', 'compatible with all iPhone and Android devices.', 'SHOP NOW', '/products', 'EXPLORE', '/products', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80', '#f0f4ff', 2, 1),
('PHONE PROTECTION', 'Protect Your', 'Phone In Style', 'Premium covers & screen guards —', 'for iPhone, Samsung, Vivo, Oppo & all brands.', 'SHOP NOW', '/products', 'EXPLORE', '/products', 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80', '#f8f9fa', 3, 1),
('TRUE WIRELESS EARBUDS', 'Sound Like', 'Never Before', 'Premium earbuds & hands-free —', 'crystal clear sound with deep bass.', 'SHOP NOW', '/products', 'VIEW ALL', '/products', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80', '#fff8f0', 4, 1);
