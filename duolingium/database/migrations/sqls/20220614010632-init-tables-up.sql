CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `itemId` varchar(8) CHARACTER SET latin1 NOT NULL,
  `moduleId` varchar(8) CHARACTER SET latin1 NOT NULL,
  `native` varchar(45) NOT NULL,
  `english` varchar(45) NOT NULL,
  PRIMARY KEY (`itemId`),
  KEY `moduleId_idx` (`moduleId`),
  CONSTRAINT `moduleId` FOREIGN KEY (`moduleId`) REFERENCES `module` (`moduleId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES ('03ed2674','947f1764','라','ra'),('51127610','947f1764','마','ma'),('58865fca','76e4aca6','사과','apple'),('7c1ba7b1','76e4aca6','쌀','rice'),('9cf1cbab','76e4aca6','강아지','dog'),('a2f1e3e2','947f1764','다','da'),('b6e27b3d','76e4aca6','사람','human'),('cbf751d6','947f1764','나','na'),('e707ed7c','947f1764','가','ka'),('ff32b3b3','76e4aca6','고양이','cat');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `languageId` varchar(2) CHARACTER SET latin1 NOT NULL,
  `englishName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `nativeName` varchar(45) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`languageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES ('jp','Japanese','日本語'),('kr','Korean','한글');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `run_on` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'/20220614010632-init-tables','2022-06-15 06:34:42'),(2,'/20220614010632-init-tables','2022-06-15 12:08:14'),(3,'/20220614010632-init-tables','2022-06-15 12:18:59'),(4,'/20220614010632-init-tables','2022-06-15 12:38:39'),(5,'/20220614010632-init-tables','2022-06-15 13:10:52');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `moduleId` varchar(8) CHARACTER SET latin1 NOT NULL,
  `languageId` varchar(2) CHARACTER SET latin1 NOT NULL,
  `type` varchar(45) CHARACTER SET latin1 NOT NULL,
  `displayName` varchar(45) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`moduleId`),
  KEY `languageid_idx` (`languageId`),
  CONSTRAINT `languageid` FOREIGN KEY (`languageId`) REFERENCES `language` (`languageId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES ('1a0b034f','jp','vocabulary','Vocabulary'),('76e4aca6','kr','vocabulary','Vocabulary (Easy)'),('947f1764','kr','alphabet','Hangul'),('a6886c66','kr','vocabulary','Vocabulary (Hard)'),('ba0f0f6c','jp','alphabet','Katakana'),('d46703bf','jp','alphabet','Hiragana');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progressItem`
--

DROP TABLE IF EXISTS `progressItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progressItem` (
  `progressItemId` varchar(8) CHARACTER SET latin1 NOT NULL,
  `languageId` varchar(2) CHARACTER SET latin1 NOT NULL,
  `moduleId` varchar(8) CHARACTER SET latin1 NOT NULL,
  `itemId` varchar(8) CHARACTER SET latin1 NOT NULL,
  `userId` varchar(16) CHARACTER SET latin1 NOT NULL,
  `totalAttempts` int(11) DEFAULT '0',
  `correctAttempts` int(11) DEFAULT '0',
  PRIMARY KEY (`progressItemId`),
  KEY `languageId_idx` (`languageId`),
  KEY `itemId_idx` (`itemId`),
  KEY `moduleProgress_idx` (`moduleId`),
  KEY `userProgress_idx` (`userId`),
  KEY `userProg_idx` (`userId`),
  CONSTRAINT `itemProgress` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `languageProgress` FOREIGN KEY (`languageId`) REFERENCES `language` (`languageId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `moduleProgress` FOREIGN KEY (`moduleId`) REFERENCES `module` (`moduleId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userP` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progressItem`
--

LOCK TABLES `progressItem` WRITE;
/*!40000 ALTER TABLE `progressItem` DISABLE KEYS */;
INSERT INTO `progressItem` VALUES ('0a3b4977','kr','76e4aca6','ff32b3b3','hs.gentlewave3',16,1),('0ff56d7f','kr','76e4aca6','7c1ba7b1','hs.gentlewave4',16,1),('2664311a','kr','947f1764','e707ed7c','jhardi',16,1),('28410cdd','kr','947f1764','e707ed7c','hs.gentlewave3',16,1),('2dfcb16e','kr','947f1764','cbf751d6','hs.gentlewave4',16,1),('383bf4a4','kr','947f1764','a2f1e3e2','jhardi',16,1),('3af3afb1','kr','76e4aca6','ff32b3b3','hs.gentlewave4',16,1),('4fcffb62','kr','947f1764','a2f1e3e2','hs.gentlewave3',16,1),('5d52e9be','kr','947f1764','e707ed7c','hs.gentlewave4',16,1),('6556c45e','kr','76e4aca6','7c1ba7b1','hs.gentlewave3',16,1),('681f4be4','kr','947f1764','a2f1e3e2','hs.gentlewave4',16,1),('6af187cf','kr','947f1764','cbf751d6','hs.gentlewave3',16,1),('7764d85f','kr','947f1764','cbf751d6','jhardi',16,1),('7886b05c','kr','76e4aca6','ff32b3b3','jhardi',16,1),('87c4ddb5','kr','76e4aca6','9cf1cbab','hs.gentlewave3',16,1),('8d72fd26','kr','947f1764','51127610','jhardi',16,1),('8f437fb5','kr','76e4aca6','9cf1cbab','hs.gentlewave4',16,1),('945510f2','kr','76e4aca6','58865fca','hs.gentlewave3',16,1),('a2b82b16','kr','947f1764','03ed2674','hs.gentlewave4',16,1),('a9e40185','kr','76e4aca6','b6e27b3d','hs.gentlewave4',16,1),('c477b805','kr','947f1764','03ed2674','hs.gentlewave3',16,1),('caa2cc5e','kr','76e4aca6','b6e27b3d','hs.gentlewave3',16,1),('d3372672','kr','947f1764','51127610','hs.gentlewave3',16,1),('d39f946e','kr','76e4aca6','58865fca','jhardi',29,11),('d42679ba','kr','76e4aca6','b6e27b3d','jhardi',16,1),('e55d52a8','kr','76e4aca6','7c1ba7b1','jhardi',16,1),('e6cccb60','kr','947f1764','51127610','hs.gentlewave4',16,1),('e8f266dc','kr','76e4aca6','58865fca','hs.gentlewave4',16,1),('ef442e16','kr','76e4aca6','9cf1cbab','jhardi',16,1),('f4f13336','kr','947f1764','03ed2674','jhardi',16,1);
/*!40000 ALTER TABLE `progressItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(16) CHARACTER SET latin1 NOT NULL,
  `firstname` varchar(45) CHARACTER SET latin1 NOT NULL,
  `lastname` varchar(45) CHARACTER SET latin1 NOT NULL,
  `email` varchar(45) CHARACTER SET latin1 NOT NULL,
  `password` varchar(45) CHARACTER SET latin1 NOT NULL,
  `preferredLanguage` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('benJ','MERM','Bin','jami@hotmail.com','benjamijami',NULL),('benJ2','Chang','Bin','benJ2@gmail.com','56789',NULL),('hs.gentlewave','Hiromasa','Suzuki','hs@gentle.wave','genteel',NULL),('hs.gentlewave2','Hiromasa2','Suzuki2','hs2@gentle.wave','genteel',NULL),('hs.gentlewave3','Hiromasa3','Suzuki3','hs3@gentle.wave','genteel',NULL),('hs.gentlewave4','Hiromasa4','Suzuki4','hs4@gentle.wave','genteel',NULL),('jhardi','Jeff','Hardi','jhardi@gmail.com','56789',NULL),('marck27','MERM3','Marcko','m27@gmail.com','marckymarck',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-16 13:44:01
