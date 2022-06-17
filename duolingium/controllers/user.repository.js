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
    return getConnection().then((connection)=>{
        let sql = 'CALL GetUserList()'
        return connection.query(sql)
    }).then((results)=>{
        return (results[0][0])
    }).catch((error)=>{
        throw error
    })
}

getUsers2 = () => {
    return getConnection().then((connection)=>{
        let sql = 'SELECT id FROM user'
        return connection.query(sql).then((results)=>{
            return (results[0])
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

getProfile = (userId) => {
    return getConnection().then((connection)=>{
        let sql = 'CALL GetProfile(?)'
        return connection.query(sql, [userId]).then((results)=>{
            return (results[0][0])
        }).catch((error)=>{
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        throw(error)
    })
}

createUser = (fields) => {
    return getConnection().then((connection)=>{
        let sql = 'CALL CreateUser(?, ?, ?, ?, ?)';
        let values = [fields.username, fields.firstname, fields.lastname, fields.email, fields.password];
        return connection.query(sql, values).then((results)=>{
            return (fields);
        }).catch((error)=>{
            console.log("SHEEEs")
            console.log(error)
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        throw(error)
    })
}

updateUser = (fields, userId) => {
    return getConnection().then((connection)=>{
        let sql = 'UPDATE `user` SET ? WHERE id = ?';
        return connection.query(sql, [fields, userId]).then((results)=>{
            console.log("CHANGED ", userId)
            return (fields);
        }).catch((error)=>{
            throw error
        }).finally(()=>{
            connection.end()
        })
    }).catch((error)=>{
        throw(error)
    })
}

module.exports = {
    getUsers: getUsers,
    getProfile: getProfile,
    createUser: createUser,
    updateUser: updateUser
}