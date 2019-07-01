/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80016
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 80016
File Encoding         : 65001

Date: 2019-07-01 21:14:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `seller` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `goodsname` varchar(255) DEFAULT NULL,
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------

-- ----------------------------
-- Table structure for seller
-- ----------------------------
DROP TABLE IF EXISTS `seller`;
CREATE TABLE `seller` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `banner` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `sellername` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of seller
-- ----------------------------
INSERT INTO `seller` VALUES ('1', '1', '1', '1', '1');
INSERT INTO `seller` VALUES ('2', '/static\\images\\g-Psc81jC_dIkuBcQOUCVPvx.jpg', '/static\\images\\KsbZbji1_zCAQUq2FaVC33Hi.jpg', '4', '4');
INSERT INTO `seller` VALUES ('3', '/static\\images\\YLHAkjkFM6WIOg6ORytf5a3J.jpg', '/static\\images\\tl9uYuVYomTII0iYjEYxx5c6.jpg', '4', '5');
INSERT INTO `seller` VALUES ('4', '/static\\images\\av-LFn_zCDTPUM3_ttAI1_-9.jpg', '/static\\images\\hs85s7tOgia-nps1sXamj1oZ.jpg', '5', '6');
INSERT INTO `seller` VALUES ('5', '/static\\images\\dAo3ecL9i_Fdr7PN5EZmxIb-.jpg', '/static\\images\\6PKQ6BtFfjjOzY8PtUBwWY1I.jpg', '7', '7');
