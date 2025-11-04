-- ============================================================
--  Internship Assignment: Order Verification & Validation
--  Company Type: Ecommerce
--  Department: Web Integration & Database Operations
--  Database Name: order_verification_db
-- ============================================================

-- FOR TESTING PURPOSE
DROP DATABASE IF EXISTS order_verification_db;

-- CREATING NEW DATABASE
CREATE DATABASE order_verification_db;
USE order_verification_db;

-- ============================================================
-- CREATING TABLE
-- ============================================================

-- CUSTOMER TABLE
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(15) UNIQUE,
    city VARCHAR(50),
    join_date DATE
);

-- PRODUCTS TABLE
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    stock_qty INT
);

-- ORDERS TABLE
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,
    order_date DATE,
    payment_type ENUM('COD','Card','UPI','Wallet'),
    status ENUM('confirmed','cancelled','pending'),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- ============================================================
-- INSERTING SAMPLE DATA
-- ============================================================

-- DUMMY CUSTOMERS
INSERT INTO customers (name, phone, city, join_date) VALUES
('Amit Sharma', '9876543210', 'Delhi', '2023-02-10'),
('Priya Verma', '9988776655', 'Mumbai', '2023-04-22'),
('Rohan Gupta', '9123456789', 'Kolkata', '2023-06-15'),
('Neha Singh', '9090909090', 'Chennai', '2023-07-19'),
('Vikas Kumar', '8800112233', 'Bhopal', '2023-08-03'),
('Tina Patel', '9334455667', 'Ahmedabad', '2023-10-12'),
('Manoj Das', '9000011122', 'Patna', '2023-11-01'),
('Kriti Jain', '8778899900', 'Jaipur', '2023-11-15');

-- DUMMY PRODUCTS 
INSERT INTO products (name, price, stock_qty) VALUES
('Bluetooth Speaker', 1500.00, 5),
('Smart Watch', 3200.00, 3),
('Wireless Earbuds', 1800.00, 10),
('Power Bank', 1200.00, 2),
('Phone Case', 300.00, 25),
('USB Cable', 150.00, 8);

-- DUMMY ORDERS
INSERT INTO orders (customer_id, product_id, quantity, order_date, payment_type, status) VALUES
(1, 1, 1, '2024-10-25', 'Card', 'confirmed'),
(1, 2, 1, '2024-10-27', 'COD', 'cancelled'),
(2, 1, 2, '2024-10-29', 'Card', 'confirmed'),
(2, 3, 1, '2024-11-01', 'UPI', 'confirmed'),
(3, 4, 2, '2024-10-26', 'COD', 'confirmed'),
(3, 4, 1, '2024-11-02', 'Card', 'pending'),
(4, 5, 5, '2024-11-01', 'Wallet', 'confirmed'),
(5, 6, 2, '2024-11-01', 'UPI', 'confirmed'),
(5, 2, 1, '2024-10-30', 'COD', 'cancelled'),
(6, 3, 2, '2024-10-20', 'Card', 'confirmed'),
(7, 1, 1, '2024-10-21', 'COD', 'cancelled'),
(8, 2, 2, '2024-11-03', 'Card', 'pending'),
(8, 3, 1, '2024-10-25', 'UPI', 'confirmed'),
(1, 1, 2, '2024-11-02', 'UPI', 'confirmed'),
(2, 4, 1, '2024-11-03', 'COD', 'pending');

-- ============================================================
-- VERIFYING QUERIES 
-- ============================================================

-- LET'S ASSUME A NEW ORDER IS BEING PLACED BY CUSTOMER WITH ID=1 FOR PRODUCT WITH ID=1 IN 3 QUANTITIES

-- CHECKING ORDER REPEATE
-- DETECT IF THE SAME CUSTOMER ORDERED THE SAME PRODUCT IN THE LAST 7 DAYS
SELECT 
    o.customer_id, 
    c.name AS customer_name,
    o.product_id, 
    p.name AS product_name,
    o.order_date
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN products p ON o.product_id = p.product_id
WHERE o.customer_id = 1
  AND o.product_id = 1
  AND o.order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);

-- VERIFING STOCK
-- CHECK IF PRODUCT STOCK IS ENOUGH FOR THE NEW ORDER QUANTITY 
SELECT 
    p.product_id,
    p.name AS product_name,
    p.stock_qty,
    CASE 
        WHEN p.stock_qty < 3 THEN 'Insufficient stock'
        ELSE 'Sufficient stock'
    END AS stock_status
FROM products p
WHERE p.product_id = 1;

-- CHECKING SUSPISIOUS QUANTITY
-- FLAG IF QUANTITY > 2× AVARAGE QUANTITY PREVIOUSLY ORDERED BY THAT CUSTOMER
SELECT 
    o.customer_id,
    c.name AS customer_name,
    o.product_id,
    p.name AS product_name,
    ROUND(AVG(o.quantity), 2) AS avg_previous_qty,
    3 AS new_order_qty,
    CASE 
        WHEN 3 > 2 * AVG(o.quantity) THEN 'Suspicious (Unusually large quantity)'
        ELSE 'Normal quantity'
    END AS quantity_check
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN products p ON o.product_id = p.product_id
WHERE o.customer_id = 1
  AND o.product_id = 1
GROUP BY o.customer_id, o.product_id;

-- PAYMENT RISK CHECKING 
-- IDENTIFING CUSTOMER WITH PREVIOUS CODE ORDER THAT WERE CANCELLED
SELECT 
    c.customer_id,
    c.name AS customer_name,
    COUNT(*) AS cancelled_cod_orders,
    CASE 
        WHEN COUNT(*) > 0 THEN 'High Risk: COD cancellations found'
        ELSE 'No COD risk'
    END AS cod_risk_status
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.payment_type = 'COD'
  AND o.status = 'cancelled'
  AND o.customer_id = 1
GROUP BY c.customer_id;

-- ============================================================
-- FINAL VERIFICATION VIEW
-- ============================================================

CREATE OR REPLACE VIEW order_verification_summary AS
SELECT
    c.customer_id,
    c.name AS customer_name,
    p.product_id,
    p.name AS product_name,
    
    -- REPEAT ORDER CHECK
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM orders o2 
            WHERE o2.customer_id = c.customer_id 
              AND o2.product_id = p.product_id
              AND o2.order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        ) THEN 'Duplicate order in last 7 days'
        ELSE 'No recent duplicate'
    END AS repeat_order_check,
    
    -- STOCK VALIDATION
    CASE 
        WHEN p.stock_qty < 3 THEN 'Insufficient stock'
        ELSE 'Sufficient stock'
    END AS stock_check,
    
    -- SUSPICIOUS QUANTITY CHECK
    CASE 
        WHEN 3 > 2 * (
            SELECT IFNULL(AVG(o3.quantity),0) 
            FROM orders o3 
            WHERE o3.customer_id = c.customer_id AND o3.product_id = p.product_id
        ) THEN 'Unusually large quantity'
        ELSE 'Normal quantity'
    END AS quantity_check,
    
    -- PAYMENT RISK CHECK 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM orders o4 
            WHERE o4.customer_id = c.customer_id
              AND o4.payment_type = 'COD'
              AND o4.status = 'cancelled'
        ) THEN 'COD cancellation history'
        ELSE 'Safe payment record'
    END AS payment_risk_check
    
FROM customers c
JOIN products p;

-- ============================================================
-- TEST FINAL VIEW
-- ============================================================
-- Example: Check validation summary for Amit Sharma (customer_id = 1) ordering product_id = 1
SELECT * FROM order_verification_summary WHERE customer_id = 1 AND product_id = 1;
