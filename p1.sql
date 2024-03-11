-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 11, 2024 at 12:21 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `p1`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `cat_id` int NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(200) NOT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=MyISAM AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`) VALUES
(91, 'Discount'),
(89, 'Slider'),
(86, 'New'),
(84, 'Popular'),
(79, 'Hot');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `pro_id` int NOT NULL AUTO_INCREMENT,
  `pro_name` varchar(250) NOT NULL,
  `cat_id` int NOT NULL,
  `pro_price` float NOT NULL,
  `pro_cal` int NOT NULL,
  `pro_des` text NOT NULL,
  `pro_dis` int NOT NULL,
  `pro_img` text NOT NULL,
  PRIMARY KEY (`pro_id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`pro_id`, `pro_name`, `cat_id`, `pro_price`, `pro_cal`, `pro_des`, `pro_dis`, `pro_img`) VALUES
(1, 'Thor Wilkins', 84, 1.34, 350, 'At rerum eos vitae', 45, '65e91e529c0b4_1709776466.png'),
(11, 'Ferris Branch', 89, 841, 350, 'Cum quo iure explica', 45, '65e95af3bc7d9_1709791987.png'),
(3, 'Nichole Ballard', 86, 1.9, 250, 'Dolorem adipisicing', 35, '65e91e933760b_1709776531.png'),
(10, 'Kenyon Horn', 84, 962, 0, 'Temporibus exercitat', 0, '65e957e4a0d67_1709791204.png'),
(12, 'testedit', 89, 89, 1, '120', 0, '65e95b3817964_1709792056.png'),
(14, 'Eugenia Moody', 91, 1.45, 450, 'sfsdfsdfsdfsdfsdf', 45, '65e95bd6a8bf3_1709792214.png'),
(15, 'Alea Decker', 89, 1.25, 120, 'Et quis fuga Dolore', 25, '65e95ca50d4e1_1709792421.png'),
(16, 'Tasha Nicholsdd', 91, 91, 91, '91', 2, '65e95d299cd34_1709792553.png'),
(17, 'Lillith Perez', 89, 146, 540, 'Perferendis incididu', 45, '65e98cca75ce6_1709804746.png'),
(20, 'Keefe Mcpherson', 89, 1.55, 250, 'Incidunt dolor prov', 55, '65e99ecccd60b_1709809356.png'),
(19, 'Megan Price', 89, 2.22, 350, 'Sapiente ex ut et co', 50, '65e99b727f530_1709808498.png'),
(23, 'Minerva Shelton', 91, 562, 0, 'Ea odit porro est n', 0, '65ee8e79b63f7_1710132857.png'),
(24, 'Clementine Gordon', 84, 664, 450, 'Pariatur Cupiditate', 50, '65eee0c389162_1710153923.png'),
(25, 'Samuel Russo', 84, 1.89, 450, 'Optio tenetur sit', 50, '65eee1f59057a_1710154229.png');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `username` varchar(120) NOT NULL,
  `password` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`) VALUES
(36, 'testedit555555555', 'sdfsdfdsfdf', 111),
(37, 'sdfdsfsdfdfd', 'edit', 444),
(5, 'chetra', 'chetra', 123),
(6, 'u1', 'u1', 123),
(7, 'u2', 'u2', 123),
(35, 'yona', 'yona', 123),
(10, 'test1', 'test1', 123),
(11, 'test2', 'test2', 123),
(12, 'test3', 'test3', 123),
(13, 'chetra', 'chetra', 1233),
(14, 'cheata', 'cheata', 123);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
