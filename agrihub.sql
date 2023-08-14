-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2023 at 09:08 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agrihub`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `Admin_id` int(11) NOT NULL,
  `Admin_email` varchar(30) NOT NULL,
  `Admin_pass` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`Admin_id`, `Admin_email`, `Admin_pass`) VALUES
(1, 'sam@gmail.com', 'Sam@1234');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `Cart_id` int(11) NOT NULL,
  `Cart_retailer_id` int(11) NOT NULL,
  `Prod_id` int(11) NOT NULL,
  `Cart_quantity` int(11) NOT NULL,
  `Cart_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`Cart_id`, `Cart_retailer_id`, `Prod_id`, `Cart_quantity`, `Cart_price`) VALUES
(1, 2, 30, 50, 3500),
(2, 2, 29, 50, 1500),
(3, 2, 28, 50, 2000),
(4, 2, 27, 50, 3000),
(9, 2, 26, 50, 300),
(10, 2, 25, 50, 2500),
(12, 2, 27, 70, 4200),
(21, 1, 23, 50, 5000),
(22, 1, 30, 200, 13860);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `Category_id` int(11) NOT NULL,
  `Category_name` varchar(30) NOT NULL,
  `Measure` varchar(10) NOT NULL,
  `Expiry` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`Category_id`, `Category_name`, `Measure`, `Expiry`) VALUES
(1, 'Fruit', 'Kg', 20),
(2, 'Vegetable', 'Kg', 20),
(3, 'Oil', 'Ltr', 100),
(4, 'Egg items', 'Qty', 10);

-- --------------------------------------------------------

--
-- Table structure for table `farmers`
--

CREATE TABLE `farmers` (
  `Farmer_id` int(11) NOT NULL,
  `Farmer_name` varchar(30) NOT NULL,
  `Farmer_district` varchar(30) NOT NULL,
  `Farmer_contact` bigint(20) NOT NULL,
  `Farmer_email` varchar(30) NOT NULL,
  `Farmer_pass` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `farmers`
--

INSERT INTO `farmers` (`Farmer_id`, `Farmer_name`, `Farmer_district`, `Farmer_contact`, `Farmer_email`, `Farmer_pass`) VALUES
(1, 'Rakesh', 'Dakshina Kannada', 7760506993, 'sam@gmail.com', 'Sam@1234'),
(2, 'Joyal', 'Dakshina Kannada', 9896587756, 'joyal@gmail.com', 'temp1234*');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `Prod_id` int(11) NOT NULL,
  `Prod_name` varchar(30) NOT NULL,
  `Prod_type` varchar(30) NOT NULL,
  `Prod_qty` int(11) NOT NULL,
  `Prod_price` float NOT NULL,
  `Prod_image1` varchar(30) NOT NULL,
  `Prod_offer` int(11) NOT NULL,
  `Prod_cat_id` int(11) NOT NULL,
  `Prod_status` tinyint(1) NOT NULL DEFAULT 1,
  `Prod_order_date` date NOT NULL DEFAULT current_timestamp(),
  `Prod_expiry` date NOT NULL,
  `Shipping_charge` int(11) NOT NULL,
  `Farmer_id` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`Prod_id`, `Prod_name`, `Prod_type`, `Prod_qty`, `Prod_price`, `Prod_image1`, `Prod_offer`, `Prod_cat_id`, `Prod_status`, `Prod_order_date`, `Prod_expiry`, `Shipping_charge`, `Farmer_id`) VALUES
(19, 'Apple', 'Kashmir', 200, 100, 'image_1688061998667.jpg', 13, 1, 0, '2023-06-29', '2023-06-29', 100, 1),
(21, 'Apple', 'Bengal', 390, 250, 'image_1688062382208.jpg', 22, 1, 0, '2023-06-29', '2023-06-30', 200, 1),
(22, 'Banana', 'Cavandies', 200, 35, 'image_1689059120191.webp', 19, 1, 1, '2023-07-11', '2023-07-31', 190, 1),
(23, 'Apple', 'Kashmiri', 200, 100, 'image_1689062532264.jpg', 21, 1, 1, '2023-07-11', '2023-07-31', 130, 1),
(24, 'Guava', '', 200, 180, 'image_1689068400694.jpg', 24, 1, 1, '2023-07-11', '2023-07-31', 200, 1),
(25, 'Pineapple', '', 300, 50, 'image_1689068435352.jpg', 23, 1, 1, '2023-07-11', '2023-07-31', 170, 1),
(26, 'Egg', '', 80, 6, 'image_1689076648518.jpg', 22, 4, 1, '2023-07-11', '2023-07-21', 180, 1),
(27, 'Carrot', 'Gujarati', 70, 60, 'image_1689076783047.jpg', 13, 2, 1, '2023-07-11', '2023-07-31', 150, 2),
(28, 'Onion', '', 270, 40, 'image_1689076878914.jpg', 18, 2, 1, '2023-07-11', '2023-07-31', 120, 2),
(29, 'Cauliflower', '', 0, 30, 'image_1689076909876.png', 18, 2, 0, '2023-07-11', '2023-08-10', 190, 2),
(30, 'Coconut oil', 'Natural', 200, 70, 'image_1689076980582.jpg', 12, 3, 1, '2023-07-11', '2023-10-19', 100, 2),
(31, 'Banana', 'Kodagu', 0, 40, 'image_1691936110472.webp', 14, 1, 0, '2023-08-13', '2023-09-02', 200, 2);

-- --------------------------------------------------------

