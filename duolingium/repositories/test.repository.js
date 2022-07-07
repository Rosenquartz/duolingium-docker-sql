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

createTestResults = async (testId, languageId, moduleId, userId, total, correct, time) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL CreateTestResults(?, ?, ?, ?, ?, ?, ?)';
        await connection.query(sql, [testId, languageId, moduleId, userId, total, correct, time]);
        console.log("requests created")
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

module.exports = {    
    createTestResults: createTestResults,
    getUserTestResults: getUserTestResults,
    getUserTestResultsByLanguage: getUserTestResultsByLanguage,
    getUserTestResultsByModule: getUserTestResultsByModule,
    getAllTestResultsByModule: getAllTestResultsByModule
}