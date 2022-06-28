CREATE DATABASE  IF NOT EXISTS `mydb`;
USE `mydb`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `userId` VARCHAR(16) NOT NULL,   
    `firstname` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `preferredLanguage` VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (`userId`),
    UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `language`;
CREATE TABLE `language` (
    `languageId` VARCHAR(2) NOT NULL,
    `englishName` VARCHAR(45) NOT NULL,
    `nativeName` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`languageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `module`;
CREATE TABLE `module` (
    `moduleId` VARCHAR(8) NOT NULL,
    `languageId` VARCHAR(2) NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    `displayName` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`moduleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `itemId` VARCHAR(8) NOT NULL,
  `moduleId` VARCHAR(8) NOT NULL,
  `native` VARCHAR(45) NOT NULL,
  `english` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`itemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `progressItem`;
CREATE TABLE `progressItem` (
  `progressItemId` VARCHAR(8) NOT NULL,
  `languageId` VARCHAR(2) NOT NULL,
  `moduleId` VARCHAR(8) NOT NULL,
  `itemId` VARCHAR(8) NOT NULL,
  `userId` VARCHAR(16) NOT NULL,
  `totalAttempts` int(11) DEFAULT '0',
  `correctAttempts` int(11) DEFAULT '0',
  PRIMARY KEY (`progressItemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

