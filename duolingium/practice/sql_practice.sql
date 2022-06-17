CREATE TABLE `language` (
  `id` VARCHAR(2) NOT NULL,
  `englishName` VARCHAR(45) NOT NULL,
  `nativeName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `mydb`.`modules` (
  `id` VARCHAR(2) NOT NULL,
  `languageId` VARCHAR(45) NOT NULL FOREIGN KEY REFERENCES language,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

  ALTER TABLE `mydb`.`modules` 
COLLATE = latin1_bin ,
ADD INDEX `languageid_idx` (`languageId` ASC);
;
ALTER TABLE `mydb`.`modules` 
ADD CONSTRAINT `languageid`
  FOREIGN KEY (`languageId`)
  REFERENCES `mydb`.`language` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
