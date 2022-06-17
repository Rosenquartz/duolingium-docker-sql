CREATE PROCEDURE `GetUserList`()
BEGIN
    SELECT id 
    FROM `user`;
END;

CREATE PROCEDURE `GetProfile`(
    IN inputUserId VARCHAR(16)
)
BEGIN
    SELECT id, firstname, lastname, email, preferredLanguage 
    FROM `user` 
    WHERE id = inputUserId;
END;

CREATE PROCEDURE `CreateUser`(
    IN inputId VARCHAR (16),
    IN inputFirstname VARCHAR(45),
    IN inputLastName VARCHAR(45),
    IN inputEmail VARCHAR(45),
    IN inputPassword VARCHAR(45)
)
BEGIN
    INSERT INTO `user` 
    VALUES (inputId, inputFirstname, inputLastname, inputEmail, inputPassword, NULL);
END;

CREATE PROCEDURE `GetLanguageList`()
BEGIN
    SELECT * 
    FROM `language`;
END;

CREATE PROCEDURE GetModuleList(
    IN inputLanguageId VARCHAR(2)
)
BEGIN
    SELECT * 
    FROM `module` 
    WHERE languageId = inputLanguageId;
END;

CREATE PROCEDURE GetItemList(
    IN inputModuleId VARCHAR(8)
)
BEGIN
    SELECT itemId, english, native 
    FROM `item` 
    WHERE moduleId = inputModuleId;
END;

CREATE PROCEDURE GetItem(
    IN inputItemId VARCHAR(8)
)
BEGIN
    SELECT english, native 
    FROM `item` 
    WHERE itemId = inputItemId;
END;

CREATE PROCEDURE UpdateProgress(
    IN inputUserId VARCHAR(16),
    IN inputItemId VARCHAR(8),
    IN correct INT
)
BEGIN
	UPDATE `progressItem` 
    SET totalAttempts = totalAttempts + 1, correctAttempts = correctAttempts + correct
    WHERE userId = inputUserId AND itemId = inputItemId;
END;

CREATE PROCEDURE GetAllItems()
BEGIN
    SELECT *
    FROM `item` INNER JOIN `module`
    ON item.itemId = module.moduleId;
END;

CREATE PROCEDURE CreateProgressItem(
    IN inputProgressItemId VARCHAR(8),
    IN inputLanguageId VARCHAR(2),
    IN inputModuleId VARCHAR(8),
    IN inputItemId VARCHAR(8),
    in inputUserId VARCHAR(16)
)
BEGIN 
    INSERT INTO `progressItem`
    VALUES (inputProgressItemId, inputLanguageId, inputModuleId, inputItemId, inputUserId, 0, 0);
END;
