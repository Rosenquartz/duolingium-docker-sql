/* No Filter */

CREATE PROCEDURE `LoadNoFilter` (
    IN inputPageLimit INT
)
BEGIN
    SELECT *
    FROM `test`
    ORDER BY date DESC, testId DESC
    LIMIT inputPageLimit;
    
	SELECT COUNT(*)
	FROM `test`;
END;

CREATE PROCEDURE `NextNoFilter`(
    IN inputPageLimit INT,
    IN inputPageOffset INT,
    IN inputDate DATETIME,
    IN inputTestId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM `test`
    WHERE (date < inputDate)
    OR (date = inputDate AND testId < inputTestId)
    ORDER BY date DESC, testId DESC
    LIMIT inputPageLimit
    OFFSET inputPageOffset;
    
	SELECT COUNT(*)
	FROM `test`;
END;

CREATE PROCEDURE `PrevNoFilter`(
    IN inputPageLimit INT,
    IN inputPageOffset INT,
    IN inputDate DATETIME,
    IN inputTestId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM (
        SELECT *
        FROM `test`
        WHERE (date > inputDate)
        OR (date = inputDate AND testId > inputTestId)
        ORDER BY date ASC, testId ASC
        LIMIT inputPageLimit
        OFFSET inputPageOffset
    ) AS output
    ORDER BY date DESC, testId DESC;
    
	SELECT COUNT(*)
	FROM `test`;
END;

/* Filter By Language */

CREATE PROCEDURE `LoadFilterLanguage` (
    IN inputLanguageId VARCHAR(2),
    IN inputPageLimit INT
)
BEGIN
    SELECT *
    FROM `test`
    WHERE languageId = inputLanguageId
    ORDER BY date DESC, testId DESC
    LIMIT inputPageLimit;
    
	SELECT COUNT(*)
	FROM `test`
    WHERE languageId = inputLanguageId;
END;

CREATE PROCEDURE `NextFilterLanguage`(
    IN inputLanguageId VARCHAR(2),
    IN inputPageLimit INT,
    IN inputPageOffset INT,
    IN inputDate DATETIME,
    IN inputTestId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM `test`
    WHERE (languageId = inputLanguageId)
    AND ((date < inputDate) OR (date = inputDate AND testId < inputTestId))
    ORDER BY date DESC, testId DESC
    LIMIT inputPageLimit
    OFFSET inputPageOffset;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE languageId = inputLanguageId;
END;

CREATE PROCEDURE `PrevFilterLanguage`(
    IN inputLanguageId VARCHAR(2),
    IN inputPageLimit INT,
    IN inputPageOffset INT,
    IN inputDate DATETIME,
    IN inputTestId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM (
        SELECT *
        FROM `test`
        WHERE (languageId = inputLanguageId)
        AND ((date > inputDate) OR (date = inputDate AND testId > inputTestId))
        ORDER BY date ASC, testId ASC
        LIMIT inputPageLimit
        OFFSET inputPageOffset
    ) AS output
    ORDER BY date DESC, testId DESC;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE languageId = inputLanguageId;
END;

/* Filter By Language and Module */

CREATE PROCEDURE `LoadFilterModule` (
    IN inputLanguageId VARCHAR(2),
    IN inputModuleId VARCHAR(8),
    IN inputPageLimit INT
)
BEGIN
    SELECT *
    FROM `test`
    WHERE languageId = inputLanguageId
    AND moduleId = inputModuleId
    ORDER BY date DESC, testId DESC
    LIMIT inputPageLimit;
    
	SELECT COUNT(*)
	FROM `test`
    WHERE languageId = inputLanguageId
    AND moduleId = inputModuleId;
END;

CREATE PROCEDURE `NextFilterModule`(
    IN inputLanguageId VARCHAR(2),
    IN inputModuleId VARCHAR(8),
    IN inputPageLimit INT,
    IN inputPageOffset INT,
    IN inputDate DATETIME,
    IN inputTestId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM `test`
    WHERE (languageId = inputLanguageId)
    AND (moduleId = inputModuleId)
    AND ((date < inputDate) OR (date = inputDate AND testId < inputTestId))
    ORDER BY date DESC, testId DESC
    LIMIT inputPageLimit
    OFFSET inputPageOffset;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE languageId = inputLanguageId
    AND moduleId = inputModuleId;
END;

CREATE PROCEDURE `PrevFilterModule`(
    IN inputLanguageId VARCHAR(2),
    IN inputModuleId VARCHAR(8),
    IN inputPageLimit INT,
    IN inputPageOffset INT,
    IN inputDate DATETIME,
    IN inputTestId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM (
        SELECT *
        FROM `test`
        WHERE (languageId = inputLanguageId)
        AND (moduleId = inputModuleId)
        AND ((date > inputDate) OR (date = inputDate AND testId > inputTestId))
        ORDER BY date ASC, testId ASC
        LIMIT inputPageLimit
        OFFSET inputPageOffset
    ) AS output
    ORDER BY date DESC, testId DESC;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE languageId = inputLanguageId
    AND moduleId = inputModuleId;
END;

/* Filter By Language, Module, and User */

CREATE PROCEDURE `LoadFilterModuleUser` (
    IN inputLanguageId VARCHAR(2),
    IN inputModuleId VARCHAR(8),
    IN inputUserId VARCHAR(16),
    IN inputPageLimit INT
)
BEGIN
    SELECT *
    FROM `test`
    WHERE languageId = inputLanguageId
    AND moduleId = inputModuleId
    AND userId = inputUserId
    ORDER BY date DESC, testId DESC
    LIMIT inputPageLimit;
    
	SELECT COUNT(*)
	FROM `test`
    WHERE languageId = inputLanguageId
    AND moduleId = inputModuleId
    AND userId = inputUserId;
END;

CREATE PROCEDURE `NextFilterModuleUser`(
    IN inputLanguageId VARCHAR(2),
    IN inputModuleId VARCHAR(8),
    IN inputUserId VARCHAR(16),
    IN inputPageLimit INT,
    IN inputPageOffset INT,
    IN inputDate DATETIME,
    IN inputTestId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM `test`
    WHERE (languageId = inputLanguageId)
    AND (moduleId = inputModuleId)
    AND (userId = inputUserId)
    AND ((date < inputDate) OR (date = inputDate AND testId < inputTestId))
    ORDER BY date DESC, testId DESC
    LIMIT inputPageLimit
    OFFSET inputPageOffset;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE languageId = inputLanguageId
    AND moduleId = inputModuleId
    AND userId = inputUserId;
END;

CREATE PROCEDURE `PrevFilterModuleUser`(
    IN inputLanguageId VARCHAR(2),
    IN inputModuleId VARCHAR(8),
    IN inputUserId VARCHAR(16),
    IN inputPageLimit INT,
    IN inputPageOffset INT,
    IN inputDate DATETIME,
    IN inputTestId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM (
        SELECT *
        FROM `test`
        WHERE (languageId = inputLanguageId)
        AND (moduleId = inputModuleId)
        AND (userId = inputUserId)
        AND ((date > inputDate) OR (date = inputDate AND testId > inputTestId))
        ORDER BY date ASC, testId ASC
        LIMIT inputPageLimit
        OFFSET inputPageOffset
    ) AS output
    ORDER BY date DESC, testId DESC;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE languageId = inputLanguageId
    AND moduleId = inputModuleId
    AND userId = inputUserId;
END;

/* Filter By Language and User */

CREATE PROCEDURE `LoadFilterLanguageUser` (
    IN inputLanguageId VARCHAR(2),
    IN inputUserId VARCHAR(16),
    IN inputPageLimit INT
)
BEGIN
    SELECT *
    FROM `test`
    WHERE languageId = inputLanguageId
    AND userId = inputUserId
    ORDER BY date DESC, testId DESC
    LIMIT inputPageLimit;
    
	SELECT COUNT(*)
	FROM `test`
    WHERE languageId = inputLanguageId
    AND userId = inputUserId;
END;

CREATE PROCEDURE `NextFilterLanguageUser`(
    IN inputLanguageId VARCHAR(2),
    IN inputUserId VARCHAR(16),
    IN inputPageLimit INT,
    IN inputPageOffset INT,
    IN inputDate DATETIME,
    IN inputTestId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM `test`
    WHERE (languageId = inputLanguageId)
    AND (userId = inputUserId)
    AND ((date < inputDate) OR (date = inputDate AND testId < inputTestId))
    ORDER BY date DESC, testId DESC
    LIMIT inputPageLimit
    OFFSET inputPageOffset;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE languageId = inputLanguageId
    AND userId = inputUserId;
END;

CREATE PROCEDURE `PrevFilterLanguageUser`(
    IN inputLanguageId VARCHAR(2),
    IN inputUserId VARCHAR(16),
    IN inputPageLimit INT,
    IN inputPageOffset INT,
    IN inputDate DATETIME,
    IN inputTestId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM (
        SELECT *
        FROM `test`
        WHERE (languageId = inputLanguageId)
        AND (userId = inputUserId)
        AND ((date > inputDate) OR (date = inputDate AND testId > inputTestId))
        ORDER BY date ASC, testId ASC
        LIMIT inputPageLimit
        OFFSET inputPageOffset
    ) AS output
    ORDER BY date DESC, testId DESC;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE languageId = inputLanguageId
    AND userId = inputUserId;
END;

/* Filter By User Only */

CREATE PROCEDURE `LoadFilterUser` (
    IN inputUserId VARCHAR(16),
    IN inputPageLimit INT
)
BEGIN
    SELECT *
    FROM `test`
    WHERE userId = inputUserId
    ORDER BY date DESC, testId DESC
    LIMIT inputPageLimit;
    
	SELECT COUNT(*)
	FROM `test`
    WHERE userId = inputUserId;
END;

CREATE PROCEDURE `NextFilterUser`(
    IN inputUserId VARCHAR(16),
    IN inputPageLimit INT,
    IN inputPageOffset INT,
    IN inputDate DATETIME,
    IN inputTestId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM `test`
    WHERE (userId = inputUserId)
    AND ((date < inputDate) OR (date = inputDate AND testId < inputTestId))
    ORDER BY date DESC, testId DESC
    LIMIT inputPageLimit
    OFFSET inputPageOffset;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE userId = inputUserId;
END;

CREATE PROCEDURE `PrevFilterUser`(
    IN inputUserId VARCHAR(16),
    IN inputPageLimit INT,
    IN inputPageOffset INT,
    IN inputDate DATETIME,
    IN inputTestId VARCHAR(8)
)
BEGIN
    SELECT *
    FROM (
        SELECT *
        FROM `test`
        WHERE (userId = inputUserId)
        AND ((date > inputDate) OR (date = inputDate AND testId > inputTestId))
        ORDER BY date ASC, testId ASC
        LIMIT inputPageLimit
        OFFSET inputPageOffset
    ) AS output
    ORDER BY date DESC, testId DESC;
    
	SELECT COUNT(*)
	FROM `test`
	WHERE userId = inputUserId;
END;