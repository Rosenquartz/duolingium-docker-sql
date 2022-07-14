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
END

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
END

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
END

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
END

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
END

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
END