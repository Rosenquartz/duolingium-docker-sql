CREATE TABLE `user` (
  `id` VARCHAR(16) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(45) NOT NULL,
  `preferred_language` VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`id`));

LOCK TABLES `user` WRITE;
INSERT INTO `user` VALUES ('benJ','Ben','Jami','jami@hotmail.com','benjamijami',NULL),('marck27','Marck','Marcko','m27@gmail.com','marckymarck',NULL);
UNLOCK TABLES;