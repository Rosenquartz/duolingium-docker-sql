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
        let results = await connection.query(sql, moduleId);
        console.log("FROM GET MODULE ITEMS: ", results[0][0])
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

checkitem = async(itemId) => {
    
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
        await connection.query(sql, [userId, moduleId]);
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
        console.log(userId, moduleId);
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
    createProgressItem: createProgressItem
}

/*


getProgress = async (userId, languageId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetModuleList(?)';
        let results = await connection.query(sql, [languageId]);
        let returnObject = {}
        returnObject.language = languageId;
        returnObject.modules = [];
        for (let mod of results[0][0]) {
            sql = 'CALL GetModuleProgress (?, ?)';
            let tempResults = await connection.query(sql, [mod.moduleId, userId])
            returnObject.modules.push({
                moduleId: mod.moduleId,
                correct: tempResults[0][1][0].correct,
                total: tempResults[0][0][0].total
            })
        }
        await connection.end();
        return returnObject;
    } catch (err) {
        throw err
    }
}

getAllItems = async () => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetAllItems()';
        let results = await connection.query(sql);
        //console.log("RESULTS IS", results)
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

createProgressItem = async (request) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL CreateProgressItem(?, ?, ?, ?, ?)';
        await connection.query(sql, request);
        await connection.end();
    } catch (err) {
        throw err;
    }
}

updateProgress = async (userId, request) => {
    try {
        if (request.english && request.native) {
            throw {errno:1030};
        } else if (!request.english && !request.native) {
            throw {errno:1031};
        }
        let connection = await getConnection();
        let sql = "CALL GetItem(?)";
        let results = await connection.query(sql, request.itemId);
        let correct;
        console.log("HUH", userId, request.itemId)
        if (request.english) {
            correct = request.english==results[0][0][0].english ? 1 : 0;
        } else {
            correct = request.native==results[0][0][0].native ? 1 : 0;
        }
        console.log("HUH", userId, request.itemId, correct)
        sql = 'CALL UpdateProgress(?, ?, ?)';
        await connection.query(sql, [userId, request.itemId, correct]);
        console.log("AY")
        await connection.end();
        console.log("AY")
        return {correct: correct}
    } catch (err) {
        throw err
    }
}

getItemsForUser = async (userId, moduleId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetNewItems(?, ?)';
        let results = await connection.query(sql, [userId, moduleId]);
        await connection.end();
        //console.log("??", results)
        return results[0][0];
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
    getProgress: getProgress,
    getAllItems: getAllItems,
    createProgressItem: createProgressItem,
    updateProgress: updateProgress,
    getItemsForUser: getItemsForUser,
    getModules: getModules
}
*/