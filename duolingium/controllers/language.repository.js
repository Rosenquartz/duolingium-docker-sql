const mysql = require('mysql2/promise');

getConnection = async () => {
    return mysql.createConnection({
        host     : 'db_server',
        user     : 'root',
        password : 'password',
        database : 'mydb'
    })
}

getLanguages = async () => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetLanguageList()';
        let results = await connection.query(sql);
        await connection.end()
        return results[0][0]
    } catch (err) {
        throw err;
    }
}

getItems = async (moduleId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetItemList(?)';
        let results = await connection.query(sql, [moduleId]);
        await connection.end()
        return results[0][0]
    } catch (err) {
        throw err;
    }
}

getModules = async (languageId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetModuleList(?)';
        let results = await connection.query(sql, [languageId]);
        await connection.end()
        return results[0][0]
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getLanguages: getLanguages,
    getModules: getModules,
    getItems: getItems
}