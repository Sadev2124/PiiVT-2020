/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MariaDB
 Source Server Version : 100510
 Source Host           : localhost:3306
 Source Schema         : elektronski_dnevnik

 Target Server Type    : MariaDB
 Target Server Version : 100510
 File Encoding         : 65001

 Date: 13/09/2021 01:22:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for mark
-- ----------------------------
DROP TABLE IF EXISTS `mark`;
CREATE TABLE `mark`  (
  `mark_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `mark` int(10) UNSIGNED NOT NULL,
  `type` enum('first_trimester','second_trimester','semester_mark','final_mark') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `professor_id` int(10) UNSIGNED NOT NULL,
  `student_id` int(10) UNSIGNED NOT NULL,
  `subject_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`mark_id`) USING BTREE,
  INDEX `fk_mark_professor_id`(`professor_id`) USING BTREE,
  INDEX `fk_mark_student_id`(`student_id`) USING BTREE,
  INDEX `fk_mark_subject_id`(`subject_id`) USING BTREE,
  CONSTRAINT `fk_mark_professor_id` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`professor_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_mark_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_mark_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mark
-- ----------------------------

-- ----------------------------
-- Table structure for professor
-- ----------------------------
DROP TABLE IF EXISTS `professor`;
CREATE TABLE `professor`  (
  `professor_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`professor_id`) USING BTREE,
  INDEX `fk_professor_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `fk_professor_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of professor
-- ----------------------------
INSERT INTO `professor` VALUES (1, 'Sanja', 'Golubovic', 1);
INSERT INTO `professor` VALUES (2, 'Marija', 'Simic', 2);
INSERT INTO `professor` VALUES (3, 'Stefan', 'Stefanovic', 3);
INSERT INTO `professor` VALUES (4, 'Petar', 'Peric', 4);

-- ----------------------------
-- Table structure for professor_subject
-- ----------------------------
DROP TABLE IF EXISTS `professor_subject`;
CREATE TABLE `professor_subject`  (
  `professor_subject_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `professor_id` int(10) UNSIGNED NOT NULL,
  `subject_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`professor_subject_id`) USING BTREE,
  INDEX `fk_professor_subject_professor_id`(`professor_id`) USING BTREE,
  INDEX `fk_professor_subject_subject_id`(`subject_id`) USING BTREE,
  CONSTRAINT `fk_professor_subject_professor_id` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`professor_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_professor_subject_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of professor_subject
-- ----------------------------
INSERT INTO `professor_subject` VALUES (1, 1, 1);
INSERT INTO `professor_subject` VALUES (2, 1, 8);
INSERT INTO `professor_subject` VALUES (3, 2, 3);
INSERT INTO `professor_subject` VALUES (4, 2, 4);
INSERT INTO `professor_subject` VALUES (5, 3, 5);
INSERT INTO `professor_subject` VALUES (6, 3, 6);
INSERT INTO `professor_subject` VALUES (7, 4, 2);
INSERT INTO `professor_subject` VALUES (8, 4, 7);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `student_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `jmbg` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`student_id`) USING BTREE,
  UNIQUE INDEX `uq_student_email`(`email`) USING BTREE,
  INDEX `fk_student_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `fk_student_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, 'Marko', 'Milenkovic', '1209998849533', 'marko@gmail.com', '0634567584', 'Gruzijska 9', 5);
INSERT INTO `student` VALUES (2, 'Lazar', 'Boskovvic', '0505997867511', 'lazar@gmail.com', '0617638293', 'Smiljaniceva 2', 6);
INSERT INTO `student` VALUES (3, 'Ana', 'Nikolic', '2609995987899', 'ana@gmail.com', '0657849321', 'Maksima Gorkog 5', 7);
INSERT INTO `student` VALUES (4, 'Ivana', 'Ivanovic', '1512998983422', 'ivana@gmail.com', '0612376894', 'Vojvode Stepe 23', 8);
INSERT INTO `student` VALUES (5, 'Tamara', 'Miskovic', '2405997893477', 'tamara@gmail.com', '0625364765', 'Izvorska 11', 9);
INSERT INTO `student` VALUES (6, 'Jovan', 'Jovanovic', '0101996876388', 'jovan@gmail.com', '0638745992', 'Njegoseva 54', 10);
INSERT INTO `student` VALUES (7, 'Pavle', 'Kuznecov', '2909995782344', 'pavle@gmail.com', '0654356774', 'Njegoseva 5', 11);
INSERT INTO `student` VALUES (8, 'Ivan', 'Stojkovic', '1306997657488', 'ivan@gmail.com', '0608756473', 'Brace Jerkovic 18', 12);

