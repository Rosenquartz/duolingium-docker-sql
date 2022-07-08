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
        (SELECT 2*COUNT(*) FROM `item` WHERE `item`.moduleId= inputModuleId)
    , 0);
END;

CREATE PROCEDURE `UpdateProgressModule`(
    IN inputModuleId VARCHAR(8),
    IN inputUserId VARCHAR(16)
)
BEGIN
    UPDATE `progressModule`
    SET completed = completed + 1
    WHERE moduleId = inputModuleID AND userId = inputUserId and `progressModule`.progressModuleId != "";
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