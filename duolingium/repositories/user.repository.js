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
        let sql = 'CALL UpdateUser(?, ?, ?, ?, ?)';
        let resulta = await connection.query(sql, [userId, fields.firstname, fields.lastname, fields.email, fields.preferredLanguage]);
        console.log("resulta", resulta)
        await connection.end();
        return fields;
    } catch (err) {
        throw err;
    }
}

checkLogin = async (userId) => {
    console.log("yo")
    try {
        let connection = await getConnection();
        let sql = 'CALL CheckLogin(?)'
        let password = await connection.query(sql, [userId])
        console.log("return is", password)
        
        await connection.end();
        return password[0][0];
    } catch (err) {
        console.log("ERRORING")
        throw err;
    }
}

setPreferredLanguage = async (request) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL SetPreferredLanguage(?,?)';
        await connection.query(sql, [request.userId, request.preferredLanguage]);
        return request;
    } catch (err) {
        throw err;
    }
}

getPreferredLanguage = async (userId) => {
    try {
        let connection = await getConnection();
        let sql = 'CALL GetPreferredLanguage(?)';
        let results = await connection.query(sql, [userId]);
        return results;
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
    setPreferredLanguage: setPreferredLanguage,
    getPreferredLanguage: getPreferredLanguage
}