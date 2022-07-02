-- USER PROFILE

CREATE PROCEDURE `GetUserList`()
BEGIN
    SELECT userId 
    FROM `user`;
END;

CREATE PROCEDURE `GetProfile`(
    IN inputUserId VARCHAR(16)
)
BEGIN
    SELECT userId, firstname, lastname, email, preferredLanguage 
    FROM `user` 
    WHERE userId = inputUserId;
END;

CREATE PROCEDURE `CreateUser`(
    IN inputId VARCHAR (16),
    IN inputFirstname VARCHAR(45),
    IN inputLastName VARCHAR(45),
    IN inputEmail VARCHAR(45),
    IN inputPassword VARCHAR(100)
)
BEGIN
    INSERT INTO `user` 
    VALUES (inputId, inputFirstname, inputLastname, inputEmail, inputPassword, NULL);
END;


CREATE PROCEDURE `UpdateUser`(
    IN inputUserId VARCHAR(16),
    IN inputFirstname VARCHAR(45),
    IN inputLastname VARCHAR(45),
    IN inputPassword VARCHAR(100),
    IN inputEmail VARCHAR(45)
)
BEGIN
    UPDATE `user`
    SET 
        firstname = COALESCE(inputFirstname, firstname),
        lastname = COALESCE(inputLastname, lastname),
        password = COALESCE(inputPassword, password),
        email = COALESCE(inputEmail, email)
    WHERE
        userId = inputUserId;
END;

CREATE PROCEDURE `CheckLogin`(
    IN inputUserId VARCHAR(16)
)
BEGIN
    SELECT preferredLanguage, password
    FROM `user` 
    WHERE userId = inputUserId;
END;

CREATE PROCEDURE `SetPreferredLanguage` (
    IN inputUserId VARCHAR(16),
    IN inputLanguageId VARCHAR(2)
)
BEGIN
    UPDATE `user`
    SET preferredLanguage = inputLanguageId
    WHERE userId = inputUserId;
END;

CREATE PROCEDURE `GetPreferredLanguage`(
    IN inputUserId VARCHAR(16)
)
BEGIN
    SELECT `module`.moduleId, `module`.type, `module`.displayName
    FROM `user` INNER JOIN `module` on `user`.preferredLanguage = `module`.languageId
    WHERE userId = inputUserId
    ORDER BY `module`.order;
END