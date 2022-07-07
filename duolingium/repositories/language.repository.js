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

createItem = async (request) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL CreateItem (?, ?, ?, ?)';
        console.log(request);
        request[2] = '\x82\xAC';
        await connection.query(sql, request);
        await connection.end();
        return;
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

const Redis = require('ioredis');
const redis = new Redis({
    port: 6379,
    host: 'redis'
});

getCachedLanguages = async() => {
    try {
        return redis.get('languages');
    } catch (err) {
        throw err;
    }
}

setCachedLanguages = async(languages) => {
    try {
        return redis.set('languages', languages);
    } catch (err) {
        throw err;
    }
}

getCachedModules = async(languageId) => {
    try {
        return redis.hget('modules', languageId);
    } catch (err) {
        throw err;
    }
}

setCachedModules = async(languageId, modules) => {
    try {
        return redis.hset('modules', languageId, modules);
    } catch (err) {
        throw err;
    }
}

getCachedModule = async(moduleId) => {
    try {
        return redis.hget('moduleItems', moduleId);
    } catch (err) {
        throw err;
    }
}

setCachedModule = async(moduleId, items) => {
    try {
        return redis.hset('moduleItems', moduleId, items);
    } catch (err) {
        throw err;
    }
}


module.exports = {
    getLanguages: getLanguages,
    getModules: getModules,
    getItems: getItems,
    createItem: createItem,
    getUsers: getUsers,
    getCachedLanguages: getCachedLanguages,
    setCachedLanguages: setCachedLanguages,
    getCachedModules: getCachedModules,
    setCachedModules: setCachedModules,
    getCachedModule: getCachedModule,
    setCachedModule: setCachedModule
}