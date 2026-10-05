<?php
// api/banners/handler.php

require_once __DIR__ . '/../../config/database.php';

$database = new Database();
$db = $database->getConnection();

function ensureHeroBannersTable($db) {
    if (!$db) return;
    try {
        $db->exec("
            CREATE TABLE IF NOT EXISTS `hero_banners` (
              `id` INT(11) NOT NULL AUTO_INCREMENT,
              `label` VARCHAR(200) NOT NULL DEFAULT '',
              `title` VARCHAR(200) NOT NULL DEFAULT '',
              `title_line2` VARCHAR(200) NOT NULL DEFAULT '',
              `subtitle` TEXT DEFAULT NULL,
              `subtitle_highlight` TEXT DEFAULT NULL,
              `primary_btn_text` VARCHAR(100) NOT NULL DEFAULT 'SHOP NOW',
              `primary_btn_link` VARCHAR(255) NOT NULL DEFAULT '/products',
              `secondary_btn_text` VARCHAR(100) NOT NULL DEFAULT 'VIEW ALL',
              `secondary_btn_link` VARCHAR(255) NOT NULL DEFAULT '/products',
              `image_url` VARCHAR(500) NOT NULL DEFAULT '',
              `bg_color` VARCHAR(50) NOT NULL DEFAULT '#f8f9fa',
              `sort_order` INT(11) NOT NULL DEFAULT 0,
              `is_active` TINYINT(1) NOT NULL DEFAULT 1,
              `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");

        $count = $db->query("SELECT COUNT(*) FROM `hero_banners`")->fetchColumn();
        if ($count == 0) {
            $db->exec("
                INSERT INTO `hero_banners`
                  (label, title, title_line2, subtitle, subtitle_highlight, primary_btn_text, primary_btn_link, secondary_btn_text, secondary_btn_link, image_url, bg_color, sort_order, is_active)
                VALUES
                  ('A.I MOBILE ACCESSORIES', 'Premium Mobile', 'Accessories', 'Chargers, covers, cables, earbuds & more —', 'best quality at unbeatable prices.', 'SHOP NOW', '/products', 'VIEW ALL', '/products', 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80', '#f8f9fa', 1, 1),
                  ('FAST CHARGING COLLECTION', 'Power Up', 'Faster Than Ever', 'High-speed chargers & cables —', 'compatible with all iPhone and Android devices.', 'SHOP NOW', '/products', 'EXPLORE', '/products', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80', '#f0f4ff', 2, 1),
                  ('PHONE PROTECTION', 'Protect Your', 'Phone In Style', 'Premium covers & screen guards —', 'for iPhone, Samsung, Vivo, Oppo & all brands.', 'SHOP NOW', '/products', 'EXPLORE', '/products', 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80', '#f8f9fa', 3, 1),
                  ('TRUE WIRELESS EARBUDS', 'Sound Like', 'Never Before', 'Premium earbuds & hands-free —', 'crystal clear sound with deep bass.', 'SHOP NOW', '/products', 'VIEW ALL', '/products', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80', '#fff8f0', 4, 1);
            ");
        }
    } catch (\Exception $e) {
        // Log or ignore if table creation isn't critical
    }
}
ensureHeroBannersTable($db);

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($pathParts[1]) ? (int)$pathParts[1] : 0;

// ── GET ────────────────────────────────────────────────────────
if ($method === 'GET') {
    if ($id > 0) {
        // single banner
        $stmt = $db->prepare("SELECT * FROM hero_banners WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            echo json_encode($row);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Banner not found."]);
        }
    } else {
        // list — optionally filter active only
        $activeOnly = isset($_GET['active']) && $_GET['active'] === '1';
        if ($activeOnly) {
            $stmt = $db->query("SELECT * FROM hero_banners WHERE is_active = 1 ORDER BY sort_order ASC");
        } else {
            $stmt = $db->query("SELECT * FROM hero_banners ORDER BY sort_order ASC");
        }
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

// ── POST (create) ────────────────────────────────────────────
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $db->prepare("
        INSERT INTO hero_banners 
          (label, title, title_line2, subtitle, subtitle_highlight,
           primary_btn_text, primary_btn_link, secondary_btn_text, secondary_btn_link,
           image_url, bg_color, sort_order, is_active)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
    ");
    $ok = $stmt->execute([
        $data['label'] ?? '',
        $data['title'] ?? '',
        $data['title_line2'] ?? '',
        $data['subtitle'] ?? '',
        $data['subtitle_highlight'] ?? '',
        $data['primary_btn_text'] ?? 'SHOP NOW',
        $data['primary_btn_link'] ?? '/products',
        $data['secondary_btn_text'] ?? 'VIEW ALL',
        $data['secondary_btn_link'] ?? '/products',
        $data['image_url'] ?? '',
        $data['bg_color'] ?? '#f8f9fa',
        $data['sort_order'] ?? 0,
        isset($data['is_active']) ? (int)$data['is_active'] : 1,
    ]);
    if ($ok) {
        http_response_code(201);
        echo json_encode(["message" => "Banner created.", "id" => $db->lastInsertId()]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Failed to create banner."]);
    }

// ── PUT (update) ─────────────────────────────────────────────
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $bid  = $id > 0 ? $id : (int)($data['id'] ?? 0);
    if (!$bid) {
        http_response_code(400);
        echo json_encode(["message" => "Banner id required."]);
        exit;
    }
    $stmt = $db->prepare("
        UPDATE hero_banners SET
          label = ?, title = ?, title_line2 = ?, subtitle = ?, subtitle_highlight = ?,
          primary_btn_text = ?, primary_btn_link = ?, secondary_btn_text = ?, secondary_btn_link = ?,
          image_url = ?, bg_color = ?, sort_order = ?, is_active = ?
        WHERE id = ?
    ");
    $ok = $stmt->execute([
        $data['label'] ?? '',
        $data['title'] ?? '',
        $data['title_line2'] ?? '',
        $data['subtitle'] ?? '',
        $data['subtitle_highlight'] ?? '',
        $data['primary_btn_text'] ?? 'SHOP NOW',
        $data['primary_btn_link'] ?? '/products',
        $data['secondary_btn_text'] ?? 'VIEW ALL',
        $data['secondary_btn_link'] ?? '/products',
        $data['image_url'] ?? '',
        $data['bg_color'] ?? '#f8f9fa',
        $data['sort_order'] ?? 0,
        isset($data['is_active']) ? (int)$data['is_active'] : 1,
        $bid,
    ]);
    echo json_encode(["message" => $ok ? "Banner updated." : "Failed to update banner."]);

// ── DELETE ───────────────────────────────────────────────────
} elseif ($method === 'DELETE') {
    if (!$id) {
        http_response_code(400);
        echo json_encode(["message" => "Banner id required."]);
        exit;
    }
    $stmt = $db->prepare("DELETE FROM hero_banners WHERE id = ?");
    $ok   = $stmt->execute([$id]);
    echo json_encode(["message" => $ok ? "Banner deleted." : "Failed to delete banner."]);
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed."]);
}
?>
