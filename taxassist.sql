-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 23, 2016 at 01:11 AM
-- Server version: 5.7.9
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taxassist`
--

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

DROP TABLE IF EXISTS `ci_sessions`;
CREATE TABLE IF NOT EXISTS `ci_sessions` (
  `id` varchar(40) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `data` blob NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ci_sessions_timestamp` (`timestamp`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `forget_password_requests`
--

DROP TABLE IF EXISTS `forget_password_requests`;
CREATE TABLE IF NOT EXISTS `forget_password_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(100) NOT NULL,
  `confirm_code` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `individual`
--

DROP TABLE IF EXISTS `individual`;
CREATE TABLE IF NOT EXISTS `individual` (
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `individual`
--

INSERT INTO `individual` (`user_id`, `id`) VALUES
(9, 4);

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
CREATE TABLE IF NOT EXISTS `organization` (
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nam_of_organizaion` varchar(255) NOT NULL,
  `type_of_organization` varchar(255) NOT NULL,
  `nature_of_business_activity` varchar(255) NOT NULL,
  `business_address` varchar(255) NOT NULL,
  `contact_person` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`user_id`, `id`, `nam_of_organizaion`, `type_of_organization`, `nature_of_business_activity`, `business_address`, `contact_person`, `designation`) VALUES
(8, 4, 'wew', 'Unincorporated', 'ewew', 'ew', 'eweewe', 'wew');

-- --------------------------------------------------------

--
-- Table structure for table `paye_employee`
--

DROP TABLE IF EXISTS `paye_employee`;
CREATE TABLE IF NOT EXISTS `paye_employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_details` varchar(1000) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paye_employee`
--

INSERT INTO `paye_employee` (`id`, `employee_details`, `user_id`) VALUES
(5, '[{"employeeName":"121","taxIdentificationNumber":"121","designation":"1212","employeeAddress":"2121","hiddenValue":"2453284663752726000"},{"employeeName":"sds","taxIdentificationNumber":"s","designation":"dsd","employeeAddress":"sdds","hiddenValue":"2776941924678438000"}]', 8);

-- --------------------------------------------------------

--
-- Table structure for table `paye_monthly`
--

DROP TABLE IF EXISTS `paye_monthly`;
CREATE TABLE IF NOT EXISTS `paye_monthly` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `month` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `tax_no` varchar(255) DEFAULT NULL,
  `tax_id` varchar(255) DEFAULT NULL,
  `state_bir` varchar(255) DEFAULT NULL,
  `tax_station_code` varchar(255) DEFAULT NULL,
  `monthly_values` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paye_monthly`
--

