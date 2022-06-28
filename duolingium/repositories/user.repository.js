const mysql = require('mysql2/promise');

getConnection = () => {
    return mysql.createConnection({
        host     : 'db_server',
        user     : 'root',
        password : 'password',
        database : 'mydb'
    })
}

getUsers = async () => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetUserList()';
        let results = await connection.query(sql);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

getProfile = async (userId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetProfile(?)';
        let results = await connection.query(sql, [userId]);
        await connection.end();
        return results[0][0];
    } catch (err) {
        throw err;
    }
}

createUser = async (fields) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL CreateUser(?, ?, ?, ?, ?)';
        let values = [fields.username, fields.firstname, fields.lastname, fields.email, fields.password];
        await connection.query(sql, values);
        await connection.end();
        return fields;
    } catch (err) {
        throw err;
    }
}

updateUser = async (fields, userId) => {
    try {
        let connection = await getConnection();
        let sql = 'UPDATE `user` SET ? WHERE userId = ?';
        await connection.query(sql, [fields, userId]);
        await connection.end();
        return fields;
    } catch (err) {
        throw err;
    }
}

checkLogin = async (userId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetPassword(?)'
        let password = await connection.query(sql, [userId])
        await connection.end();
        return password;
    } catch (err) {
        throw err;
    }
}

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
    getUsers: getUsers,
    getProfile: getProfile,
    createUser: createUser,
    updateUser: updateUser,
    checkLogin: checkLogin,
    getProgress: getProgress,
    getAllItems: getAllItems,
    createProgressItem: createProgressItem,
    updateProgress: updateProgress,
    getItemsForUser: getItemsForUser,
    getModules: getModules
}