-- ----------------------------
-- Table structure for student_subject
-- ----------------------------
DROP TABLE IF EXISTS `student_subject`;
CREATE TABLE `student_subject`  (
  `student_subject_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_id` int(10) UNSIGNED NOT NULL,
  `subject_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`student_subject_id`) USING BTREE,
  INDEX `fk_student_subject_student_id`(`student_id`) USING BTREE,
  INDEX `fk_student_subject_subject_id`(`subject_id`) USING BTREE,
  CONSTRAINT `fk_student_subject_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_student_subject_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student_subject
-- ----------------------------
INSERT INTO `student_subject` VALUES (1, 1, 1);
INSERT INTO `student_subject` VALUES (2, 1, 6);
INSERT INTO `student_subject` VALUES (3, 2, 2);
INSERT INTO `student_subject` VALUES (4, 2, 7);
INSERT INTO `student_subject` VALUES (5, 2, 8);
INSERT INTO `student_subject` VALUES (6, 3, 3);
INSERT INTO `student_subject` VALUES (7, 3, 5);
INSERT INTO `student_subject` VALUES (8, 4, 4);
INSERT INTO `student_subject` VALUES (9, 4, 6);
INSERT INTO `student_subject` VALUES (10, 5, 4);
INSERT INTO `student_subject` VALUES (11, 5, 1);
INSERT INTO `student_subject` VALUES (12, 5, 8);
INSERT INTO `student_subject` VALUES (13, 6, 7);
INSERT INTO `student_subject` VALUES (14, 6, 1);
INSERT INTO `student_subject` VALUES (15, 7, 2);
INSERT INTO `student_subject` VALUES (16, 7, 3);
INSERT INTO `student_subject` VALUES (17, 7, 5);
INSERT INTO `student_subject` VALUES (18, 8, 2);
INSERT INTO `student_subject` VALUES (19, 8, 8);
INSERT INTO `student_subject` VALUES (20, 8, 4);

-- ----------------------------
-- Table structure for subject
-- ----------------------------
DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject`  (
  `subject_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`subject_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subject
-- ----------------------------
INSERT INTO `subject` VALUES (1, 'Matematika');
INSERT INTO `subject` VALUES (2, 'Srpski');
INSERT INTO `subject` VALUES (3, 'Fizika');
INSERT INTO `subject` VALUES (4, 'Hemija');
INSERT INTO `subject` VALUES (5, 'Muzicko');
INSERT INTO `subject` VALUES (6, 'Likovno');
INSERT INTO `subject` VALUES (7, 'Informatika');
INSERT INTO `subject` VALUES (8, 'Tehnicko');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `uq_user_username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'pSanjaGolubovic', '$2y$10$lCe3GC0zweWOFVmNfSQC2O6ddaHg9GwrBibjQjSEICP450f0F3mnq');
INSERT INTO `user` VALUES (2, 'pMarijaSimic', '$2y$10$3zHtFNaesrV70c6WNZJFfOO4hgEoGLaPKxZwyu9Y.at7cjhRzFJfO');
INSERT INTO `user` VALUES (3, 'pStefanStefanovic', '$2y$10$WBdABz5hoIlmjpXVwARzF.5HEers99Ad9FXBjkY0sMMy0jfF48gJe');
INSERT INTO `user` VALUES (4, 'pPeraPeric', '$2y$10$LXStHMZqkngrkaLbuWTvuOakTZo1hL6C61ct.z06D8amw0h8F2vY6');
INSERT INTO `user` VALUES (5, 'sMarkoMilenkovic', '$2y$10$84rAuA49MlmEcFOP01YsIOnhTeNrYGnbIMiepC4qf45a6lT/ErM9O');
INSERT INTO `user` VALUES (6, 'sLazarBoskovic', '$2y$10$1fXM3dyKN8elND.MKAWkIuSvi079qbKNt2x5nO.IlDgwKA3u70./C');
INSERT INTO `user` VALUES (7, 'sAnaNikolic', '$2y$10$rdipNySxJ.zOBhzBAzo.t.sVDBP.ZUn9dV3ogwOZyIGVSas4HcaW2');
INSERT INTO `user` VALUES (8, 'sIvanaIvanovic', '$2y$10$hSSXeV9g5Bf1iLZQEx.PhOuLHP8dU18xTQC4T1NTFWWLiFPY5TEEa');
INSERT INTO `user` VALUES (9, 'sTamaraMiskovic', '$2y$10$3hDs1L4Hz0JeIEHlK0JQa.NEWAg/0QLQoEN8r0dgyHoCCFhys0M2q');
INSERT INTO `user` VALUES (10, 'sJovanJovanovic', '$2y$10$HS1z1kkM37WVM1JfU4vZmegqarPHrMgjupQUfMyPrtXfgnd8tOXK2');
INSERT INTO `user` VALUES (11, 'sPavleKuznecov', '$2y$10$w7Byw/ApltZOT8Rn.Aqzxe4.jZ9OeNAMEzdsJq66g.cWPkB.8e0K6');
INSERT INTO `user` VALUES (12, 'sIvanStojkovic', '$2y$10$zuwBPn/wYYgU2K77rPzdkeiFS0Oqsk7MfdVkkYsavwNDfLVlsD1EW');

SET FOREIGN_KEY_CHECKS = 1;
