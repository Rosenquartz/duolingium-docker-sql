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

getTestResults = async (moduleId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetTestResults(?)';
        let results = await connection.query(sql, [moduleId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

module.exports = {    
    createTestResults: createTestResults,
    getTestResults: getTestResults
}