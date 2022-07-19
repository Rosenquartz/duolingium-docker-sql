USE `mydb`;

DROP TABLE IF EXISTS `contest`;
CREATE TABLE `contest` (
    `contestId` VARCHAR(8) NOT NULL,   
    `languageId` VARCHAR(2) NOT NULL,
    `moduleId` VARCHAR(8) NOT NULL,
    `timer` INT NOT NULL,
    `state` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`contestId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `contestant`;
CREATE TABLE `contestant` (
    `contestId` VARCHAR(8) NOT NULL,   
    `userId` VARCHAR(16) NOT NULL,
    `score` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `contestItem`;
CREATE TABLE `contestItem` (
    `contestItemId` VARCHAR(8) NOT NULL,   
    `contestId` VARCHAR(8) NOT NULL,
    `moduleId` VARCHAR(8) NOT NULL,
    `itemId` VARCHAR(8) NOT NULL,
    `startedAt` DATETIME NOT NULL,
    PRIMARY KEY (`contestItemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `contestantProgressItem`;
CREATE TABLE `contestantProgressItem` (
    `contestItemId` VARCHAR(8) NOT NULL,   
    `userId` VARCHAR(16) NOT NULL,
    `moduleId` VARCHAR(8) NOT NULL,
    `itemId` VARCHAR(8) NOT NULL,
    `attemptedAt` DATETIME NOT NULL,
    `score` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
