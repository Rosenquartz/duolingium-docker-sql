-- LANGUAGE ITEMS

CREATE PROCEDURE `GetLanguageList`()
BEGIN
    SELECT * 
    FROM `language`;
END;

CREATE PROCEDURE `GetModuleList`(
    IN inputLanguageId VARCHAR(2)
)
BEGIN
    SELECT * 
    FROM `module` 
    WHERE languageId = inputLanguageId;
END;

CREATE PROCEDURE `GetItemList`(
    IN inputModuleId VARCHAR(8)
)
BEGIN
    SELECT itemId, english, native 
    FROM `item` 
    WHERE moduleId = inputModuleId;
END;

CREATE PROCEDURE `GetItem`(
    IN inputItemId VARCHAR(8)
)
BEGIN
    SELECT english, native 
    FROM `item` 
    WHERE itemId = inputItemId;
END;