CREATE DATABASE  IF NOT EXISTS `mydb`;
USE `mydb`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `userId` VARCHAR(16) NOT NULL,   
    `firstname` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
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
    `order` INT NOT NULL,
    PRIMARY KEY (`moduleId`),
    INDEX idx_1 (`languageId`, `order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
    `itemId` VARCHAR(8) NOT NULL,
    `moduleId` VARCHAR(8) NOT NULL,
    `native` VARCHAR(45) NOT NULL,
    `english` VARCHAR(45) NOT NULL,
    `order` INT NOT NULL,
    PRIMARY KEY (`itemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `progressItem`;
CREATE TABLE `progressItem` (
    `progressItemId` VARCHAR(8) NOT NULL,
    `languageId` VARCHAR(2) NOT NULL,
    `moduleId` VARCHAR(8) NOT NULL,
    `itemId` VARCHAR(8) NOT NULL,
    `userId` VARCHAR(16) NOT NULL,
    `totalAttempts` INT DEFAULT '0',
    `correctAttempts` INT DEFAULT '0',
    PRIMARY KEY (`progressItemId`),
    INDEX idx_1 (`userId`, `moduleId`),
    INDEX idx_2 (`userId`, `itemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `progressModule`;
CREATE TABLE `progressModule` (
    `progressModuleId` VARCHAR(8) NOT NULL,
    `languageId` VARCHAR(2) NOT NULL,
    `moduleId` VARCHAR(8) NOT NULL,
    `userId` VARCHAR(16) NOT NULL,
    `total` INT DEFAULT '0',
    `completed` INT DEFAULT '0',
    PRIMARY KEY (`progressModuleId`),
    INDEX idx_1 (`userId`, `languageId`),
    INDEX idx_2 (`userId`, `moduleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
    `testId` VARCHAR(8) NOT NULL,
    `languageId` VARCHAR(2) NOT NULL,
    `englishName` VARCHAR(45) NOT NULL,
    `moduleId` VARCHAR(8) NOT NULL,
    `displayName` VARCHAR(45) NOT NULL,
    `userId` VARCHAR(16) NOT NULL,
    `total` INT DEFAULT '0',
    `correct` INT DEFAULT '0',
    `time` INT DEFAULT '0',
    `date` DATETIME NOT NULL,
    PRIMARY KEY (`testId`),
    INDEX idx_1 (`languageId`, `date`),
    INDEX idx_2 (`languageId`, `moduleId`, `date`),
    INDEX idx_3 (`userId`, `languageId`, `date`),
    INDEX idx_4 (`userId`, `languageId`, `moduleId`, `date`),
    INDEX idx_5 (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `item` VALUES 
    ('e707ed7c','947f1764','???','ka',0),
    ('cbf751d6','947f1764','???','na',1),
    ('a2f1e3e2','947f1764','???','da',2),
    ('03ed2674','947f1764','???','ra',3),
    ('51127610','947f1764','???','ma',4),
    ('58865fca','76e4aca6','??????','apple',0),
    ('ff32b3b3','76e4aca6','?????????','cat',1),
    ('9cf1cbab','76e4aca6','?????????','dog',2),
    ('b6e27b3d','76e4aca6','??????','human',3),
    ('7c1ba7b1','76e4aca6','???','rice',4),
    ('92orp378','a6886c66','??????','education',0),
    ('329r0joe','a6886c66','??????','society',1),
    ('9fxNLDK6','a6886c66','??????','passion',1),
    ('gjnq4aru','d46703bf','???','a',0),
    ('Jhjt_rSh','d46703bf','???','u',0),
    ('BUe9ZUYc','d46703bf','???','e',0),
    ('3mjs4ds2','ba0f0f6c','???','a',0),
    ('H1xV-zQs','ba0f0f6c','???','u',0),
    ('9Ij9x-x8','ba0f0f6c','???','e',0),
    ('sdfif32p','1a0b034f','?????????','I',0),
    ('Z1NXgLBJ','1a0b034f','??????','sushi',0),
    ('qlLMhnxQ','1a0b034f','??????','this',0);


INSERT INTO `language` VALUES 
  ('jp','Japanese','?????????'),
  ('kr','Korean','??????');


INSERT INTO `module` VALUES 
  ('947f1764','kr','alphabet','Hangul',0),
  ('76e4aca6','kr','vocabulary','Vocabulary (Easy)',1),
  ('a6886c66','kr','vocabulary','Vocabulary (Hard)',2),
  ('d46703bf','jp','alphabet','Hiragana',0),
  ('ba0f0f6c','jp','alphabet','Katakana',1),
  ('1a0b034f','jp','vocabulary','Vocabulary',2);