const mysql = require('mysql2/promise');

getConnection = async () => {
    return mysql.createConnection({
        host     : 'db_server',
        user     : 'root',
        password : 'password',
        database : 'mydb',
        charset : 'utf8mb4'
    })
}

createTestResults = async (testId, languageId, englishName, moduleId, displayName, userId, total, correct, time, date) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL CreateTestResults(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await connection.query(sql, [testId, languageId, englishName, moduleId, displayName, userId, total, correct, time, date]);
        await connection.end();
    } catch (err) {
        console.error(err)
        throw err;
    }
}

/* NEW FUNCTIONS */

loadTestBase = async(pageItems) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL LoadTestBase(?)';
        let results = await connection.query(sql, [pageItems]);
        await connection.end();
        return results[0];
    } catch (err) {
        throw err;
    }
}

loadTestNext = async(pageItems, pageDelta, date, testId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL LoadTestNext(?, ?, ?, ?)';
        let results = await connection.query(sql, [pageItems, pageDelta, date, testId]); 
        await connection.end();
        return results[0];  
    } catch (err) {
        throw err;
    }
}

loadTestPrev = async(pageItems, pageDelta, date, testId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL LoadTestPrev(?, ?, ?, ?)';
        let results = await connection.query(sql, [pageItems, pageDelta, date, testId]);
        await connection.end();
        return results[0];
    } catch (err) {
        throw err;
    }
}

loadInitialResultsPage = async (filters, pageItems) => {
    try {
        let connection = await getConnection();
        let sql, results;
        if (filters.languageId && filters.moduleId && filters.userId) {
            sql = 'CALL LoadFilterLanguageModuleUser(?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.moduleId, filters.userId, pageItems])
        } else if (filters.languageId && filters.userId) {
            sql = 'CALL LoadFilterLanguageUser(?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.userId, pageItems])
        } else if (filters.userId) {
            sql = 'CALL LoadFilterUser(?, ?)';
            results = await connection.query(sql, [filters.userId, pageItems])
        } else if (filters.languageId && filters.moduleId) {
            sql = 'CALL LoadFilterLanguageModule(?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.moduleId, pageItems])
        } else if (filters.languageId) {
            console.log("Filtering by language (repo)", filters.languageId, pageItems)
            sql = 'CALL LoadFilterLanguage(?, ?)';
            results = await connection.query(sql, [filters.languageId, pageItems])
        } else {
            sql = 'CALL LoadNoFilter(?)';
            results = await connection.query(sql, [pageItems]);
        }
        await connection.end();
        return results[0];
    } catch (err) {
        throw err;
    }
}

loadNextResultsPage = async (filters, pageItems, pageDelta, date, testId) => {
    console.log("Loading next (repo)")
    try {
        let connection = await getConnection();
        let sql, results;
        if (filters.languageId && filters.moduleId && filters.userId) {
            sql = 'CALL NextFilterLanguageModuleUser(?, ?, ?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.moduleId, filters.userId, pageItems, pageDelta, date, testId])
        } else if (filters.languageId && filters.userId) {
            sql = 'CALL NextFilterLanguageUser(?, ?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.userId, pageItems, pageDelta, date, testId])
        } else if (filters.userId) {
            sql = 'CALL NextFilterUser(?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.userId, pageItems, pageDelta, date, testId])
        } else if (filters.languageId && filters.moduleId) {
            sql = 'CALL NextFilterLanguageModule(?, ?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.moduleId, pageItems, pageDelta, date, testId])
        } else if (filters.languageId) {
            console.log("Filtering language")
            sql = 'CALL NextFilterLanguage(?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, pageItems, pageDelta, date, testId])
        } else {
            sql = 'CALL NextNoFilter(?, ?, ?, ?)';
            results = await connection.query(sql, [pageItems, pageDelta, date, testId]);
        }
        await connection.end();
        return results[0];
    } catch (err) {
        throw err;
    }
}

