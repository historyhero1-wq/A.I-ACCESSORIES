# Craftie._.Area Backend (PHP + MySQL)

## Setup Instructions

1. Start Apache and MySQL in XAMPP.
2. Import `RCA_FINAL.sql` into phpMyAdmin. It creates/updates the `RCA` schema used by `config/database.php`, preserves existing rows, and can be run again safely. It does not seed demo products or categories.
3. Keep the database credentials in `config/database.php` aligned with your MySQL installation.
4. Set `VITE_API_BASE_URL` in both the storefront and admin environment files to the URL of this backend's `api` directory. For local XAMPP, the URL follows `http://localhost/<project-folder>/backend/api`.
5. Open `http://localhost/<project-folder>/backend/api/index.php?path=categories` to verify the API is responding with JSON.

Point the web server document root at the project directory, ensure PHP is enabled, and allow the `backend/uploads/` directory to be writable by the web server so category, product, and banner images can be saved.

## Key Features

*   **E-Commerce Storefront**: Products, categories, reviews, customer loyalty discounts, checkout, order management.
*   **Visitor Tracking**: Tracks both anonymous and logged-in users. Logs every page view and provides real-time "Live Now" statistics.
*   **Admin Management**: Full control over products, orders, categories, customer analytics, and live site traffic.

## Note on Security
This is a baseline implementation. For production use:
1.  Implement JWT (JSON Web Tokens) for API authentication.
2.  Add more robust validation for input data.
3.  Secure the `api/admin/` endpoints with middleware.
