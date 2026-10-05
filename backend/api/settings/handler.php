<?php
// api/settings/handler.php

require_once __DIR__ . '/../../config/database.php';

$database = new Database();
$db = $database->getConnection();

function ensureSettingsDefaults($db) {
    if (!$db) return;
    try {
        $db->exec("
            CREATE TABLE IF NOT EXISTS `settings` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `setting_key` VARCHAR(100) UNIQUE NOT NULL,
              `setting_value` TEXT NULL,
              `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");

        $defaults = [
            'store_name' => 'A.I MOBILE ACCESSORIES',
            'store_tagline' => 'Premium Quality Mobile Accessories & Gadgets',
            'contact_phone' => '+92 317 7219621',
            'contact_whatsapp' => '+923177219621',
            'contact_email' => 'aimobileaccessories@gmail.com',
            'store_address' => 'Shop #12, Ground Floor, Mobile Market, Lahore, Pakistan',
            'social_facebook' => 'https://www.facebook.com/a.imobileaccessories',
            'social_instagram' => 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=c3xugsz',
            'social_tiktok' => 'https://www.tiktok.com/@a.imobileaccessories?_r=1&_t=ZS-9AFBJT504rm',
            'social_youtube' => '',
            'shipping_fee' => '0',
            'free_shipping_threshold' => '2499',
            'estimated_delivery_days' => '2 - 4 business days',
            'delivery_notice' => 'Free shipping on orders above Rs. 2,499. Cash on Delivery available nationwide.',
            'currency' => 'PKR',
            'currency_symbol' => 'Rs.',
            'announcement_enabled' => '1',
            'announcement_text' => '⚡ FREE DELIVERY ON ORDERS OVER RS. 2,499 | CASH ON DELIVERY NATIONWIDE',
            'announcement_link' => '/products',
            'policy_returns' => "Defective, damaged, or incorrectly delivered products may be returned or exchanged within 24 hours of delivery.\nProducts must be unused, undamaged, and in their original packaging with all accessories included.\nReturns are not accepted due to change of mind or personal preference.",
            'policy_shipping' => "We deliver across Pakistan within 2 to 4 business days via verified courier services.\nCash on Delivery (COD) is available nationwide.\nTracking details will be shared via SMS and WhatsApp once your order is dispatched.",
            'policy_warranty' => "Electronic accessories such as chargers, data cables, power banks, and earbuds must be tested immediately upon delivery.\nAny manufacturing defect must be reported within 24 hours.",
            'policy_privacy' => "Your privacy is strictly respected. Your name, address, contact numbers, and purchase history are kept secure and confidential.",
            'policy_terms' => "By placing an order on our store, you confirm the provided contact information and delivery address are accurate. Orders placed via COD must be accepted upon courier arrival.",
        ];

        $stmt = $db->prepare("INSERT IGNORE INTO settings (setting_key, setting_value) VALUES (?, ?)");
        foreach ($defaults as $k => $v) {
            $stmt->execute([$k, $v]);
        }
    } catch (\Exception $e) {
        // Continue silently if table already set
    }
}

ensureSettingsDefaults($db);

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->query("SELECT setting_key, setting_value FROM settings");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $settings = [];
    foreach ($rows as $r) {
        $settings[$r['setting_key']] = $r['setting_value'];
    }
    echo json_encode($settings);
    exit;
} elseif ($method === 'POST' || $method === 'PUT') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON payload."]);
        exit;
    }

    $stmt = $db->prepare("
        INSERT INTO settings (setting_key, setting_value) 
        VALUES (?, ?) 
        ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)
    ");

    foreach ($input as $key => $val) {
        // Stringify values if bool or number
        if (is_bool($val)) {
            $val = $val ? '1' : '0';
        } elseif (is_null($val)) {
            $val = '';
        } else {
            $val = (string)$val;
        }
        $stmt->execute([$key, $val]);
    }

    // Return updated settings
    $stmt = $db->query("SELECT setting_key, setting_value FROM settings");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $settings = [];
    foreach ($rows as $r) {
        $settings[$r['setting_key']] = $r['setting_value'];
    }

    echo json_encode([
        "message" => "Settings updated successfully.",
        "settings" => $settings,
    ]);
    exit;
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed."]);
    exit;
}
?>
