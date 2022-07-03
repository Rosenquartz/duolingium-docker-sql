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

createProgressItem = async (progressItemId, languageId, moduleId, itemId, userId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL CreateProgressItem(?, ?, ?, ?, ?)';
        await connection.query(sql, [progressItemId, languageId, moduleId, itemId, userId]);
        await connection.end();
    } catch (err) {
        throw err;
    }
}

createProgressModule = async (progressModuleId, languageId, moduleId, userId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL CreateProgressModule(?,?,?,?)';
        await connection.query(sql, [progressModuleId, languageId, moduleId, userId]);
        await connection.end();
        return;
    } catch (err) {
        throw err;
    }
}

getModuleItems = async (moduleId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetItemList(?)'
        let results = await connection.query(sql, [moduleId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

checkItem = async(itemId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetItem(?)'
        let results = await connection.query(sql, [itemId]);
        await connection.end();
        return results[0][0][0];
    } catch (err) {
        throw err;
    }
}

updateProgressItem = async (userId, itemId, correct) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL UpdateProgressItem(?,?,?)';
        await connection.query(sql, [userId, itemId, correct]);
        await connection.end();
        return;
    } catch (err) {
        throw err;
    }
}

updateProgressModule = async (userId, moduleId) => {
    try {
        let connection = await getConnection();
        let sql = 'Call UpdateProgressModule(?,?)';
        await connection.query(sql, [moduleId, userId]);
        await connection.end();
        return;
    } catch (err) {
        throw err;
    }
}

getProgressModules = async (userId, languageId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetProgressModules(?,?)';
        let results = await connection.query(sql, [userId, languageId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

getProgressModule = async (userId, moduleId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetProgressModule(?,?)';
        let results = await connection.query(sql, [userId, moduleId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

module.exports = {    
    getProgressModules: getProgressModules,
    getProgressModule: getProgressModule,
    getModuleItems: getModuleItems,
    createProgressModule: createProgressModule,
    createProgressItem: createProgressItem,
    checkItem: checkItem,
    updateProgressModule: updateProgressModule,
    updateProgressItem: updateProgressItem
}