loadPrevResultsPage = async (filters, pageItems, pageDelta, date, testId) => {
    console.log("Loading prev (repo)")
    try {
        let connection = await getConnection();
        let sql, results;
        if (filters.languageId && filters.moduleId && filters.userId) {
            sql = 'CALL PrevFilterLanguageModuleUser(?, ?, ?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.moduleId, filters.userId, pageItems, pageDelta, date, testId])
        } else if (filters.languageId && filters.userId) {
            sql = 'CALL PrevFilterLanguageUser(?, ?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.userId, pageItems, pageDelta, date, testId])
        } else if (filters.userId) {
            sql = 'CALL PrevFilterUser(?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.userId, pageItems, pageDelta, date, testId])
        } else if (filters.languageId && filters.moduleId) {
            sql = 'CALL PrevFilterLanguageModule(?, ?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.moduleId, pageItems, pageDelta, date, testId])
        } else if (filters.languageId) {
            sql = 'CALL PrevFilterLanguage(?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, pageItems, pageDelta, date, testId])
        } else {
            sql = 'CALL PrevNoFilter(?, ?, ?, ?)';
            results = await connection.query(sql, [pageItems, pageDelta, date, testId]);
        }
        await connection.end();
        return results[0];
    } catch (err) {
        throw err;
    }
}

/* DEMO FUNCTIONS */

getAllTestResults = async (pageItems, offset) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetAllTestResults(?, ?)';
        let results = await connection.query(sql, [pageItems, offset]);
        await connection.end();
        return results[0];
    } catch (err) {
        throw err;
    }
}

filterByLanguage = async (languageId, pageItems, offset) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL FilterTestByLanguage(?, ?, ?)';
        let results = await connection.query(sql, [languageId, pageItems, offset]);
        await connection.end();
        return results[0];
    } catch (err) {
        throw err;
    }
}

filterByModule = async (languageId, moduleId, pageItems, offset) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL FilterTestByModule(?, ?, ?, ?)';
        let results = await connection.query(sql, [languageId, moduleId, pageItems, offset]);
        await connection.end();
        return results[0];
    } catch (err) {
        throw err;
    }
}

filterByUser = async (userId, pageItems, offset) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL FilterTestByUser(?, ?, ?)';
        let results = await connection.query(sql, [userId, pageItems, offset]);
        await connection.end();
        return results[0];
    } catch (err) {
        throw err;
    }
}

filterByLanguageAndUser = async (languageId, userId, pageItems, offset) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL FilterTestByLanguageAndUser(?, ?, ?, ?)';
        let results = await connection.query(sql, [languageId, userId, pageItems, offset]);        
        await connection.end();
        return results[0];
    } catch (err) {
        throw err;
    }
}

filterByModuleAndUser = async (languageId, moduleId, userId, pageItems, offset) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL FilterTestByModuleAndUser(?, ?, ?, ?, ?)';
        let results = await connection.query(sql, [languageId, moduleId, userId, pageItems, offset]);        
        await connection.end();
        return results[0];        
    } catch (err) {
        throw err;
    }
}

/* DEPRECATED */

getUserTestResults = async (userId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetUserTestResults(?)';
        let results = await connection.query(sql, [userId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

getUserTestResultsByLanguage = async (userId, languageId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetUserTestResultsByLanguage(?, ?)';
        let results = await connection.query(sql, [userId, languageId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

getUserTestResultsByModule = async (userId, moduleId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetUserTestResultsByModule(?)';
        let results = await connection.query(sql, [userId, moduleId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

getAllTestResultsByModule = async (moduleId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetAllTestResultsByModule(?)';
        let results = await connection.query(sql, [moduleId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

getTestResults = async(languageId, moduleId, userId, pageItems, offset) => {
    try {
        console.log("a");
        let connection = await getConnection();
        let sql = 'CALL GetTestResults(?, ?, ?, ?, ?)';
        let results = await connection.query(sql, [languageId, moduleId, userId, pageItems, offset]);
        await connection.end();
        console.log(results[0]);
        console.log("b");
        return results[0];
    } catch (err) {
        console.error(err);
        console.log("c");
        throw err;
    }
}

module.exports = {    
    createTestResults: createTestResults,
    getAllTestResults: getAllTestResults,
    filterByLanguage: filterByLanguage,
    filterByModule: filterByModule,
    filterByUser: filterByUser,
    filterByLanguageAndUser: filterByLanguageAndUser,
    filterByModuleAndUser: filterByModuleAndUser,
    
    /* NEW FUNCTIONS */
    loadTest: loadTestBase,
    loadTestNext: loadTestNext,
    loadTestPrev: loadTestPrev,

    loadInitialResultsPage: loadInitialResultsPage,
    loadNextResultsPage: loadNextResultsPage,
    loadPrevResultsPage: loadPrevResultsPage

    /* DEPRECATED */
    // getUserTestResults: getUserTestResults,
    // getUserTestResultsByLanguage: getUserTestResultsByLanguage,
    // getUserTestResultsByModule: getUserTestResultsByModule,
    // getAllTestResultsByModule: getAllTestResultsByModule,
    // getTestResults: getTestResults
}