--
-- Table structure for table `queries`
--

CREATE TABLE `queries` (
  `Query_id` int(11) NOT NULL,
  `Farmer_id` int(11) NOT NULL,
  `Retailer_id` int(11) NOT NULL,
  `Product_id` int(11) NOT NULL,
  `Order_id` int(11) NOT NULL,
  `Query_name` varchar(30) NOT NULL,
  `Query_description` varchar(30) NOT NULL,
  `Query_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `queries`
--

INSERT INTO `queries` (`Query_id`, `Farmer_id`, `Retailer_id`, `Product_id`, `Order_id`, `Query_name`, `Query_description`, `Query_status`) VALUES
(1, 1, 0, 0, 0, 'Add Category', 'Add rice items', 'In process'),
(2, 1, 0, 0, 0, 'Add Category', 'Add oil items', 'In process'),
(3, 1, 0, 0, 0, 'Add Category', 'Add packets items', 'In process'),
(4, 2, 0, 0, 0, 'Issue on Profile', 'Forgot password', 'In process');

-- --------------------------------------------------------

--
-- Table structure for table `retailerorders`
--

CREATE TABLE `retailerorders` (
  `Order_id` int(11) NOT NULL,
  `Retailer_id` int(11) NOT NULL,
  `Prod_id` int(11) NOT NULL,
  `Order_date` date NOT NULL DEFAULT current_timestamp(),
  `Quantity` int(11) NOT NULL,
  `Price` float NOT NULL,
  `Order_status` varchar(40) NOT NULL DEFAULT 'Retailer placed order.',
  `Profit` int(11) NOT NULL,
  `Extra_charge` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `retailerorders`
--

INSERT INTO `retailerorders` (`Order_id`, `Retailer_id`, `Prod_id`, `Order_date`, `Quantity`, `Price`, `Order_status`, `Profit`, `Extra_charge`) VALUES
(101, 1, 31, '2023-08-13', 200, 7920, 'Order delivered successfully.', 10000, 200),
(102, 1, 26, '2023-08-13', 80, 480, 'Retailer cancelled the order.', 0, 400),
(103, 0, 29, '2023-08-13', 100, 10000, 'Farmer cancelled the order.', 2000, 0),
(104, 1, 28, '2023-08-13', 50, 2000, 'Order delivered successfully.', 2411, 120),
(105, 1, 24, '2023-08-13', 100, 17820, 'Retailer placed order.', 0, 0),
(106, 1, 25, '2023-08-13', 50, 2500, 'Retailer placed order.', 0, 0),
(107, 1, 30, '2023-08-13', 200, 13860, 'Retailer placed order.', 0, 0),
(108, 1, 28, '2023-08-13', 50, 2000, 'Farmer confirmed order.', 0, 120);

-- --------------------------------------------------------

--
-- Table structure for table `retailers`
--

CREATE TABLE `retailers` (
  `Retailer_id` int(11) NOT NULL,
  `Retailer_name` varchar(30) NOT NULL,
  `Retailer_district` varchar(30) NOT NULL,
  `Retailer_contact` bigint(20) NOT NULL,
  `Retailer_email` varchar(30) NOT NULL,
  `Retailer_pass` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `retailers`
--

INSERT INTO `retailers` (`Retailer_id`, `Retailer_name`, `Retailer_district`, `Retailer_contact`, `Retailer_email`, `Retailer_pass`) VALUES
(1, 'Kiran', 'Dakshina Kannada', 7760506993, 'sam@gmail.com', 'Sam@1234'),
(2, 'Glen', 'Dakshina Kannada', 8987767676, 'glen@gmail.com', 'Glen@1234'),
(3, 'John', 'Dakshina Kannada', 9847374763, 'john@gmail.com', 'temp1234*'),
(4, 'Lavan', 'Dakshina Kannada', 9837626323, 'lavan@gmail.com', 'Lavan@1234'),
(5, 'Shilton', 'Dakshina Kannada', 8781676767, 'shilton@gmail.com', 'Shilton@1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`Admin_id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`Cart_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`Category_id`);

--
-- Indexes for table `farmers`
--
ALTER TABLE `farmers`
  ADD PRIMARY KEY (`Farmer_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Prod_id`),
  ADD KEY `Prod_cat_id` (`Prod_cat_id`);

--
-- Indexes for table `queries`
--
ALTER TABLE `queries`
  ADD PRIMARY KEY (`Query_id`);

--
-- Indexes for table `retailerorders`
--
ALTER TABLE `retailerorders`
  ADD PRIMARY KEY (`Order_id`);

--
-- Indexes for table `retailers`
--
ALTER TABLE `retailers`
  ADD PRIMARY KEY (`Retailer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `Admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `Cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `Category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `farmers`
--
ALTER TABLE `farmers`
  MODIFY `Farmer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `Prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `queries`
--
ALTER TABLE `queries`
  MODIFY `Query_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `retailerorders`
--
ALTER TABLE `retailerorders`
  MODIFY `Order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `retailers`
--
ALTER TABLE `retailers`
  MODIFY `Retailer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`Prod_cat_id`) REFERENCES `categories` (`Category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `UpdateProductStatus` ON SCHEDULE EVERY 24 HOUR STARTS '2023-06-29 23:59:59' ENDS '2030-06-29 23:59:59' ON COMPLETION PRESERVE ENABLE DO UPDATE products SET Prod_status=0 WHERE Prod_expiry <= DATE_FORMAT(CURDATE(), '%Y-%m-%d')$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
