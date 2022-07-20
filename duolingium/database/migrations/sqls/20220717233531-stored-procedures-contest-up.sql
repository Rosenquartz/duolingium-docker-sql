CREATE PROCEDURE `CreateContest` (
    IN `inputContestId` VARCHAR(8),
    IN `inputLanguageId` VARCHAR(2),
    IN `inputModuleId` VARCHAR(8),
    IN `inputTimer` INT
)
BEGIN
    INSERT INTO `contest` 
    VALUES (inputContestId, inputLanguageId, inputModuleId, inputTimer, 'standby');
END;

CREATE PROCEDURE `JoinContest` (
    IN `inputContestId` VARCHAR(8),
    IN `inputUserId` VARCHAR(16)
)
BEGIN
    INSERT INTO `contestant` 
    VALUES (inputContestId, inputUserId, 0);
END;

CREATE PROCEDURE `StartContest` (
    IN `inputContestId` VARCHAR(8)
)
BEGIN
    UPDATE `contest`
    SET state = 'ongoing'
    WHERE contestId = inputContestId;
END;

CREATE PROCEDURE `EndContest` (
    IN `inputContestId` VARCHAR(8)
)
BEGIN
    UPDATE `contest`
    SET state = 'ended'
    WHERE contestId = inputContestId;
END;

CREATE PROCEDURE `GetContestStatus` (
    IN `inputContestId` VARCHAR(8)
)
BEGIN
    SELECT state
    FROM `contest`
    WHERE contestId = inputContestId;
END;

/* Stored Procedures for ongoing Games */

CREATE PROCEDURE `StartItem` (
    IN `inputContestItemId` VARCHAR(8),
    IN `inputContestId` VARCHAR(8),
    IN `inputModuleId` VARCHAR(8),
    IN `inputItemId` VARCHAR(8),
    IN `inputDate` DATETIME
)
BEGIN 
    INSERT INTO `contestItem`
    VALUES (inputContestItemId, inputContestId, inputModuleId, inputItemId, inputDate);
ENd;

CREATE PROCEDURE `GetContestItemInfo`(
	IN `inputContestId` VARCHAR(8),
    IN `inputContestItemId` VARCHAR(8)
)
BEGIN
    SELECT startedAt
    FROM `contestItem`
    WHERE contestItemId = inputContestItemId;
    
    SELECT timer
    FROM `contest`
    WHERE contestId = inputContestId;
END

CREATE PROCEDURE `AnswerItem` (
    IN `inputContestItemId` VARCHAR(8),
    IN `inputUserId` VARCHAR(16),
    IN `inputModuleId` VARCHAR(8),
    IN `inputItemId` VARCHAR(8),
    IN `inputDate` VARCHAR(8),
    IN `inputScore` INT
)
BEGIN
    INSERT INTO `contestantProgressItem`
    VALUES (inputContestItemId, inputUserId, inputModuleId, inputItemId, inputDate, inputScore);
END;

CREATE PROCEDURE `UpdateScore` (
    IN `inputContestId` VARCHAR(8),
    IN `inputUserId` VARCHAR(16),
    IN `inputScore` INT
)
BEGIN
    UPDATE `contestant`
    SET score = score + inputScore
    WHERE contestId = inputContestId
    AND userId = inputUserId;
END;

/* Stored Procedures for Rankings */

CREATE PROCEDURE `GetRankings` (
    IN `inputContestId` VARCHAR(8)
)
BEGIN
    SELECT userId, score
    FROM `contestant`
    WHERE contestId = inputContestId
    ORDER BY score DESC;
END;