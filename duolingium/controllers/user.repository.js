const mysql = require('mysql2/promise');

getConnection = () => {
    return mysql.createConnection({
        host     : 'db_server',
        user     : 'root',
        password : 'password',
        database : 'mydb'
    })
}

getUsers = () => {
    let connection;
    return getConnection().then((results)=>{
        connection = results;
        let sql = 'CALL GetUserList()';
        return connection.query(sql)
    }).then((results)=>{
        return (results[0][0])
    }).catch((error)=>{
        throw error
    }).finally(()=>{
        connection.end()
    })
}

getProfile = (userId) => {
    let connection;
    return getConnection().then((results)=>{
        connection = results;
        let sql = 'CALL GetProfile(?)'
        return connection.query(sql, [userId])
    }).then((results)=>{
        return (results[0][0])
    }).catch((error)=>{
        throw error
    }).finally(()=>{
        connection.end()
    })
}

createUser = (fields) => {
    let connection;
    return getConnection().then((results)=>{
        connection = results;
        let sql = 'CALL CreateUser(?, ?, ?, ?, ?)';
        let values = [fields.username, fields.firstname, fields.lastname, fields.email, fields.password];
        return connection.query(sql, values)
    }).then(()=>{
        return (fields);
    }).catch(error=>{
        throw error
    }).finally(()=>{
        connection.end()
    })
}

updateUser = (fields, userId) => {
    let connection;
    return getConnection().then((results)=>{
        connection = results;
        let sql = 'UPDATE `user` SET ? WHERE id = ?';
        return connection.query(sql, [fields, userId])
    }).then((results)=>{
        return (fields);
    }).catch((error)=>{
        throw error
    }).finally(()=>{
        connection.end()
    })
}

getProgress = (userId, languageId) => {
    return getConnection().then((connection)=>{
        let returnObject = {}
        let sql = 'CALL GetModuleList(?)'
        return connection.query(sql, [languageId]).then((results)=>{
            returnObject.language = languageId;
            returnObject.modules = []
            let promises = []
            results[0][0].forEach(mod=>{
                console.log(userId, mod.moduleId)
                let total; let correct;
                sql = 'CALL GetModuleProgress(?, ?)'
                promises.push(connection.query(sql, [mod.moduleId, userId]).then(results=>{
                    console.log(results[0][0][0], results[0][1][0])
                    console.log("TOTAL: ", total, " CORRECT: ", correct);
                    returnObject.modules.push({
                        moduleId: mod.moduleId,
                        correct: results[0][1][0].correct,
                        total: results[0][0][0].total
                    })
                }))
            })
            return Promise.all(promises).then((result)=>{
                return(returnObject)
            })
        }).catch((error)=>{
            console.error("ERR1")
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        console.error("ERR2")
        throw error
    })
}

updateProgress = (userId, request) => {
    let connection;
    let correct;
    return getConnection().then((results)=>{
        connection = results;
        if (request.english && request.native) {
            let err = {errno:1030}
            throw err;
        } else if (!request.english && !request.native) {
            let err = {errno:1031}
            throw err;
        }
        let sql = "CALL GetItem(?)"
        return connection.query(sql, request.itemId)
    }).then(results=>{
        if (request.english) {
            correct = request.english==results[0][0][0].english ? 1 : 0;
        } else {
            correct = request.native==results[0][0][0].native ? 1 : 0;
        }
        let sql = 'CALL UpdateProgress(?, ?, ?)';
        return connection.query(sql, [userId, request.itemId, correct]);
    }).then(results=>{
        return {correct: correct};
    }).catch(err=>{
        throw err;
    }).finally(()=>{
        connection.end()
    })
}

module.exports = {
    getUsers: getUsers,
    getProfile: getProfile,
    createUser: createUser,
    updateUser: updateUser,
    getProgress: getProgress,
    updateProgress: updateProgress
}