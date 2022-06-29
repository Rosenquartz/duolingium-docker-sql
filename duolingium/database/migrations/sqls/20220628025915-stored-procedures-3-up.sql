-- USER PROGRESS

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

CREATE PROCEDURE `CreateProgressModule`(
    IN inputProgressItemId VARCHAR(8),
    IN inputLanguageId VARCHAR(2),
    IN inputModuleId VARCHAR(8),
    IN inputUserId VARCHAR(16)
)
BEGIN 
    INSERT INTO `progressModule`
    VALUES (inputProgressItemId, inputLanguageId, inputModuleId, inputUserId, 
        (SELECT COUNT(*) FROM `item` WHERE `item`.moduleId= inputModuleId)
    , 0);
END;

CREATE PROCEDURE `UpdateProgressModule`(
    IN inputModuleId VARCHAR(8),
    IN inputUserId VARCHAR(16)
)
BEGIN
    UPDATE `progressModule`
    SET completed = (
        SELECT COUNT(*) 
        FROM `progressItem` 
        WHERE `progressItem`.moduleId = inputModuleId
        AND `progressItem`.userId = inputUserId
        AND `progressItem`.correctAttempts > 0;
    )
    WHERE moduleId = inputModuleID AND userId = inputUserId;
END;

CREATE PROCEDURE `UpdateProgressItem`(
    IN inputUserId VARCHAR(16),
    IN inputItemId VARCHAR(8),
    IN correct INT
)
BEGIN
	UPDATE `progressItem` 
    SET totalAttempts = totalAttempts + 1, correctAttempts = correctAttempts + correct
    WHERE userId = inputUserId AND itemId = inputItemId;
END;

CREATE PROCEDURE `GetProgressModules`(
    IN inputUserId VARCHAR(16),
    IN inputLanguageId VARCHAR(2)
)
BEGIN
    SELECT *
    FROM `progressModule`
    WHERE userId = inputUserId
    AND languageId = inputLanguageId;
END;

CREATE PROCEDURE `GetProgressModule`(
    IN inputUserId VARCHAR(16),
    IN inputModuleId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM `progressModule`
    WHERE userId = inputUserId
    AND moduleId = inputModuleId;
END;

/*
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
*/