-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2023 at 04:06 PM
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
(33, 1, 47, 50, 5000),
(34, 1, 43, 100, 9900),
(38, 4, 43, 100, 10000),
(40, 1, 59, 100, 14000),
(43, 1, 57, 50, 5000),
(54, 1, 64, 50, 5000);

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
(8, 'Other', 'Qty', 30),
(9, 'Coffee item', 'Kg', 100);

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
(1, 'Rakesh', 'SDM', 'Belthangady', 'Udupi', 7760506993, 'sam@gmail.com', 'Sam@1234'),
(2, 'Joyal', 'Belma', 'Konaje', 'Dakshina Kannada', 9896587756, 'joyal@gmail.com', 'Joyal@1234');

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
(41, 'White rice', '', 1000, 40, 'image_1692698086456.jpg', 19, 5, 1, '2023-08-22', '2024-08-21', 200, 1),
(42, 'Wheat flour', '', 500, 100, 'image_1692698174601.jpg', 21, 7, 1, '2023-08-22', '2023-10-21', 400, 1),
(43, 'Tomato', '', 200, 100, 'image_1692698402646.jpg', 11, 2, 1, '2023-08-22', '2023-09-11', 200, 1),
(44, 'Pineapple', '', 100, 55, 'image_1692698454887.jpg', 21, 1, 1, '2023-08-22', '2023-09-11', 100, 1),
(45, 'Ladyfinger', 'Organic', 50, 60, 'image_1692698534292.jpg', 25, 2, 1, '2023-08-22', '2023-09-11', 100, 1),
(46, 'Egg', '', 100, 5, 'image_1692698581419.jpg', 16, 4, 1, '2023-08-22', '2023-09-01', 100, 1),
(47, 'Coconut oil', '', 200, 100, 'image_1692698610494.jpg', 21, 3, 1, '2023-08-22', '2023-11-30', 100, 1),
(48, 'Carrot', '', 50, 58, 'image_1692698645034.jpg', 15, 2, 1, '2023-08-22', '2023-09-11', 250, 1),
(49, 'Brown rice', '', 500, 50, 'image_1692698681094.jpg', 22, 5, 1, '2023-08-22', '2024-08-21', 500, 1),
(50, 'Banana', 'Cavendish', 100, 35, 'image_1692698730955.webp', 10, 1, 1, '2023-08-22', '2023-09-11', 200, 1),
(51, 'Wheat', '', 350, 60, 'image_1692699841486.jpg', 12, 6, 1, '2023-08-22', '2023-09-21', 250, 2),
(52, 'Toor dal', '', 150, 43, 'image_1692699898447.jpg', 23, 8, 1, '2023-08-22', '2023-09-21', 100, 2),
(53, 'Sunflower oil', '', 50, 100, 'image_1692699958273.png', 21, 3, 1, '2023-08-22', '2023-11-30', 50, 2),
(54, 'Onion', '', 550, 38, 'image_1692699999431.jpg', 13, 2, 1, '2023-08-22', '2023-09-11', 500, 2),
(55, 'Bitter gourd', '', 50, 100, 'image_1692700051428.jpg', 25, 2, 1, '2023-08-22', '2023-09-11', 50, 2),
(56, 'Cauliflower', '', 100, 30, 'image_1692700102844.png', 19, 2, 1, '2023-08-22', '2023-09-11', 50, 2),
(57, 'Grapes', 'Kashmiri', 100, 100, 'image_1692700147897.jpg', 10, 1, 1, '2023-08-22', '2023-09-11', 290, 2),
(58, 'Coffee', '', 100, 100, 'image_1692700229163.jpg', 25, 8, 1, '2023-08-22', '2023-09-21', 300, 2),
(59, 'Butter fruit', '', 0, 140, 'image_1692700257959.jpg', 12, 1, 0, '2023-08-22', '2023-09-11', 100, 2),
(60, 'Apple', '', 0, 100, 'image_1692700297685.jpg', 17, 1, 0, '2023-08-22', '2023-09-11', 100, 2),
(61, 'Butter fruit', '', 150, 120, 'image_1692700868361.jpg', 17, 1, 1, '2023-08-22', '2023-09-11', 100, 1),
(62, 'Onion', '', 150, 34, 'image_1692700926859.jpg', 15, 2, 1, '2023-08-22', '2023-09-11', 342, 1),
(63, 'Apple', 'Kashmiri', 150, 80, 'image_1692700958737.jpg', 13, 1, 1, '2023-08-22', '2023-09-11', 300, 1),
(64, 'Apple', '', 0, 100, 'image_1692707858508.jpg', 22, 1, 0, '2023-08-22', '2023-09-11', 100, 1),
(66, 'Mango', '', 100, 200, 'image_1692709442386.jpg', 20, 1, 1, '2023-08-22', '2023-09-11', 100, 1);

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
  `Query_description` varchar(100) NOT NULL,
  `Query_reply` varchar(100) NOT NULL,
  `Query_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `queries`
--

INSERT INTO `queries` (`Query_id`, `Query_user`, `Query_user_id`, `Issue_on`, `Issue_id`, `Query_name`, `Query_description`, `Query_reply`, `Query_status`) VALUES
(7, 'farmer', 2, 'category', 0, 'Add Category', 'Add coffee item', 'Successfully added.', 'Solved'),
(8, 'farmer', 1, 'farmer', 1, 'Issue on Profile', 'Change email.', 'Redirect to Profile -> My profile -> Change email -> Enter the new email, Follow this procedure.', 'Solved'),
(9, 'farmer', 1, 'order', 1, 'Issue on Order', 'Not confirmed after waiting for 2 days.', 'Query solved', 'Solved'),
(10, 'farmer', 1, 'product', 43, 'Issue on Product', 'Want to change the price to 50.', '', 'In process'),
(11, 'farmer', 1, 'category', 0, 'Add Category', 'Add coffee item as category.', '', 'In process'),
(12, 'farmer', 1, 'other', 0, 'Other', 'Please help me with the retailer information', '', 'In process'),
(13, 'retailer', 1, 'retailer', 1, 'Issue on Profile', 'I Want to change the address.', '', 'In process'),
(14, 'retailer', 1, 'order', 137, 'Issue on Order', 'I want to change the quantity.', '', 'In process');

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
(120, 1, 45, '2023-08-22', 50, 3000, 'Waiting for retailer\'s confirmation.', 0, 250),
(121, 1, 46, '2023-08-22', 50, 250, 'Farmer confirmed order.', 0, 100),
(122, 1, 50, '2023-08-22', 50, 1750, 'Retailer cancelled the order.', 0, 200),
(123, 1, 49, '2023-08-22', 150, 7500, 'Retailer cancelled the order.', 0, 0),
(124, 4, 50, '2023-08-22', 100, 3500, 'Farmer confirmed order.', 0, 200),
(125, 4, 41, '2023-08-22', 100, 4000, 'Farmer cancelled the order.', 0, 0),
(126, 4, 44, '2023-08-22', 100, 5445, 'Farmer confirmed order.', 0, 100),
(127, 1, 54, '2023-08-22', 150, 5643, 'Farmer confirmed order.', 0, 500),
(128, 1, 53, '2023-08-22', 50, 5000, 'Order delivered successfully.', 2000, 50),
(129, 1, 55, '2023-08-22', 50, 5000, 'Retailer placed order.', 0, 0),
(130, 1, 52, '2023-08-22', 50, 2150, 'Waiting for retailer\'s confirmation.', 0, 200),
(131, 1, 60, '2023-08-22', 70, 7000, 'Farmer cancelled the order.', 0, 0),
(132, 2147483646, 62, '2023-08-22', 100, 3000, 'Sold to your customer.', 1500, 0),
(133, 1, 63, '2023-08-22', 50, 4000, 'Order delivered successfully.', 1265, 300),
(134, 1, 62, '2023-08-22', 50, 1700, 'Order delivered successfully.', 1500, 342),
(135, 1, 61, '2023-08-22', 50, 6000, 'Order delivered successfully.', 1000, 100),
(136, 1, 60, '2023-08-22', 70, 7000, 'Order delivered successfully.', 20000, 100),
(137, 1, 59, '2023-08-22', 200, 27720, 'Order delivered successfully.', 10000, 100),
(138, 1, 53, '2021-08-04', 100, 9900, 'Order delivered successfully.', 6000, 50),
(139, 1, 52, '2023-02-08', 50, 2150, 'Order delivered successfully.', 500, 100),
(140, 1, 51, '2023-08-22', 50, 3000, 'Order delivered successfully.', 1300, 250),
(141, 1, 54, '2023-06-30', 50, 1900, 'Order delivered successfully.', 800, 500),
(142, 4, 46, '2023-08-22', 100, 495, 'Order delivered successfully.', 200, 100),
(143, 4, 48, '2023-08-22', 50, 2900, 'Order delivered successfully.', 2000, 250),
(144, 4, 45, '2023-08-22', 50, 3000, 'Order delivered successfully.', 1000, 100),
(145, 1, 45, '2023-08-22', 50, 3000, 'Order delivered successfully.', 500, 100),
(146, 1, 64, '2023-08-22', 100, 9900, 'Order delivered successfully.', 1000, 100),
(147, 1, 66, '2023-08-22', 50, 10000, 'Farmer confirmed order.', 0, 100),
(148, 1, 53, '2023-08-22', 50, 5000, 'Retailer placed order.', 0, 0);

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
(2, 'Glen', 'SDM', 'Puttur', 'Dakshina Kannada', 8987767676, 'glen@gmail.com', 'Glen@1234'),
(3, 'John', 'Near City Center, Aloysius', 'Mangalore', 'Dakshina Kannada', 9847374763, 'john@gmail.com', 'temp1234*'),
(4, 'Lavan', 'Adyar', 'Mangalore', 'Dakshina Kannada', 9837626323, 'lavan@gmail.com', 'Lavan@1234'),
(5, 'Shilton', 'Kumta', 'Honnavar', 'Dakshina Kannada', 8781676767, 'shilton@gmail.com', 'Shilton@1234');

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
  MODIFY `Cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `Category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `farmers`
--
ALTER TABLE `farmers`
  MODIFY `Farmer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `Prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `queries`
--
ALTER TABLE `queries`
  MODIFY `Query_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `retailerorders`
--
ALTER TABLE `retailerorders`
  MODIFY `Order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

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
