-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2023 at 08:05 AM
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
(23, 1, 38, 50, 1500),
(24, 1, 23, 50, 5000),
(25, 1, 24, 200, 35640),
(26, 1, 27, 70, 4200),
(27, 1, 30, 50, 5000);

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
(4, 'Egg item', 'Qty', 10),
(5, 'Rice item', 'Kg', 365),
(6, 'Wheat item', 'Kg', 30),
(7, 'Flour', 'Kg', 40),
(8, 'Other', 'Qty', 30);

-- --------------------------------------------------------

--
-- Table structure for table `farmers`
--

CREATE TABLE `farmers` (
  `Farmer_id` int(11) NOT NULL,
  `Farmer_name` varchar(30) NOT NULL,
  `Farmer_area` varchar(40) NOT NULL,
  `Farmer_village` varchar(30) NOT NULL,
  `Farmer_district` varchar(30) NOT NULL,
  `Farmer_contact` bigint(20) NOT NULL,
  `Farmer_email` varchar(30) NOT NULL,
  `Farmer_pass` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `farmers`
--

INSERT INTO `farmers` (`Farmer_id`, `Farmer_name`, `Farmer_area`, `Farmer_village`, `Farmer_district`, `Farmer_contact`, `Farmer_email`, `Farmer_pass`) VALUES
(1, 'Rakesh', '', '', 'Dakshina Kannada', 7760506993, 'sam@gmail.com', 'Sam@1234'),
(2, 'Joyal', '', '', 'Dakshina Kannada', 9896587756, 'joyal@gmail.com', 'temp1234*');

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
(19, 'Apple', 'Ambri', 200, 100, 'image_1688061998667.jpg', 13, 1, 0, '2023-06-29', '2023-06-29', 100, 1),
(21, 'Apple', 'Golden Delisious', 390, 250, 'image_1688062382208.jpg', 22, 1, 0, '2023-06-29', '2023-06-30', 200, 1),
(22, 'Banana', 'Cavendish', 0, 35, 'image_1689059120191.webp', 19, 1, 0, '2023-07-11', '2023-07-31', 190, 1),
(23, 'Apple', 'Ambri', 200, 100, 'image_1689062532264.jpg', 21, 1, 1, '2023-07-11', '2023-07-31', 130, 1),
(24, 'Butter Fruit', '', 200, 180, 'image_1689068400694.jpg', 24, 1, 1, '2023-07-11', '2023-07-31', 200, 1),
(25, 'Pineapple', '', 300, 50, 'image_1689068435352.jpg', 23, 1, 1, '2023-07-11', '2023-07-31', 170, 1),
(26, 'Egg', '', 80, 6, 'image_1689076648518.jpg', 22, 4, 1, '2023-07-11', '2023-07-21', 180, 1),
(27, 'Carrot', '', 70, 60, 'image_1689076783047.jpg', 13, 2, 1, '2023-07-11', '2023-07-31', 150, 2),
(28, 'Onion', '', 270, 60, 'image_1689076878914.jpg', 18, 2, 1, '2023-07-11', '2023-07-31', 120, 2),
(29, 'Cauliflower', '', 0, 30, 'image_1689076909876.png', 18, 2, 0, '2023-07-11', '2023-08-10', 190, 2),
(30, 'Coconut oil', 'Natural', 200, 100, 'image_1689076980582.jpg', 12, 3, 1, '2023-07-11', '2023-10-19', 100, 2),
(31, 'Banana', 'Cavendish', 0, 40, 'image_1691936110472.webp', 14, 1, 0, '2023-08-13', '2023-09-02', 200, 2),
(32, 'Wheat Flour', '', 200, 40, 'image_1692377227915.jpg', 18, 7, 1, '2023-08-18', '2023-09-27', 100, 1),
(33, 'Wheat', '', 300, 30, 'image_1692377292063.jpg', 16, 6, 1, '2023-08-18', '2023-09-17', 100, 1),
(34, 'Brown rice', '', 450, 50, 'image_1692377357296.jpg', 22, 5, 1, '2023-08-18', '2024-08-17', 200, 1),
(35, 'White rice', '', 350, 40, 'image_1692377395481.jpg', 24, 5, 1, '2023-08-18', '2024-08-17', 190, 1),
(36, 'Bitter gourd', '', 100, 40, 'image_1692377450550.jpg', 20, 2, 1, '2023-08-18', '2023-09-07', 180, 1),
(37, 'Lady finger', '', 200, 30, 'image_1692377488667.jpg', 23, 2, 1, '2023-08-18', '2023-09-07', 100, 1),
(38, 'Banana', 'Cavendish', 100, 30, 'image_1692377542131.webp', 21, 1, 1, '2023-08-18', '2023-09-07', 100, 1),
(39, 'Grapes', '', 300, 70, 'image_1692377581212.jpg', 14, 1, 1, '2023-08-18', '2023-09-07', 300, 1),
(40, 'Tomato', '', 200, 150, 'image_1692377617695.jpg', 18, 2, 1, '2023-08-18', '2023-09-07', 250, 1);

-- --------------------------------------------------------

--
-- Table structure for table `queries`
--

CREATE TABLE `queries` (
  `Query_id` int(11) NOT NULL,
  `Query_user` varchar(20) NOT NULL,
  `Query_user_id` int(11) NOT NULL,
  `Issue_on` varchar(30) NOT NULL,
  `Issue_id` int(11) NOT NULL,
  `Query_name` varchar(30) NOT NULL,
  `Query_description` varchar(30) NOT NULL,
  `Query_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(113, 1, 39, '2023-08-18', 50, 3500, 'Farmer cancelled the order.', 0, 0),
(114, 1, 40, '2023-08-18', 50, 7500, 'Farmer confirmed order.', 0, 250),
(115, 1, 38, '2023-08-18', 50, 1500, 'Retailer placed order.', 0, 0),
(116, 1, 33, '2023-08-18', 50, 1500, 'Waiting for retailer\'s confirmation.', 0, 200),
(117, 1, 34, '2023-08-18', 50, 2500, 'Order delivered successfully.', 1000, 200),
(118, 1, 37, '2023-08-18', 50, 1500, 'Retailer confirmed order.', 0, 300),
(119, 1, 35, '2023-08-18', 50, 2000, 'Retailer cancelled the order.', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `retailers`
--

CREATE TABLE `retailers` (
  `Retailer_id` int(11) NOT NULL,
  `Retailer_name` varchar(30) NOT NULL,
  `Retailer_area` varchar(40) NOT NULL,
  `Retailer_village` varchar(30) NOT NULL,
  `Retailer_district` varchar(30) NOT NULL,
  `Retailer_contact` bigint(20) NOT NULL,
  `Retailer_email` varchar(30) NOT NULL,
  `Retailer_pass` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `retailers`
--

INSERT INTO `retailers` (`Retailer_id`, `Retailer_name`, `Retailer_area`, `Retailer_village`, `Retailer_district`, `Retailer_contact`, `Retailer_email`, `Retailer_pass`) VALUES
(1, 'Kiran', 'Near City Center, Aloysius', 'Mangalore', 'Dakshina Kannada', 7760506993, 'sam@gmail.com', 'Sam@1234'),
(2, 'Glen', 'Near City Center, Aloysius', 'Mangalore', 'Dakshina Kannada', 8987767676, 'glen@gmail.com', 'Glen@1234'),
(3, 'John', 'Near City Center, Aloysius', 'Mangalore', 'Dakshina Kannada', 9847374763, 'john@gmail.com', 'temp1234*'),
(4, 'Lavan', 'Near City Center, Aloysius', 'Mangalore', 'Dakshina Kannada', 9837626323, 'lavan@gmail.com', 'Lavan@1234'),
(5, 'Shilton', 'Near City Center, Aloysius', 'Mangalore', 'Dakshina Kannada', 8781676767, 'shilton@gmail.com', 'Shilton@1234');

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
  MODIFY `Cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `Category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `farmers`
--
ALTER TABLE `farmers`
  MODIFY `Farmer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `Prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `queries`
--
ALTER TABLE `queries`
  MODIFY `Query_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `retailerorders`
--
ALTER TABLE `retailerorders`
  MODIFY `Order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

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
