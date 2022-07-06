-- TEST RESULTS

CREATE PROCEDURE `CreateTestResults` (
    IN inputTestId VARCHAR(8),
    IN inputLanguageId VARCHAR(2),
    IN inputModuleId VARCHAR(8),
    IN inputUserId VARCHAR(16),
    IN inputTotal INT,
    IN inputCorrect INT,
    IN inputTime INT
)
BEGIN 
    INSERT INTO `test`
    VALUES (
        inputTestId, 
        inputLanguageId, 
        inputModuleId, 
        inputUserId, 
        inputTotal,
        inputCorrect,
        inputTime
    );
END;

CREATE PROCEDURE `GetTestResults` (
    IN inputModuleId VARCHAR(8)
)
BEGIN 
    SELECT *
    FROM `test`
    WHERE moduleId = inputModuleId;
END;