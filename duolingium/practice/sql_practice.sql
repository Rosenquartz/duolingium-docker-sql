CREATE TABLE `language` (
  `id` VARCHAR(2) NOT NULL,
  `englishName` VARCHAR(45) NOT NULL,
  `nativeName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `mydb`.`modules` (
  `id` VARCHAR(2) NOT NULL,
  `languageId` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  FOREIGN KEY (`languageId`) REFERENCES (`language`)