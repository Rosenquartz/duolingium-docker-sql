-- TEST RESULTS

CREATE PROCEDURE `CreateTestResults` (
    IN inputTestId VARCHAR(8),
    IN inputLanguageId VARCHAR(2),
    IN inputEnglishName VARCHAR(45),
    IN inputModuleId VARCHAR(8),
    IN inputDisplayName VARCHAR(45),
    IN inputUserId VARCHAR(16),
    IN inputTotal INT,
    IN inputCorrect INT,
    IN inputTime INT,
    IN inputDate DATETIME
)
BEGIN 
    INSERT INTO `test`
    VALUES (
        inputTestId, 
        inputLanguageId,
        inputEnglishName,
        inputModuleId, 
        inputDisplayName,
        inputUserId, 
        inputTotal,
        inputCorrect,
        inputTime,
        inputDate
    );
END;

CREATE PROCEDURE `GetAllTestResults` (
    IN inputPageLimit INT,
    IN inputPageOffset INT
)
BEGIN
    SELECT *
    FROM `test`
	ORDER BY date DESC
	LIMIT inputPageLimit
    OFFSET inputPageOffset;
    
	SELECT COUNT(*)
	FROM `test`;
END;

/* One Stored Procedure for each possible filter */

CREATE PROCEDURE `FilterTestByLanguage` (
	IN inputLanguageId VARCHAR(2),
    IN inputPageLimit INT,
    IN inputPageOffset INT
)
BEGIN
    SELECT *
    FROM `test`
    WHERE languageId = inputLanguageId
    ORDER BY date desc
	LIMIT inputPageLimit
    OFFSET inputPageOffset;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE languageId = inputLanguageId;
END;

CREATE PROCEDURE `FilterTestByModule` (
	IN inputLanguageId VARCHAR(2),
    IN inputModuleId VARCHAR(8),
    IN inputPageLimit INT,
    IN inputPageOffset INT
)
BEGIN
    SELECT *
    FROM `test`
    WHERE languageId = inputLanguageId
    AND moduleId = inputModuleId
    ORDER BY date desc
	LIMIT inputPageLimit
    OFFSET inputPageOffset;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE languageId = inputLanguageId
    AND moduleId = inputModuleId;
END;

CREATE PROCEDURE `FilterTestByUser` (
    IN inputUserId VARCHAR(16),
    IN inputPageLimit INT,
    IN inputPageOffset INT
)
BEGIN
    SELECT *
    FROM `test`
    WHERE userId = inputUserId
    ORDER BY date desc
	LIMIT inputPageLimit
    OFFSET inputPageOffset;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE userId = inputUserId;
END;

CREATE PROCEDURE `FilterTestByLanguageAndUser` (    
	IN inputLanguageId VARCHAR(2),
    IN inputUserId VARCHAR(16),
    IN inputPageLimit INT,
    IN inputPageOffset INT
)
BEGIN
    SELECT *
    FROM `test`
    WHERE languageId = inputLanguageId
    AND userId = inputUserId
    ORDER BY date desc
	LIMIT inputPageLimit
    OFFSET inputPageOffset;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE languageId = inputLanguageId
	AND userId = inputUserId;
END;

CREATE PROCEDURE `FilterTestByModuleAndUser` (
	IN inputLanguageId VARCHAR(2),
    IN inputModuleId VARCHAR(8),
    IN inputUserId VARCHAR(16),
    IN inputPageLimit INT,
    IN inputPageOffset INT
)
BEGIN
    SELECT *
    FROM `test`
    WHERE languageId = inputLanguageId
    AND moduleId = inputModuleId
    AND userId = inputUserId
    ORDER BY date desc
	LIMIT inputPageLimit
    OFFSET inputPageOffset;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE languageId = inputLanguageId
	AND moduleId = inputModuleId
	AND userId = inputUserId;
END;



/* OLD FILTERS */

CREATE PROCEDURE `GetAllTestResultsByModule` (
    IN inputModuleId VARCHAR(8)
)
BEGIN 
    SELECT *
    FROM `test`
    WHERE moduleId = inputModuleId
    ORDER BY date desc;
END;

CREATE PROCEDURE `GetUserTestResults` (
    IN inputUserId VARCHAR(16)
)
BEGIN 
    SELECT *
    FROM `test`
    WHERE userId = inputUserId
    ORDER BY date desc;
END;

CREATE PROCEDURE `GetUserTestResultsByLanguage` (
    IN inputUserId VARCHAR(16),
    IN inputLanguageId VARCHAR(2)
)
BEGIN 
    SELECT *
    FROM `test`
    WHERE userId = inputUserId
    AND languageId = inputLanguageId
    ORDER BY date desc;
END;

CREATE PROCEDURE `GetUserTestResultsByModule` (
    IN inputUserId VARCHAR(16),
    IN inputModuleId Varchar(8)
)
BEGIN 
    SELECT *
    FROM `test`
    WHERE userId = inputUserId
    AND moduleId = inputModuleId
    ORDER BY date desc;
END;

CREATE PROCEDURE `GetTestResults`(
	IN inputLanguageId VARCHAR(2),
    IN inputModuleId VARCHAR(8),
    IN inputUserId VARCHAR(16),
    IN inputPageLimit INT,
    IN inputPageOffset INT
)
BEGIN
	SELECT * 
	FROM `test`
	WHERE languageId = COALESCE (inputLanguageId, languageId)
	AND moduleId = COALESCE (inputModuleId, moduleId)
	AND userId = COALESCE(inputUserId, userId)
	ORDER BY date DESC
	LIMIT inputPageLimit
    OFFSET inputPageOffset;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE languageId = COALESCE (inputLanguageId, languageId)
	AND moduleId = COALESCE (inputModuleId, moduleId)
	AND userId = COALESCE(inputUserId, userId);
END