INSERT INTO `paye_monthly` (`id`, `user_id`, `month`, `year`, `tax_no`, `tax_id`, `state_bir`, `tax_station_code`, `monthly_values`) VALUES
(1, 8, NULL, NULL, '', '', '', '', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `paye_monthly_archives`
--

DROP TABLE IF EXISTS `paye_monthly_archives`;
CREATE TABLE IF NOT EXISTS `paye_monthly_archives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `month` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `tax_no` varchar(255) DEFAULT NULL,
  `tax_id` varchar(255) DEFAULT NULL,
  `state_bir` varchar(255) DEFAULT NULL,
  `tax_station_code` varchar(255) DEFAULT NULL,
  `monthly_values` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paye_monthly_archives`
--

INSERT INTO `paye_monthly_archives` (`id`, `user_id`, `month`, `year`, `tax_no`, `tax_id`, `state_bir`, `tax_station_code`, `monthly_values`) VALUES
(2, 8, NULL, NULL, '', '', '', '', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role`) VALUES
(1, 'Individual'),
(2, 'Organization');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `role_id` int(11) NOT NULL,
  `is_email_verified` varchar(100) NOT NULL,
  `email_verified_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role_id`, `is_email_verified`, `email_verified_hash`, `created_at`) VALUES
(8, 'ewwe', 'udeepharsha@gmail.com', '$2y$10$5H4bhKSW/79zaPVlece.p.lKB8i61D.sc3Z6bqYg.YW3ZlZ3J7JHm', 2, 'true', 'b056eb1587586b71e2da9acfe4fbd19e', '2016-08-21 20:48:33'),
(9, 'udeepha', 'udeepha@gmail.com', '$2y$10$4PkdwJ3d8nn086n3bTrV7.Qo/6QV.o0IMjmnn9ybIrJHj/pqMn9J.', 1, 'true', 'cdc0d6e63aa8e41c89689f54970bb35f', '2016-08-21 20:48:48');

-- --------------------------------------------------------

--
-- Table structure for table `vat`
--

DROP TABLE IF EXISTS `vat`;
CREATE TABLE IF NOT EXISTS `vat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `month_under_review` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `year_under_review` varchar(255) DEFAULT NULL,
  `vat_no` varchar(255) DEFAULT NULL,
  `firs_tax_office` varchar(255) DEFAULT NULL,
  `output_sales_income` varchar(255) DEFAULT NULL,
  `exempted_zero` varchar(255) DEFAULT NULL,
  `total_supplies_vat` varchar(255) DEFAULT NULL,
  `output_vat` varchar(255) DEFAULT NULL,
  `vat_on_local_supplies` varchar(255) DEFAULT NULL,
  `vat_on_imported_goods` varchar(255) DEFAULT NULL,
  `vat_on_subcontracted` varchar(255) DEFAULT NULL,
  `total_input_tax_claimable` varchar(255) DEFAULT NULL,
  `excess_input_vat` varchar(255) DEFAULT NULL,
  `vat_payable_for_month` varchar(255) DEFAULT NULL,
  `authorized_signatory` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `signature` varchar(255) DEFAULT NULL,
  `company_stamp_and_date` varchar(255) DEFAULT NULL,
  `tax_no` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vat`
--

INSERT INTO `vat` (`id`, `month_under_review`, `year_under_review`, `vat_no`, `firs_tax_office`, `output_sales_income`, `exempted_zero`, `total_supplies_vat`, `output_vat`, `vat_on_local_supplies`, `vat_on_imported_goods`, `vat_on_subcontracted`, `total_input_tax_claimable`, `excess_input_vat`, `vat_payable_for_month`, `authorized_signatory`, `designation`, `signature`, `company_stamp_and_date`, `tax_no`, `user_id`) VALUES
(11, 'January', '2050', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 8);

-- --------------------------------------------------------

--
-- Table structure for table `vat_archives`
--

DROP TABLE IF EXISTS `vat_archives`;
CREATE TABLE IF NOT EXISTS `vat_archives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `month_under_review` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `year_under_review` varchar(255) DEFAULT NULL,
  `vat_no` varchar(255) DEFAULT NULL,
  `firs_tax_office` varchar(255) DEFAULT NULL,
  `output_sales_income` varchar(255) DEFAULT NULL,
  `exempted_zero` varchar(255) DEFAULT NULL,
  `total_supplies_vat` varchar(255) DEFAULT NULL,
  `output_vat` varchar(255) DEFAULT NULL,
  `vat_on_local_supplies` varchar(255) DEFAULT NULL,
  `vat_on_imported_goods` varchar(255) DEFAULT NULL,
  `vat_on_subcontracted` varchar(255) DEFAULT NULL,
  `total_input_tax_claimable` varchar(255) DEFAULT NULL,
  `excess_input_vat` varchar(255) DEFAULT NULL,
  `vat_payable_for_month` varchar(255) DEFAULT NULL,
  `authorized_signatory` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `signature` varchar(255) DEFAULT NULL,
  `company_stamp_and_date` varchar(255) DEFAULT NULL,
  `tax_no` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vat_archives`
--

INSERT INTO `vat_archives` (`id`, `month_under_review`, `year_under_review`, `vat_no`, `firs_tax_office`, `output_sales_income`, `exempted_zero`, `total_supplies_vat`, `output_vat`, `vat_on_local_supplies`, `vat_on_imported_goods`, `vat_on_subcontracted`, `total_input_tax_claimable`, `excess_input_vat`, `vat_payable_for_month`, `authorized_signatory`, `designation`, `signature`, `company_stamp_and_date`, `tax_no`, `user_id`) VALUES
(12, 'January', '2050', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 8);

-- --------------------------------------------------------

--
-- Table structure for table `wht`
--

DROP TABLE IF EXISTS `wht`;
CREATE TABLE IF NOT EXISTS `wht` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `month_covered` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `tax_no` varchar(255) DEFAULT NULL,
  `firs_tax_office` varchar(255) DEFAULT NULL,
  `state_tax_filling_office` varchar(255) DEFAULT NULL,
  `tax_station_code` varchar(255) DEFAULT NULL,
  `suppliers_of_service` varchar(255) DEFAULT NULL,
  `suppliers_of_goods` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wht`
--

INSERT INTO `wht` (`id`, `user_id`, `month_covered`, `year`, `tax_no`, `firs_tax_office`, `state_tax_filling_office`, `tax_station_code`, `suppliers_of_service`, `suppliers_of_goods`) VALUES
(2, '8', 'January', '2050', '123', '', '', '', '[]', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `wht_archives`
--

DROP TABLE IF EXISTS `wht_archives`;
CREATE TABLE IF NOT EXISTS `wht_archives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `month_covered` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `tax_no` varchar(255) DEFAULT NULL,
  `firs_tax_office` varchar(255) DEFAULT NULL,
  `state_tax_filling_office` varchar(255) DEFAULT NULL,
  `tax_station_code` varchar(255) DEFAULT NULL,
  `suppliers_of_service` varchar(255) DEFAULT NULL,
  `suppliers_of_goods` varchar(255) DEFAULT NULL,
  `month_archived` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wht_archives`
--

INSERT INTO `wht_archives` (`id`, `user_id`, `month_covered`, `year`, `tax_no`, `firs_tax_office`, `state_tax_filling_office`, `tax_station_code`, `suppliers_of_service`, `suppliers_of_goods`, `month_archived`) VALUES
(3, '8', 'January', '2050', '123', '', '', '', '[]', '[]', 'January 2050');

-- --------------------------------------------------------

--
-- Table structure for table `wht_individual`
--

DROP TABLE IF EXISTS `wht_individual`;
CREATE TABLE IF NOT EXISTS `wht_individual` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `month_covered` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `tax_no` varchar(255) DEFAULT NULL,
  `firs_tax_office` varchar(255) DEFAULT NULL,
  `state_tax_filling_office` varchar(255) DEFAULT NULL,
  `tax_station_code` varchar(255) DEFAULT NULL,
  `suppliers_of_service` varchar(255) DEFAULT NULL,
  `suppliers_of_goods` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wht_individual`
--

INSERT INTO `wht_individual` (`id`, `user_id`, `month_covered`, `year`, `tax_no`, `firs_tax_office`, `state_tax_filling_office`, `tax_station_code`, `suppliers_of_service`, `suppliers_of_goods`) VALUES
(3, '8', NULL, NULL, '', '', '', '', '[]', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `wht_individual_archives`
--

DROP TABLE IF EXISTS `wht_individual_archives`;
CREATE TABLE IF NOT EXISTS `wht_individual_archives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `month_covered` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `tax_no` varchar(255) DEFAULT NULL,
  `firs_tax_office` varchar(255) DEFAULT NULL,
  `state_tax_filling_office` varchar(255) DEFAULT NULL,
  `tax_station_code` varchar(255) DEFAULT NULL,
  `suppliers_of_service` varchar(255) DEFAULT NULL,
  `suppliers_of_goods` varchar(255) DEFAULT NULL,
  `month_archived` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wht_individual_archives`
--

INSERT INTO `wht_individual_archives` (`id`, `user_id`, `month_covered`, `year`, `tax_no`, `firs_tax_office`, `state_tax_filling_office`, `tax_station_code`, `suppliers_of_service`, `suppliers_of_goods`, `month_archived`) VALUES
(4, '8', NULL, NULL, '', '', '', '', '[]', '[]', ' ');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
