-- USER PROGRESS

CREATE PROCEDURE `UpdateProgress`(
    IN inputUserId VARCHAR(16),
    IN inputItemId VARCHAR(8),
    IN correct INT
)
BEGIN
	UPDATE `progressItem` 
    SET totalAttempts = totalAttempts + 1, correctAttempts = correctAttempts + correct
    WHERE userId = inputUserId AND itemId = inputItemId;
END;

CREATE PROCEDURE `GetAllItems`()
BEGIN
    SELECT *
    FROM `item` INNER JOIN `module`
    ON item.moduleId = module.moduleId;
END;

CREATE PROCEDURE `GetNewItems`(
    IN inputUserId VARCHAR(16),
    IN inputModuleId VARCHAR(8)
)
BEGIN
    SELECT item.itemId, item.english, item.native, progressItem.totalAttempts, progressItem.correctAttempts
    FROM `progressItem` INNER JOIN `item`
    ON item.itemId = progressItem.itemId
    WHERE item.moduleId = inputModuleId AND progressItem.userId = inputUserId;
END;

CREATE PROCEDURE `CreateProgressItem`(
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

CREATE PROCEDURE `GetItemProgress`(
    IN inputUserId VARCHAR(16),
    IN inputItemId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM `progressItem`
    WHERE userId = inputUserId AND itemId = inputItemId;
END;