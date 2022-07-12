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

getAllTestResults = async () => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetAllTestResults()';
        let results = await connection.query(sql);
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
    getUserTestResults: getUserTestResults,
    getUserTestResultsByLanguage: getUserTestResultsByLanguage,
    getUserTestResultsByModule: getUserTestResultsByModule,
    getAllTestResults: getAllTestResults,
    getAllTestResultsByModule: getAllTestResultsByModule,
    getTestResults: getTestResults
}