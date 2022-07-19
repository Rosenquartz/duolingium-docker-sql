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
            sql = 'CALL LoadFilterModuleUser(?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.moduleId, filters.userId, pageItems])
        } else if (filters.languageId && filters.userId) {
            sql = 'CALL LoadFilterLanguageUser(?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.userId, pageItems])
        } else if (filters.userId) {
            sql = 'CALL LoadFilterUser(?, ?)';
            results = await connection.query(sql, [filters.userId, pageItems])
        } else if (filters.languageId && filters.moduleId) {
            sql = 'CALL LoadFilterModule(?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.moduleId, pageItems])
        } else if (filters.languageId) {
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
    try {
        let connection = await getConnection();
        let sql, results;
        if (filters.languageId && filters.moduleId && filters.userId) {
            sql = 'CALL NextFilterModuleUser(?, ?, ?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.moduleId, filters.userId, pageItems, pageDelta, date, testId])
        } else if (filters.languageId && filters.userId) {
            sql = 'CALL NextFilterLanguageUser(?, ?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.userId, pageItems, pageDelta, date, testId])
        } else if (filters.userId) {
            sql = 'CALL NextFilterUser(?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.userId, pageItems, pageDelta, date, testId])
        } else if (filters.languageId && filters.moduleId) {
            sql = 'CALL NextFilterModule(?, ?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.moduleId, pageItems, pageDelta, date, testId])
        } else if (filters.languageId) {
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
    try {
        let connection = await getConnection();
        let sql, results;
        if (filters.languageId && filters.moduleId && filters.userId) {
            sql = 'CALL PrevFilterModuleUser(?, ?, ?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.moduleId, filters.userId, pageItems, pageDelta, date, testId])
        } else if (filters.languageId && filters.userId) {
            sql = 'CALL PrevFilterLanguageUser(?, ?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.languageId, filters.userId, pageItems, pageDelta, date, testId])
        } else if (filters.userId) {
            sql = 'CALL PrevFilterUser(?, ?, ?, ?, ?)';
            results = await connection.query(sql, [filters.userId, pageItems, pageDelta, date, testId])
        } else if (filters.languageId && filters.moduleId) {
            sql = 'CALL PrevFilterModule(?, ?, ?, ?, ?, ?)';
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
}